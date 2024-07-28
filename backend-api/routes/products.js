const mongoose = require("mongoose");
const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const axios = require("axios");
const { Product } = require("../models/product");
const { User } = require("../models/user");
const { Category } = require("../models/category");
const { OrderItem } = require("../models/order-item");
const multer = require("multer");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const dotenv = require("dotenv");
dotenv.config();

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const getSignedUrlsForImages = async (bucketName, imageNames) => {
  const signedUrls = await Promise.all(
    imageNames.map(async (imageName) => {
      const getObjectParams = {
        Bucket: bucketName,
        Key: imageName,
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, {
        expiresIn: 60 * 60 * 24 * 6,
      });
      return url;
    })
  );

  return signedUrls;
};

router.put(`/`, async (req, res) => {
  const productList = await Product.find()
    .populate("user")
    .sort({ dateCreated: -1 });

  if (!productList) {
    res.status(500).json({ success: false });
  }

  for (let product of productList) {
    const getObjectParams = {
      Bucket: bucketName,
      Key: product.image,
    };
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, {
      expiresIn: 60 * 60 * 24 * 6,
    });
    product = Product.findByIdAndUpdate(
      product.id,
      { imageUrl: url },
      { new: true }
    );

    if (!product) return res.status(500).send("the product cannot be updated");
  }

  res.status(200).send(productList);
});

router.get(`/byCategories`, async (req, res) => {
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }

  const productList = await Product.find(filter)
    .populate("user category")
    .sort({ dateCreated: -1 });

  if (!productList) {
    res.status(500).json({ success: false });
  }

  res.send(productList);
});

router.get(`/bySellers`, async (req, res) => {
  let filter = {};
  if (req.query.users) {
    filter = { user: req.query.users.split(",") };
  }

  const productList = await Product.find(filter)
    .populate("user")
    .sort({ dateCreated: -1 });

  if (!productList) {
    res.status(500).json({ success: false });
  }

  res.send(productList);
});

router.put(`/:id`, async (req, res) => {
  let product = await Product.findById(req.params.id).populate("user category");

  if (!product) {
    res.status(500).json({ success: false });
  }

  const getObjectParams = {
    Bucket: bucketName,
    Key: product.image,
  };
  const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, command);
  product.imageUrl = url;

  const urls = await getSignedUrlsForImages(bucketName, product.images);
  product = await Product.findByIdAndUpdate(
    req.params.id,
    { imagesUrls: urls },
    { new: true }
  ).populate("user category");
  
  if (!product) return res.status(500).send("the product cannot be updated");

  res.send(product);
});

router.post("/search", async (req, res) => {
  const { itemName, brand } = req.body;
  try {
    const itemNamePattern = itemName.replace(/\s/g, "\\s?");
    const brandPattern = brand.replace(/\s/g, "\\s?");

    const query = {
      name: { $regex: itemNamePattern, $options: "i" },
      brand: { $regex: brandPattern, $options: "i" },
    };

    const results = await Product.find(query)
      .populate("user")
      .sort({ price: 1 });

    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/search-nearby", async (req, res) => {
  const { latitude, longitude } = req.body;
  // Implement search logic here
  try {
    const results = await Product.find({
      location: {
        $geoWithin: {
          $centerSphere: [[longitude, latitude], 1 / 6378.1], // radius in radians
        },
      },
    }).populate("user");
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.post(`/`, upload.single("image"), async (req, res) => {
  const productData = JSON.parse(req.body.product);

  const user = await User.findById(productData.user);
  if (!user) return res.status(404).send("Invalid User");

  const category = await Category.findById(productData.category);
  if (!category) return res.status(400).send("Invalid Category");

  const file = req.file;
  if (!file) return res.status(400).send("No image in the request");

  const imageName = randomImageName();
  const putObjectParams = {
    Bucket: bucketName,
    Key: imageName,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(putObjectParams);
  await s3.send(command);

  let product = new Product({
    name: productData.name,
    description: productData.description,
    richDescription: productData.richDescription,
    image: imageName,
    brand: productData.brand,
    condition: productData.condition,
    price: productData.price,
    category: productData.category,
    user: productData.user,
    countInStock: productData.countInStock,
    location: productData.location,
    isFeatured: productData.isFeatured,
  });
  product = await product.save();

  if (!product) return res.status(500).send("The product cannot be created");

  res.send({ productId: product.id });
});

router.put(`/updateListing/:id`, upload.single("image"), async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Product Id");
  }

  const productData = JSON.parse(req.body.product);

  const user = await User.findById(productData.user);
  if (!user) return res.status(404).send("Invalid User");

  const category = await Category.findById(productData.category);
  if (!category) return res.status(400).send("Invalid Category");

  const file = req.file;
  if (!file) return res.status(400).send("No image in the request");

  const imageName = randomImageName();
  const putObjectParams = {
    Bucket: bucketName,
    Key: imageName,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(putObjectParams);
  await s3.send(command);

  // Retrieve the current product
  const currentProduct = await Product.findById(req.params.id);
  if (!currentProduct) return res.status(404).send("Product not found");

  // Store the old price
  const oldPrice = currentProduct.price;

  let product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: productData.name,
      description: productData.description,
      richDescription: productData.richDescription,
      image: imageName,
      brand: productData.brand,
      condition: productData.condition,
      price: productData.price,
      category: productData.category,
      user: productData.user,
      countInStock: productData.countInStock,
      isFeatured: req.body.isFeatured,
    },
    { new: true }
  );

  if (!product) return res.status(500).send("the product cannot be updated");

  // Check if the price has changed
  const newPrice = product.price;
  if (newPrice !== oldPrice) {
    product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        priceChangeType: newPrice > oldPrice ? "increased" : "decreased",
        priceChanged: newPrice - oldPrice,
      },
      { new: true }
    );
  }

  if (!product) return res.status(500).send("the product cannot be updated");

  res.send(product);
});

router.put(
  "/gallery-images/:id",
  upload.array("images", 10),
  async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid Product Id");
    }

    const files = req.files;
    let imagesPaths = [];
    if (files) {
      const uploadPromises = files.map(async (file) => {
        const imageName = randomImageName();
        const putObjectParams = {
          Bucket: bucketName,
          Key: imageName,
          Body: file.buffer,
          ContentType: file.mimetype,
        };

        const command = new PutObjectCommand(putObjectParams);
        await s3.send(command);
        imagesPaths.push(imageName);
      });

      await Promise.all(uploadPromises);
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        images: imagesPaths,
      },
      { new: true }
    );

    if (!product) return res.status(500).send("the product cannot be updated");

    res.send(product);
  }
);

router.delete(`/:id`, (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then((product) => {
      if (product) {
        OrderItem.findOneAndDelete({ product: req.params.id })
          .then(() => {
            return res.status(200).json({
              success: true,
              message: "the product and associated order item are deleted",
            });
          })
          .catch((err) => {
            return res.status(400).json({ success: false, error: err });
          });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "product not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const OAUTH2_URL = "https://api.ebay.com/identity/v1/oauth2/token";

const getOAuth2Token = async () => {
  const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
    "base64"
  );

  try {
    const response = await axios.post(
      OAUTH2_URL,
      "grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${basicAuth}`,
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching OAuth2 token:", error);
    throw error;
  }
};

router.get("/getAccessToken", async (req, res) => {
  try {
    const token = await getOAuth2Token();
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch token" });
  }
});

router.get(`/get/count`, async (req, res) => {
  const productCount = await Product.countDocuments();

  if (!productCount) {
    res.status(500).json({ success: false });
  }
  res.send({ productCount: productCount });
});

router.get(`/get/featured/:count`, async (req, res) => {
  const count = req.params.count || 0;
  const products = await Product.find({ isFeatured: true }).limit(+count);

  if (!products) {
    res.status(500).json({ success: false });
  }
  res.send(products);
});

module.exports = router;
