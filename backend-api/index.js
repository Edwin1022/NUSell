const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");

//middleware
app.use(cors());
app.options("*", cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("tiny"));
// app.use(authJwt());
app.use(errorHandler);
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

const port = process.env.PORT;
const connection = process.env.CONNECTION;

const usersRoutes = require("./routes/users");
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const orderItemsRoutes = require("./routes/order-items");
const ordersRoutes = require("./routes/orders");
const googleCloudVisionRoutes = require("./routes/googleCloudVision");

//routers
app.use(`/users`, usersRoutes);
app.use(`/categories`, categoriesRoutes);
app.use(`/products`, productsRoutes);
app.use(`/order-items`, orderItemsRoutes);
app.use(`/orders`, ordersRoutes);
app.use(`/googleCloudVision`, googleCloudVisionRoutes);

mongoose
  .connect(connection)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
