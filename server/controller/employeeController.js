const Employee = require("../model/Employee");
const ROLES_LIST = require("../config/role_list");
const generateCredential = require("../helper/generateCredential");
const createToken = require("../helper/createToken");

const isEmail = (str) =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str);

const employeeController = {
  createDoc: async (req, res) => {
    let emptyFields = [];
    try {
      const {
        empID,
        empType,
        email,
        firstName,
        middleName,
        lastName,
        dateOfBirth,
        placeOfBirth,
        gender,
        civilStatus,
        nationality,
        religion,
        address,
        city,
        province,
        mobile,
        telephone,
        emergencyContactName,
        emergencyContactNumber,
        emergencyContactRelationship,
      } = req.body;
      if (!empID) emptyFields.push("Employee ID");
      if (empID?.length != 10)
        emptyFields.push("Employee ID must be 10 Digits!");
      if (!isNumber(empID)) emptyFields.push("Employee ID must be a digit");
      if (!ROLES_LIST.includes(empType))
        emptyFields.push("Invalid Employee Type");
      if (!email) emptyFields.push("Email");
      if (!isEmail(email)) emptyFields.push("Invalid email");
      if (!firstName) emptyFields.push("First Name");
      if (!lastName) emptyFields.push("Last Name");
      if (!dateOfBirth) emptyFields.push("Date of Birth");
      if (!placeOfBirth) emptyFields.push("Place of Birth");
      if (!gender) emptyFields.push("Gender");
      if (!civilStatus) emptyFields.push("Civil Status");
      if (!nationality) emptyFields.push("Nationality");
      if (!address) emptyFields.push("Address");
      if (!city) emptyFields.push("City");
      if (!province) emptyFields.push("Province");
      if (!mobile) emptyFields.push("Mobile");
      if (!emergencyContactName) emptyFields.push("Emergency Contact Name");
      if (!emergencyContactNumber) emptyFields.push("Emergency Contact Number");
      if (!emergencyContactRelationship)
        emptyFields.push("Emergency Contact Relationship");
      if (emptyFields.length > 0)
        return res
          .status(400)
          .json({ message: "Please fill in all the fields", emptyFields });

      const duplicateID = await Employee.findOne({ empID }).exec();
      if (duplicateID)
        return res.status(409).json({ message: "Duplicate Employee ID" });

      const duplicateEmail = await Employee.findOne({ email }).exec();
      if (duplicateEmail)
        return res.status(409).json({ message: "Duplicate Employee Employee" });

      const genPassword = generateCredential.password(10);
      const docObject = {
        empID,
        empType,
        password: genPassword,
        email,
        firstName,
        middleName,
        lastName,
        dateOfBirth,
        placeOfBirth,
        gender,
        civilStatus,
        nationality,
        religion,
        address,
        city,
        province,
        mobile,
        telephone,
        emergencyContactName,
        emergencyContactNumber,
        emergencyContactRelationship,
      };
      const activationToken = createToken.activation(docObject);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getAllDoc: async (req, res) => {
    try {
      const doc = await Employee.find().sort({ createdAt: -1 }).lean();
      if (!doc) return res.status(204).json({ message: "No Records Found!" });
      res.status(200).json(doc);
    } catch (error) {
      console.log(
        "🚀 ~ file: employeeController.js:15 ~ getAllDoc: ~ error",
        error
      );
      res.status(500).json({ message: error.message });
    }
  },
  getDocByID: async (req, res) => {
    try {
    } catch (error) {
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
    try {
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
module.exports = employeeController;
