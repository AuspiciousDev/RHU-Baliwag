const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    stockID: {
      type: String,
      required: true,
    },
    genericName: {
      type: String,
      required: true,
    },
    brandName: {
      type: String,
    },
    access: {
      type: String,
      required: true,
    },
    usage: [
      {
        type: String,
      },
    ],
    quantity: {
      type: Number,
      required: true,
    },
    walkInQTY: {
      type: Number,
      required: true,
    },
    onlineQTY: {
      type: Number,
      required: true,
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
