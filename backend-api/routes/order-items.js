const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { OrderItem } = require("../models/order-item");
const { Product } = require("../models/product");
const { User } = require("../models/user");

router.get(`/byBuyers`, async (req, res) => {
  let filter = {};
  if (req.query.users) {
    filter = { user: req.query.users.split(",") };
  }

  const cartList = await OrderItem.find(filter)
    .populate({ path: "product", populate: "user" })
    .sort({ dateAdded: -1 });

  if (!cartList) {
    res.status(500).json({ success: false });
  }
  res.send(cartList);
});

router.post(`/`, async (req, res) => {
  const user = await User.findById(req.body.userId);
  if (!user) return res.status(404).send("Invalid User");

  const product = await Product.findById(req.body.productId);
  if (!product) return res.status(400).send("Invalid Product");

  let orderItem = new OrderItem({
    product: req.body.productId,
    user: req.body.userId,
  });
  orderItem = await orderItem.save();

  if (!orderItem)
    return res.status(404).send("the item cannot be added to cart");

  res.send(orderItem);
});

router.delete(`/:id`, (req, res) => {
  OrderItem.findByIdAndDelete(req.params.id)
    .then((item) => {
      if (item) {
        return res
          .status(200)
          .json({
            success: true,
            message: "the item is removed from the cart",
          });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "item not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;
