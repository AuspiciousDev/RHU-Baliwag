const Restock = require("../model/Restock");
const restockController = {
  createDoc: async (req, res) => {
    let emptyFields = [];
    const { stockID, genericName, brandName, quantity, supplier, restockedBy } =
      req.body;
    try {
      if (!stockID) emptyFields.push("Stock ID");
      if (!genericName) emptyFields.push("Generic Name");
      if (!brandName) emptyFields.push("Brand Name");
      if (!quantity) emptyFields.push("Quantity");
      if (!supplier) emptyFields.push("Supplier");
      if (!restockedBy) emptyFields.push("Restocked By");

      const restockObj = {
        stockID,
        genericName,
        brandName,
        quantity,
        supplier,
        restockedBy,
      };
    } catch (error) {
      console.log(
        "🚀 ~ file: restockController.js:15 ~ createDoc: ~ error",
        error
      );
      res.status(500).json({ message: error.message });
    }
  },
  getAllDoc: async (req, res) => {
    try {
      const doc = await Restock.find().sort({ createdAt: -1 }).lean();
      if (!doc) return res.status(204).json({ message: "No Records Found!" });
      res.status(200).json(doc);
    } catch (error) {
      console.log(
        "🚀 ~ file: restockController.js:24 ~ getAllDoc: ~ error",
        error
      );
      res.status(500).json({ message: error.message });
    }
  },
  getDocByID: async (req, res) => {
    const _id = req.params._id;
    if (!_id)
      return res.status(400).json({ message: "Restock ID is required!" });
    try {
      if (_id.length !== 24)
        return res.status(400).json({ message: "Restock ID is invalid!" });
      const doc = await Restock.findOne({ _id }).exec();
      if (!doc)
        return res
          .status(400)
          .json({ message: `Restock ID [${_id}] not found!` });
      res.json(doc);
    } catch (error) {
      console.log(
        "🚀 ~ file: restockController.js:47 ~ getDocByID: ~ error",
        error
      );
      res.status(500).json({ message: error.message });
    }
  },
  // updateDocByID: async (req, res) => {
  //   if (!req.params._id)
  //     return res.status(400).json({ message: "Restock ID is required!" });
  //   try {
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // },
  deleteDocByID: async (req, res) => {
    const _id = req.params._id;
    if (!_id)
      return res.status(400).json({ message: "Restock ID is required!" });
    try {
      if (_id.length !== 24)
        return res.status(400).json({ message: "Restock ID is invalid!" });
      const doc = await Restock.findOne({ _id }).exec();
      if (!doc)
        return res
          .status(400)
          .json({ message: `Restock ID [${_id}] not found!` });
      const deleteDoc = await doc.deleteOne({ _id });
      res.json(deleteDoc);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
module.exports = restockController;
