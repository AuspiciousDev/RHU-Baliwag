const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    transID: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
      auto: true,
    },
    reqID: String,
    requested: {
      type: Boolean,
      default: false,
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
    transactor: {
      type: String,
      required: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Transaction", schema);
