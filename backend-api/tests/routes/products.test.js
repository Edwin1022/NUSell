const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../index"); // Import your Express app
const { Product } = require("../../models/product");
const { User } = require("../../models/user");
const { Category } = require("../../models/category");
require("dotenv/config");

const connection = process.env.CONNECTION;

beforeAll(async () => {
  const url = connection;
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Product API", () => {
  let productId;
  let userId;
  let categoryId;

  beforeAll(async () => {
    const user = new User({
      name: "Test User",
      email: "testuser@example.com",
      password: "testpassword",
    });
    await user.save();
    userId = user._id;

    const category = new Category({ name: "Test Category" });
    await category.save();
    categoryId = category._id;
  });

  afterAll(async () => {
    await User.deleteMany();
    await Category.deleteMany();
  });

  test("POST /products - create product", async () => {
    const productData = {
      name: "Test Product",
      description: "Test Description",
      richDescription: "Rich Test Description",
      brand: "Test Brand",
      condition: "New",
      price: 100,
      category: categoryId,
      user: userId,
      countInStock: 10,
      location: { type: "Point", coordinates: [-73.97, 40.77] },
      isFeatured: true,
    };

    const res = await request(app)
      .post("/products")
      .field("product", JSON.stringify(productData))
      .attach("image", "public/uploads/camera.png");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("productId");

    productId = res.body.productId;
  });

  test("PUT /products/:id - update product", async () => {
    const productData = {
      name: "Test Product",
      description: "Test Description",
      richDescription: "Rich Test Description",
      brand: "Test Brand",
      condition: "New",
      price: 100,
      category: categoryId,
      user: userId,
      countInStock: 10,
      location: { type: "Point", coordinates: [-73.97, 40.77] },
      isFeatured: true,
    };

    const updatedProductData = {
      name: "Updated Test Product",
      description: "Updated Test Description",
      richDescription: "Updated Rich Test Description",
      brand: "Updated Test Brand",
      condition: "Like New",
      price: 150,
      category: categoryId,
      user: userId,
      countInStock: 5,
      isFeatured: false,
    };

    const res = await request(app)
      .put(`/products/${productId}`)
      .field("product", JSON.stringify(updatedProductData))
      .attach("image", "public/uploads/camera.png");

    expect(res.status).toBe(200);
    expect(res.body.name).toBe(productData.name);
  });

  test("GET /products/byCategories - get products by categories", async () => {
    const res = await request(app).get(
      `/products/byCategories?categories=${categoryId}`
    );

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  test("GET /products/bySellers - get products by sellers", async () => {
    const res = await request(app).get(`/products/bySellers?users=${userId}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  test("DELETE /products/:id - delete product", async () => {
    const res = await request(app).delete(`/products/${productId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("success", true);
  });
});
