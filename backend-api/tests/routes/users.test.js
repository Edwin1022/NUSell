const request = require("supertest");
const app = require("../../index"); // assuming your Express app is exported from this file
const { User } = require("../../models/user");
const mongoose = require("mongoose");
require("dotenv/config");

const connection = process.env.CONNECTION;

beforeAll(async () => {
  // Connect to your test database
  const url = connection; // Change to your test database URL
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("User API", () => {
  let userToken;

  it("should register a new user", async () => {
    const response = await request(app).post("/users/register").send({
      name: "Test User",
      email: "testuser3@example.com",
      password: "Test@1234",
    });
    expect(response.statusCode).toBe(201);
    console.log(response.statusCode);
    expect(response.body.message).toBe(
      "Registration successful. Please check your email for verification."
    );
    console.log(response.body.message);
  });

  it("should verify a user's email", async () => {
    const user = await User.findOne({ email: "testuser3@example.com" });
    const token = user.verificationToken;

    const response = await request(app).get(`/users/verify/${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(
      "Email verified successfully. You may proceed to login."
    );
  });

  it("should login a verified user", async () => {
    const response = await request(app).post("/users/login").send({
      email: "testuser3@example.com",
      password: "Test@1234",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");

    userToken = response.body.token;
  });

  it("should get user profile", async () => {
    const user = await User.findOne({ email: "testuser3@example.com" });
    const response = await request(app)
      .get(`/users/profile/${user._id}`)
      .set("Authorization", `Bearer ${userToken}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.user.email).toBe("testuser3@example.com");
  });

  it("should update user profile", async () => {
    const user = await User.findOne({ email: "testuser3@example.com" });

    const response = await request(app)
      .put("/users/updateProfile")
      .set("Authorization", `Bearer ${userToken}`)
      .field(
        "user",
        JSON.stringify({
          email: "testuser3@example.com",
          name: "Updated Name",
        })
      )
      .attach("image", "public/uploads/camera.png"); // Replace with actual path to an image file
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Profile updated.");
  });
});
