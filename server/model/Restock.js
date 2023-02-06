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
    quantity: {
      type: Number,
      required: true,
    },
    supplier: {
      type: String,
      required: true,
    },
    restockedBy: {
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
module.exports = mongoose.model("Restock", schema);
