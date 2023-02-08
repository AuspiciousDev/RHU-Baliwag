const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    imgURL: String,
    username: {
      type: Number,
      required: true,
    },
    userType: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
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
    dateOfBirth: {
      type: String,
      required: true,
    },
    placeOfBirth: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
    },
    civilStatus: {
      type: String,
    },
    nationality: {
      type: String,
    },
    religion: {
      type: String,
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
    mobile: {
      type: Number,
    },
    telephone: {
      type: String,
    },
    emergencyContactName: {
      type: String,
    },
    emergencyContactNumber: {
      type: String,
    },
    emergencyContactRelationship: {
      type: String,
    },
    refreshToken: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", schema);
