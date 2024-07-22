const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    default: "25967c1621c8ea52b526886251cf9ff0121e09ea6535986f9a554a125a1988c6",
  },
  imageUrl: {
    type: String,
    default: "",
  },
  studentId: {
    type: String,
    default: "",
  },
  faculty: {
    type: String,
    default: "",
  },
  major: {
    type: String,
    default: "",
  },
  mobileNo: {
    type: String,
    default: "",
  },
  teleHandle: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    default: "",
  },
  studentIdVisible: {
    type: Boolean,
    default: false,
  },
  majorVisible: {
    type: Boolean,
    default: true,
  },
  facultyVisible: {
    type: Boolean,
    default: true,
  },
  addressVisible: {
    type: Boolean,
    default: false,
  },
  emailVisible: {
    type: Boolean,
    default: false,
  },
  totalRating: {
    type: Number,
    default: 0,
  },
  numRatings: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  resetToken: {
    type: String,
    required: false,
  },
  resetTokenExpiration: {
    type: Date,
    required: false,
  },
  addresses: [
    {
      blockNo: String,
      street: String,
      unit: String,
      building: String,
      postalCode: String,
    },
  ],
  defaultAddress: {
    _id: String,
    blockNo: String,
    street: String,
    unit: String,
    building: String,
    postalCode: String,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
});

exports.User = mongoose.model("User", userSchema);
exports.userSchema = userSchema;
