const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    lotNum: {
      type: String,
      required: true,
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
    deliveryDate: {
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
