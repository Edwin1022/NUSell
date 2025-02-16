const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const multer = require("multer");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const dotenv = require("dotenv");
const { Product } = require("../models/product");
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

// function to hash password
const hashPassword = async (password) => {
  // hash password using bcrypt
  const hashedPassword = await bcryptjs.hash(password, 10);
  return hashedPassword;
};

// function to compare password
const comparePassword = async (userPassword, hashedPassword) => {
  // hash password using bcryptjs
  const res = await bcryptjs.compare(userPassword, hashedPassword);
  return res;
};

//function to send verification email to the user
const sendVerificationEmail = async (email, verificationToken) => {
  // create a nodemailer transport
  const transporter = nodemailer.createTransport({
    // configure the email service
    service: "gmail",
    auth: {
      user: "wongedwin93@gmail.com",
      pass: "zimh blug reha vefp",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // compose the email message
  const mailOptions = {
    from: "NUSell.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email : https://nusell.onrender.com/users/verify/${verificationToken}`,
  };

  // send the email
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {}
};

//endpoint to register the user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // create a new User
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // generate and store the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    // save the user to the database
    await newUser.save();

    // send verification email to the user
    sendVerificationEmail(newUser.email, newUser.verificationToken);

    res.status(201).json({
      message:
        "Registration successful. Please check your email for verification.",
    });
  } catch (error) {
    console.log("error registering user", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

// endpoint to verify the email
router.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    // find the user with the given verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    // Mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({
      message: "Email verified successfully. You may proceed to login.",
    });
  } catch (error) {
    res.status(500).json({ message: "Email verification failed" });
  }
});

// endpoint to login the user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if the user exists and if the password is correct
    const user = await User.findOne({ email });
    const secret = process.env.secret;
    if (!user) {
      return res.status(400).send("the user is not found");
    }

    // check if the user has been verified
    if (!user.verified) {
      return res.status(402).json({ message: "User is not verified" });
    }

    const checkPassword = await comparePassword(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // generate a token
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      secret,
      { expiresIn: "1d" }
    );
    res.status(200).send({ user: user.email, token: token });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});

// function to generate password reset verification code
const generateSecureToken = (length) => {
  const byteLength = Math.ceil(length / 2); // Calculate the necessary byte length
  return crypto.randomBytes(byteLength).toString("hex").slice(0, length);
};

//function to send verification email to the user
const sendPasswordResetEmail = async (email, resetToken) => {
  // create a nodemailer transport
  const transporter = nodemailer.createTransport({
    // configure the email service
    service: "gmail",
    auth: {
      user: "wongedwin93@gmail.com",
      pass: "zimh blug reha vefp",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // compose the email message
  const mailOptions = {
    from: "NUSell.com",
    to: email,
    subject: "Reset Token",
    text: `Here is your Reset Token ${resetToken}`,
  };

  // send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Error sending email", error);
  }
};

// endpoint to reset password
router.post("/resetPassword", async (req, res) => {
  try {
    const { email } = req.body;

    // check if the email is registered
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email is not registered" });
    }

    // generate and store the reset token and expiration time of the reset token
    const token = await generateSecureToken(6);
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000;

    // save the user to the database
    await user.save();

    // send verification email to the user
    sendPasswordResetEmail(user.email, token);

    res.status(201).json({
      message: "Email sent.",
    });
  } catch (error) {
    console.log("error sending email", error);
    res.status(500).json({ message: "Email failed to send" });
  }
});

// endpoint to reset password confirm
router.post("/resetPasswordConfirm", async (req, res) => {
  try {
    const { email, verificationCode, newPassword } = req.body;

    // check if the email is registered
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email is not registered" });
    }

    // check if the verification codes match
    if (user.resetToken !== verificationCode) {
      return res
        .status(401)
        .json({ message: "Verification codes do not match" });
    }

    // check if the verification code is still valid
    if (user.resetTokenExpiration < new Date()) {
      return res.status(200).json({ message: "Token has expired" });
    }

    // hash the new password
    const hashedNewPassword = await hashPassword(newPassword);
    user.password = hashedNewPassword;

    // exhaust the reset token that has been used
    user.resetToken = "";
    user.resetTokenExpiration = null;

    // save the user to the database
    await user.save();

    res.status(201).json({
      message: "Password reset.",
    });
  } catch (error) {
    console.log("error resetting password", error);
    res.status(500).json({ message: "Password failed to reset" });
  }
});

// endpoint to get the user profile
router.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // find the user with the given userId
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the user profile" });
  }
});

// endpoint to update user profile
router.put("/updateProfile", upload.single("image"), async (req, res) => {
  try {
    const userData = JSON.parse(req.body.user);

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

    const updatedUser = await User.findOneAndUpdate(
      { email: userData.email },
      {
        name: userData.name,
        gender: userData.gender,
        studentId: userData.studentId,
        faculty: userData.faculty,
        major: userData.major,
        mobileNo: userData.mobileNo,
        teleHandle: userData.teleHandle,
        image: imageName,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send("User not found.");
    }

    res.status(201).json({
      message: "Profile updated.",
    });
  } catch (error) {
    console.log("error updating profile", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
});

// endpoint to get user data
router.put("/getUserData", async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) {
      return res
        .status(400)
        .send({ status: "error", message: "Email is required" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .send({ status: "error", message: "User not found" });
    }

    const getObjectParams = {
      Bucket: bucketName,
      Key: user.image,
    };
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, {
      expiresIn: 60 * 60 * 24 * 6,
    });
    user.imageUrl = url;

    await user.save();

    res.send({ status: "ok", data: user });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// endpoint to add a new address to the database
router.post("/addresses", async (req, res) => {
  try {
    const { userId, address } = req.body;

    // find the user by the userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // add the new address to the user's addresses array
    user.addresses.push(address);

    // save the updated user in the backend
    await user.save();

    res.status(200).json({ message: "Address created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding address" });
  }
});

// endpoint to get all the addresses of a particular user
router.get("/addresses/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // find the user by the userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const addresses = user.addresses;

    res.status(200).json({ addresses });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the addresses" });
  }
});

// endpoint to delete a particular address of a particular user from the database
router.put("/addresses", async (req, res) => {
  try {
    const { userId, updatedAddresses } = req.body;

    // find the user by the userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // update user's addresses array
    user.addresses = updatedAddresses;

    // save the updated user in the backend
    await user.save();

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting address" });
  }
});

// endpoint to set default address of a particular user in the database
router.post("/setDefaultAddress", async (req, res) => {
  try {
    const { userId, defaultAddressId, defaultAddress } = req.body;

    // find the user by the userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // update user's default address
    user.defaultAddress = defaultAddress;
    user.defaultAddress._id = defaultAddressId;

    // save the updated user in the backend
    await user.save();

    res.status(200).json({ message: "Default address set successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error setting default address" });
  }
});

// endpoint to get all the addresses of a particular user
router.get("/getDefaultAddress/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // find the user by the userId
    const user = await User.findById(userId).populate("defaultAddress");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const defaultAddress = user.defaultAddress;

    res.status(200).json({ defaultAddress });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the default address" });
  }
});

// endpoint to store users' privacy settings to the database
router.post("/privacy", async (req, res) => {
  try {
    const { userId, buttonStates } = req.body;

    // find the user by the userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.studentIdVisible = buttonStates["button1"];
    user.majorVisible = buttonStates["button2"];
    user.facultyVisible = buttonStates["button3"];
    user.addressVisible = buttonStates["button4"];
    user.emailVisible = buttonStates["button5"];

    // save the updated user in the backend
    await user.save();

    res.status(200).json({ message: "Privacy set successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error setting privacy" });
  }
});

// endpoint to rate a user
router.post("/rateUser", async (req, res) => {
  try {
    const { userId, rating } = req.body;

    // find the user by the userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // update user's default address
    user.totalRating += rating;
    user.numRatings += 1;
    user.rating = (user.totalRating / user.numRatings).toFixed(1);

    // save the updated user in the backend
    await user.save();

    res.status(200).json({ message: "Rate user successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error rating user" });
  }
});

// endpoint to get the list of all the users from the database
router.put(`/`, async (req, res) => {
  const userList = await User.find().select("-passwordHash");
  const verifiedUsers = userList.filter((user) => user.verified);

  if (!verifiedUsers) {
    res.status(500).json({ success: false });
  }

  for (const user of verifiedUsers) {
    const getObjectParams = {
      Bucket: bucketName,
      Key: user.image,
    };
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, {
      expiresIn: 60 * 60 * 24 * 6,
    });
    user.imageUrl = url;
    await user.save();
  }

  res.status(200).send(verifiedUsers);
});

// endpoint to get a specific user data from the database by id
router.get(`/:id`, async (req, res) => {
  const user = await User.findById(req.params.id).select("-passwordHash");

  if (!user) {
    res
      .status(500)
      .json({ message: "The user with the given ID was not found" });
  }
  res.status(200).send(user);
});

// endpoint to delete a user from the database
router.delete(`/:id`, (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (user) {
        Product.findOneAndDelete({ user: req.params, id }).then(() => {
          return res
            .status(200)
            .json({ success: true, message: "the user is deleted" });
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "user not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

// endpoint to get the number of users in the database
router.get(`/get/count`, async (req, res) => {
  const userCount = await User.countDocuments();

  if (!userCount) {
    res.status(500).json({ success: false });
  }
  res.send({ userCount: userCount });
});

module.exports = router;
