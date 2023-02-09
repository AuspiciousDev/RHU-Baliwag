const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    reqID: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
      auto: true,
    },
    items: [
      {
        lotNum: {
          type: String,
          required: true,
          lowercase: true,
        },
        genericName: {
          type: String,
          required: true,
          lowercase: true,
        },
        brandName: {
          type: String,
          lowercase: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],

    firstName: {
      type: String,
      required: true,
      lowercase: true,
    },
    middleName: {
      type: String,
      lowercase: true,
    },
    lastName: {
      type: String,
      required: true,
      lowercase: true,
    },
    mobile: {
      type: Number,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    province: {
      type: String,
    },

    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Request", schema);
