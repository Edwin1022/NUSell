const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../index"); // Ensure this path is correct
const { OrderItem } = require("../../models/order-item");
const { Product } = require("../../models/product");
const { User } = require("../../models/user");
const { Category } = require('../../models/category');
require("dotenv/config");

const connection = process.env.CONNECTION;

beforeAll(async () => {
  const url = connection; // Use a test database
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterEach(async () => {
  await OrderItem.deleteMany({});
  await Product.deleteMany({});
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("OrderItem API", () => {
  let user;
  let product;

  beforeEach(async () => {
    user = new User({
      name: "Test User",
      email: "testuser@example.com",
      password: "Test@1234",
    });
    await user.save();

    category = new Category({ name: 'Test Category' });
    await category.save();

    product = new Product({
      name: "Test Product",
      price: 100,
      user: user._id,
      category: category._id,
      brand: "Test Brand",
      description: "Test Description",
    });
    await product.save();
  });

  it("should create a new order item", async () => {
    const response = await request(app)
      .post("/order-items")
      .send({ userId: user._id, productId: product._id });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("_id");
    expect(response.body.user).toBe(String(user._id));
    expect(response.body.product).toBe(String(product._id));
  });

  it("should fetch order items by users", async () => {
    await OrderItem.insertMany([
      { product: product._id, user: user._id },
      { product: product._id, user: user._id },
    ]);

    const response = await request(app).get(
      `/order-items/byBuyers?users=${user._id}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  it("should delete an order item", async () => {
    const orderItem = new OrderItem({ product: product._id, user: user._id });
    await orderItem.save();

    const response = await request(app).delete(`/order-items/${orderItem._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("the item is removed from the cart");

    const deletedOrderItem = await OrderItem.findById(orderItem._id);
    expect(deletedOrderItem).toBeNull();
  });
});
