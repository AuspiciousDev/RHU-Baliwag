const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
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
    classification: {
      type: String,
      lowercase: true,
    },
    access: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },
    walkInQTY: {
      type: Number,
    },
    onlineQTY: {
      type: Number,
    },
    supplier: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Inventory", schema);
