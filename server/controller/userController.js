const User = require("../model/User");
const ROLES_LIST = require("../config/role_list");
const generateCredential = require("../helper/generateCredential");
const createToken = require("../helper/createToken");
const sendMail = require("../helper/sendMail");
const isEmail = (str) =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str);
const isNumber = (str) => /^[0-9]*$/.test(str);
const userController = {
  createDoc: async (req, res) => {
    let emptyFields = [];
    try {
      const {
        username,
        userType,
        firstName,
        middleName,
        lastName,
        gender,
        email,
        dateOfBirth,
      } = req.body;
      if (!username) emptyFields.push("User ID");
      if (username?.length != 10)
        emptyFields.push("User ID must be 10 Digits!");
      if (!isNumber(username)) emptyFields.push("User ID must be a digit");
      if (!userType) emptyFields.push("User Type");
      if (!ROLES_LIST.includes(userType)) emptyFields.push("Invalid User Type");
      if (!email) emptyFields.push("Email");
      if (!isEmail(email)) emptyFields.push("Invalid email");
      if (!firstName) emptyFields.push("First Name");
      if (!lastName) emptyFields.push("Last Name");
      if (!gender) emptyFields.push("Gender");
      if (!dateOfBirth) emptyFields.push("Birthday");

      if (emptyFields.length > 0)
        return res
          .status(400)
          .json({ message: "Please fill in all the fields", emptyFields });

      const duplicateID = await User.findOne({ username }).exec();
      if (duplicateID)
        return res.status(409).json({ message: "Duplicate User ID" });

      const duplicateEmail = await User.findOne({ email }).exec();
      if (duplicateEmail)
        return res.status(409).json({ message: "Duplicate User User" });

      const genPassword = generateCredential.password(10);
      const docObject = {
        username,
        password: genPassword,
        firstName,
        middleName,
        lastName,
        gender,
        email,
        userType,
        dateOfBirth,
      };
      const activationToken = createToken.activation(docObject);
      const url = `${process.env.BASE_URL}/#/auth/activate/${activationToken}`;
      sendMail.sendNewUser(
        email,
        url,
        "Verify your account",
        username,
        genPassword,
        userType
      );
      res.status(200).json({
        message:
          "A verification has been sent to user email, Please check email's inbox or spam mail.",
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: userController.js:110 ~ createDoc: ~ error",
        error
      );
      res.status(500).json({ message: error.message });
    }
  },
  getAllDoc: async (req, res) => {
    try {
      const doc = await User.find().sort({ createdAt: -1 }).lean();
      if (!doc) return res.status(204).json({ message: "No Records Found!" });
      res.status(200).json(doc);
    } catch (error) {
      console.log(
        "🚀 ~ file: userController.js:15 ~ getAllDoc: ~ error",
        error
      );
      res.status(500).json({ message: error.message });
    }
  },
  getDocByID: async (req, res) => {
    const username = req.params.username;
    if (!username)
      return res.status(400).json({ message: "User ID is required!" });
    if (!isNumber(username))
      return res.status(400).json({ message: "Invalid User ID!" });

    try {
      const doc = await User.findOne({ username }).select("-password").exec();
      if (!doc)
        return res
          .status(400)
          .json({ message: `User [${username}] not found!` });
    } catch (error) {
      console.log(
        "🚀 ~ file: userController.js:144 ~ getDocByID: ~ error",
        error
      );
      res.status(500).json({ message: error.message });
    }
  },
  updateDocByID: async (req, res) => {
    try {
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteDocByID: async (req, res) => {
    try {
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  toggleDocStatus: async (req, res) => {
    const username = req.params.username;
    if (!username)
      return res.status(400).json({ message: `Username is required` });
    try {
      const { status } = req.body;
      console.log(
        "🚀 ~ file: userController.js:192 ~ toggleDocStatus: ~ status",
        status
      );

      if (status !== true && status !== false)
        return res.status(400).json({ message: "Invalid Status" });
      const doc = await User.findOne({ username }).exec();
      if (!doc)
        return res
          .status(204)
          .json({ message: `Username [${username}] not found!` });
      const update = await User.findOneAndUpdate(
        { username },
        {
          status,
        }
      );
      if (!update) {
        return res.status(400).json({ message: "User update failed!" });
      }
      console.log(update);
      res.status(200).json(update);
    } catch (error) {
      console.log(
        "🚀 ~ file: userController.js:231 ~ toggleDocStatus: ~ error",
        error
      );

      res.status(500).json({ message: error.message });
    }
  },
};
module.exports = userController;