const Transaction = require("../model/Transaction");
const Request = require("../model/Request");
const Inventory = require("../model/Inventory");

const transactionController = {
  getAllDoc: async (req, res) => {
    try {
      const doc = await Transaction.find().sort({ createdAt: -1 }).lean();
      if (!doc) return res.status(204).json({ message: "No Records Found!" });
      res.status(200).json(doc);
    } catch (error) {
      console.log(
        "🚀 ~ file: requestController.js:10 ~ getAllDoc: ~ error",
        error
      );
      res.status(500).json({ message: error.message });
    }
  },
  createDoc: async (req, res) => {
    let emptyFields = [];
    try {
      const { reqID, items, transactor } = req.body;
      console.log(
        "🚀 ~ file: transactionController.js:23 ~ createDoc: ~ req.body",
        req.body
      );
      if (!reqID) emptyFields.push("Request ID");
      if (!items) emptyFields.push("Item");
      if (!transactor) emptyFields.push("Transactor");
      if (emptyFields.length > 0)
        return res
          .status(400)
          .json({ message: "Please fill in all the fields", emptyFields });

      const findDoc = await Request.findOne({ reqID }).lean().exec();
      if (!findDoc)
        return res.status(409).json({ message: "Request does not exists!" });

      const docObject = {
        reqID,
        items,
        transactor,
      };
      const createDoc = await Transaction.create(docObject);

      let bulkTags = [];
      items.forEach(async (tag) => {
        bulkTags.push({
          updateOne: {
            filter: {
              lotNum: tag.lotNum,
            },
            update: {
              $inc: {
                quantity: -tag.quantity,
              },
            },
            upsert: true,
          },
        });
      });

      Inventory.bulkWrite(bulkTags, (error, result) => {
        if (error) {
          res.status(400).json({ message: error.message });
        } else {
          console.log(
            "🚀 ~ file: SaleController.js:53 ~ Inventory.bulkWrite ~ result",
            result
          );
        }
      });
      res.status(201).json(createDoc);
    } catch (error) {
      console.log(
        "🚀 ~ file: transactionController.js:31 ~ createDoc: ~ error",
        error
      );
      res.status(500).json({ message: error.message });
    }
  },
  getDocByID: async (req, res) => {
    const transID = req.params.transID;
    if (!transID)
      return res.status(400).json({ message: "Transaction ID is required!" });
    try {
      const doc = await Transaction.findOne({ transID }).exec();
      if (!doc)
        return res
          .status(400)
          .json({ message: `Transaction ID [${transID}] not found!` });
      res.json(doc);
    } catch (error) {
      console.log(
        "🚀 ~ file: transactionController.js:94 ~ getDocByID: ~ error",
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
    const transID = req.params.transID;
    if (!transID)
      return res.status(400).json({ message: "Transaction ID is required!" });
    try {
      if (transID.length !== 24)
        return res.status(400).json({ message: "Transaction ID is invalid!" });
      const doc = await Transaction.findOne({ transID }).exec();
      if (!doc)
        return res
          .status(400)
          .json({ message: `Transaction ID [${transID}] not found!` });
      const deleteDoc = await doc.deleteOne({ transID });
      res.json(deleteDoc);
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
module.exports = transactionController;
