const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../index"); // Ensure this path is correct
const { Order } = require("../../models/order");
const { Product } = require("../../models/product");
const { User } = require("../../models/user");
const { Category } = require("../../models/category"); // Import the Category model
const nodemailer = require("nodemailer");
require("dotenv/config");

const connection = process.env.CONNECTION;

// Mock nodemailer
jest.mock("nodemailer");
const sendMailMock = jest.fn();
nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });

beforeAll(async () => {
  const url = connection; // Use a test database
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Order API", () => {
  let user;
  let product;
  let category;

  beforeEach(async () => {
    user = new User({
      name: "Test User",
      email: "testuser@example.com",
      password: "Test@1234",
      mobileNo: "12345678",
    });
    await user.save();

    category = new Category({ name: "Test Category" });
    await category.save();

    product = new Product({
      name: "Test Product",
      price: 100,
      user: user._id,
      category: category._id, // Use the category ObjectId
      brand: "Test Brand",
      description: "Test Description",
      imageUrl:
        "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcHUyMzMxNjM2LWltYWdlLWt3dnk3dzV3LmpwZw.jpg",
    });
    await product.save();
  });

  it("should create a new order", async () => {
    const response = await request(app)
      .post("/orders")
      .send({
        user: user._id,
        orderItem: product._id,
        status: "pending",
        totalPrice: 150,
        shippingAddress: {
          blockNo: "123",
          street: "Test Street",
          unit: "01-01",
          building: "Test Building",
          postalCode: "123456",
        },
        paymentMethod: "card",
        email: "testuser@example.com",
        subtotal: 100,
        shippingFee: 50,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("_id");
    expect(sendMailMock).toHaveBeenCalledTimes(2); // One for buyer, one for seller
  });

  it("should fetch orders by user", async () => {
    await Order.insertMany([
      {
        user: user._id,
        orderedItem: product._id,
        totalPrice: 150,
        status: "pending",
        shippingAddress: {
          blockNo: "123",
          street: "Test Street",
          postalCode: "123456",
        },
        paymentMethod: "card",
      },
      {
        user: user._id,
        orderedItem: product._id,
        totalPrice: 200,
        status: "completed",
        shippingAddress: {
          blockNo: "123",
          street: "Test Street",
          postalCode: "123456",
        },
        paymentMethod: "card",
      },
    ]);

    const response = await request(app).get(
      `/orders/byBuyers?users=${user._id}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  it("should create a payment intent with Stripe", async () => {
    const response = await request(app)
      .post("/orders/create-payment-intent")
      .send({ amount: 150 });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("clientSecret");
  });
});
