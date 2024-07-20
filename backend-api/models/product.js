const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  richDescription: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  imageUrl: {
    type: String,
    default: "",
  },
  images: [
    {
      type: String,
    },
  ],
  imagesUrls: [
    {
      type: String,
    },
  ],
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  countInStock: {
    type: Number,
    default: 1,
    min: 0,
    max: 255,
  },
  condition: {
    type: String,
    default: "",
  },
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number], // [longitude, latitude]
  },
  priceChangeType: {
    type: String,
    default: "",
  },
  priceChanged: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: "",
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

productSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

productSchema.set("toJSON", {
  virtuals: true,
});

productSchema.index({ location: "2dsphere" });

exports.Product = mongoose.model("Product", productSchema);
