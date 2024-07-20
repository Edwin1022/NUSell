const express = require("express");
const router = express.Router();
const { Order } = require("../models/order");
const { OrderItem } = require("../models/order-item");
const { Product } = require("../models/product");
const Stripe = require("stripe");
const nodemailer = require("nodemailer");

const PUBLISHABLE_KEY = process.env.PUBLISHABLE_KEY;
const SECRET_KEY = process.env.SECRET_KEY;

router.get(`/`, async (req, res) => {
  const orderList = await Order.find()
    .populate("user", "name")
    .populate({ path: "orderedItem", populate: "user" })
    .sort({ dateOrdered: -1 });

  if (!orderList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(orderList);
});

router.get(`/byBuyers`, async (req, res) => {
  let filter = {};
  if (req.query.users) {
    filter = { user: req.query.users.split(",") };
  }

  const orderList = await Order.find(filter)
    .populate({ path: "orderedItem", populate: "user" })
    .sort({ dateAdded: -1 });

  if (!orderList) {
    res.status(500).json({ success: false });
  }
  res.send(orderList);
});

// endpoint to get orders of a particular user from the database
router.get(`/:id`, async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name")
    .populate({ path: "orderedItem", populate: "user" });

  if (!order) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(order);
});

const formatDate = (dateString) => {
  const date = new Date(dateString);

  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  return date.toLocaleString("en-GB", options).replace(",", "");
};

const sendPaymentConfirmationEmail = async (
  email,
  orderId,
  orderDate,
  seller,
  item,
  subtotal,
  shippingFee,
  totalPayment,
  recipientName,
  phoneNumber,
  shippingAddress,
  paymentDate,
  amountPaid
) => {
  // create a nodemailer transport
  const transporter = nodemailer.createTransport({
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
    subject: "Payment Confirmation",
    html: `
      <p>Hello ${recipientName},</p>
      <p>Your payment for order #${orderId} has been confirmed. The seller has also been notified to start shipping your product(s).</p>
      <h3>ORDER DETAILS</h3>
      <p>Order ID: ${orderId}<br>
      Order Date: ${formatDate(orderDate)}<br>
      Seller: ${seller}</p>
      <img src="${
        item.imageUrl
      }" alt="Product Image" style="width:100%; max-width:200px; height:auto; display:block;"><br>
      <p>
        <strong>${item.name}</strong><br>
        Quantity: 1<br>
        Price: SGD ${item.price}
      </p>
      <p>Subtotal: SGD ${subtotal}<br>
      Shipping Fee: SGD ${shippingFee}<br>
      Total Payment: SGD ${totalPayment}</p>
      <h3>DELIVERY DETAILS</h3>
      <p>Recipient Name: ${recipientName}<br>
      Phone Number: ${phoneNumber}<br>
      Shipping Address:<br>
      ${shippingAddress.blockNo} ${shippingAddress.street}<br>
      ${shippingAddress.unit} ${shippingAddress.building}<br>
      Singapore ${shippingAddress.postalCode}</p>
      <h3>PAYMENT DETAILS</h3>
      <p>Payment Method: Credit Card/Debit Card<br>
      Payment Date: ${formatDate(paymentDate)}<br>
      Amount Paid: SGD ${amountPaid}</p>
      <h3>WHAT'S NEXT</h3>
      <p>Kindly wait for your shipment. Once you have received and accepted the product(s), please confirm this with us on NUSell App.</p>
      <p>Cheers,<br>
      NUSell Team</p>
    `,
  };

  // send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Payment confirmation email sent successfully");
  } catch (error) {
    console.log("Error sending payment confirmation email", error);
  }
};

// endpoint to store an order into the database
router.post(`/`, async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.body.orderItem,
    {
      status: "ordered",
    },
    { new: true }
  );

  if (!product) return res.status(500).send("the product cannot be ordered");

  let order = new Order({
    user: req.body.user,
    orderedItem: req.body.orderItem,
    status: req.body.status,
    totalPrice: req.body.totalPrice,
    shippingAddress: req.body.shippingAddress,
    paymentMethod: req.body.paymentMethod,
  });
  order = await order.save();

  if (!order) return res.status(404).send("the order cannot be created");

  order = await Order.findById(order._id)
    .populate("user")
    .populate({ path: "orderedItem", populate: "user" });

  const seller = order.orderedItem.user.name; // assuming the product has a user field referring to the seller
  const item = {
    name: order.orderedItem.name,
    quantity: 1, // if each order corresponds to one item
    price: order.orderedItem.price,
    imageUrl: order.orderedItem.imageUrl,
  };

  sendPaymentConfirmationEmail(
    req.body.email,
    order.id,
    order.dateOrdered,
    seller,
    item,
    req.body.subtotal, // assuming totalPrice is the subtotal here
    req.body.shippingFee, // or order.shippingFee if it's part of the order model
    order.totalPrice,
    order.user.name,
    order.user.mobileNo,
    order.shippingAddress,
    order.dateOrdered,
    order.totalPrice
  );

  res.send(order);
});

const stripe = Stripe(SECRET_KEY, { apiVersion: "2024-06-20" });

router.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount * 100,
      currency: "sgd",
      payment_method_types: ["card"],
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
});

router.put(`/:id`, async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    { new: true }
  );

  if (!order) return res.status(404).send("the order cannot be updated");

  res.send(order);
});

router.delete(`/:id`, (req, res) => {
  Order.findByIdAndDelete(req.params.id)
    .then(async (order) => {
      if (order) {
        await order.orderItems.map(async (orderItem) => {
          await OrderItem.findByIdAndDelete(orderItem);
        });
        return res
          .status(200)
          .json({ success: true, message: "the order is deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "order not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

router.get("/get/totalsales", async (req, res) => {
  const totalSales = await Order.aggregate([
    { $group: { _id: null, totalsales: { $sum: "$totalPrice" } } },
  ]);

  if (!totalSales) {
    return res.status(400).send("The order sales cannot be generated");
  }

  res.send({ totalsales: totalSales.pop().totalsales });
});

router.get(`/get/count`, async (req, res) => {
  const orderCount = await Order.countDocuments();

  if (!orderCount) {
    res.status(500).json({ success: false });
  }
  res.send({ orderCount: orderCount });
});

router.get(`/get/userorders/:userid`, async (req, res) => {
  const userOrderList = await Order.find({ user: req.params.userid })
    .populate({
      path: "orderItems",
      populate: { path: "product", populate: "category" },
    })
    .sort({ dateOrdered: -1 });

  if (!userOrderList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(userOrderList);
});

module.exports = router;
