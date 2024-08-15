const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../index'); // Ensure this path is correct
const { Category } = require('../../models/category');
require("dotenv/config");

const connection = process.env.CONNECTION;

beforeAll(async () => {
  const url = connection; // Use a test database
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Category API', () => {
  it('should fetch all categories excluding "Others" and sort them', async () => {
    await Category.insertMany([
      { name: 'Books' },
      { name: 'Electronics' },
      { name: 'Others' },
    ]);

    const response = await request(app).get('/categories');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0].name).toBe('Books');
    expect(response.body[1].name).toBe('Electronics');
  });
});
