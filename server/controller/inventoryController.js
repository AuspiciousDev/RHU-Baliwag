const Inventory = require("../model/Inventory");
const ACCESS_LIST = require("../config/access_list");
const inventoryController = {
  getAllDoc: async (req, res) => {
    try {
      const doc = await Inventory.find().sort({ createdAt: -1 }).lean();
      if (!doc) return res.status(204).json({ message: "No Records Found!" });
      res.status(200).json(doc);
    } catch (error) {
      console.log(
        "🚀 ~ file: inventoryController.js:10 ~ getAllDoc: ~ error",
        error
      );
      res.status(500).json({ message: error.message });
    }
  },
  createDoc: async (req, res) => {
    let emptyFields = [];
    const {
      lotNum,
      genericName,
      brandName,
      access,
      quantity,
      classification,
      walkInQTY,
      onlineQTY,
      supplier,
      createdBy,
    } = req.body;
    try {
      if (!lotNum) emptyFields.push("Stock ID");
      if (!genericName) emptyFields.push("Generic Name");
      if (!access) emptyFields.push("Access");
      if (!ACCESS_LIST.includes(access)) emptyFields.push("Invalid Access");
      if (!quantity) emptyFields.push("Quantity");
      // if (!walkInQTY) emptyFields.push("Walk in Quantity");
      // if (!onlineQTY) emptyFields.push("Online Quantity");
      if (!supplier) emptyFields.push("Supplier");
      if (!createdBy) emptyFields.push("Created By");
      if (emptyFields.length > 0)
        return res
          .status(400)
          .json({ message: "Please fill in all the fields", emptyFields });
      const duplicate = await Inventory.findOne({
        lotNum,
      })
        .lean()
        .exec();
      if (duplicate)
        return res.status(409).json({ message: "Duplicate Inventory Stock!" });

      // Create Object
      const docObject = {
        lotNum,
        genericName,
        brandName,
        access,
        quantity,
        classification,
        walkInQTY,
        onlineQTY,
        supplier,
        createdBy,
      };
      // Create and Store new Doc
      const response = await Inventory.create(docObject);
      res.status(201).json(response);
    } catch (error) {
      console.log(
        "🚀 ~ file: inventoryController.js:73 ~ createDoc: ~ error",
        error
      );
      res.status(500).json({ message: error.message });
    }
  },
  getDocByID: async (req, res) => {
    try {
      if (!req.params.lotNum)
        return res.status(400).json({ message: "Stock ID is required!" });
      const lotNum = req.params.lotNum;
      const doc = await Inventory.findOne({ lotNum }).exec();
      if (!doc)
        return res
          .status(400)
          .json({ message: `Stock ID [${lotNum}] not found!` });
      res.json(doc);
    } catch (error) {
      console.log("🚀 ~ file: inventoryController.js:88 ~ getDocByID: ~ o", o);
      res.status(500).json({ message: error.message });
    }
  },
  updateDocByID: async (req, res) => {
    try {
      if (!req.params.lotNum)
        return res.status(400).json({ message: "Stock ID is required!" });
      const {
        lotNum,
        genericName,
        brandName,
        access,
        quantity,
        walkInQTY,
        onlineQTY,
        supplier,
        createdBy,
      } = req.body;
      const findDoc = await Inventory.findOne({ lotNum }).exec();
      if (!findDoc)
        return res
          .status(204)
          .json({ message: `Stock ID [${lotNum}] does not exists!` });
      const docObject = {
        genericName,
        brandName,
        access,
        quantity,
        walkInQTY,
        onlineQTY,
        supplier,
        createdBy,
      };
      const update = await Inventory.findOneAndUpdate({ lotNum }, docObject);
      if (update) {
        res.status(200).json({ message: "Stock update success!" });
      } else {
        return res.status(400).json({ message: "Stock update failed!" });
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: inventoryController.js:131 ~ updateDocByID: ~ error",
        error
      );
      res.status(500).json({ message: error.message });
    }
  },
  deleteDocByID: async (req, res) => {
    if (!req.params.lotNum)
      return res.status(400).json({ message: "Stock ID is required!" });
    try {
      const lotNum = req.params.lotNum;
      const doc = await Inventory.findOne({ lotNum }).exec();
      if (!doc)
        return res
          .status(400)
          .json({ message: `Stock ID [${lotNum}] not found!` });
      const deleteDoc = await doc.deleteOne({ lotNum });
      res.json(deleteDoc);
    } catch (error) {
      console.log(
        "🚀 ~ file: inventoryController.js:147 ~ deleteDocByID: ~ error",
        error
      );
      res.status(500).json({ message: error.message });
    }
  },
  toggleDocStatus: async (req, res) => {
    if (!req?.params?.lotNum)
      return res.status(400).json({ message: `Stock ID is required!` });
    try {
      const lotNum = req.params.lotNum;
      const { status } = req.body;
      const doc = await Inventory.findOne({ lotNum }).exec();

      if (!doc)
        return res
          .status(204)
          .json({ message: `Stock ID [${lotNum}] not found!` });
      const update = await Inventory.findOneAndUpdate(
        { lotNum },
        {
          status,
        }
      );
      if (!update) {
        return res.status(400).json({ message: "Stock update failed!" });
      }
      console.log(update);
      res.status(200).json(update);
    } catch (error) {
      console.log(
        "🚀 ~ file: inventoryController.js:185 ~ toggleDocStatus: ~ error",
        error
      );
      res.status(500).json({ message: error.message });
    }
  },
};
module.exports = inventoryController;
