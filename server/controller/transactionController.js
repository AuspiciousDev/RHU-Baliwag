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
      const { reqID, items, releasingDate } = req.body;
      console.log(
        "🚀 ~ file: transactionController.js:23 ~ createDoc: ~ req.body",
        req.body
      );
      if (!reqID) emptyFields.push("Request ID");
      if (!items) emptyFields.push("Items");
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
        releasingDate,
      };
      const createDoc = await Transaction.create(docObject);

      // let bulkTags = [];
      // items.forEach(async (tag) => {
      //   bulkTags.push({
      //     updateOne: {
      //       filter: {
      //         lotNum: tag.lotNum,
      //       },
      //       update: {
      //         $inc: {
      //           quantity: -tag.quantity,
      //         },
      //       },
      //       upsert: true,
      //     },
      //   });
      // });

      // Inventory.bulkWrite(bulkTags, (error, result) => {
      //   if (error) {
      //     res.status(400).json({ message: error.message });
      //   } else {
      //     console.log(
      //       "🚀 ~ file: SaleController.js:53 ~ Inventory.bulkWrite ~ result",
      //       result
      //     );
      //   }
      // });
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
  getDocByReqID: async (req, res) => {
    const reqID = req.params.reqID;
    if (!reqID)
      return res.status(400).json({ message: "Request ID is required!" });
    try {
      const doc = await Transaction.findOne({ reqID }).exec();
      if (!doc)
        return res
          .status(400)
          .json({ message: `Request ID [${reqID}] not found!` });
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
  updateDocByReqID: async (req, res) => {
    const reqID = req.params.reqID;
    if (!reqID)
      return res.status(400).json({ message: "Request ID is required!" });
    try {
      const doc = await Transaction.findOne({ reqID }).exec();
      const { items } = req.body;
      if (!doc)
        return res.status(204).json({
          message: `Request ID [${reqID}] not found on Transactions!`,
        });
      const update = await Transaction.findOneAndUpdate(
        { reqID },
        { $push: { items: items }, upsert: true }
      );
      if (!update) {
        return res.status(400).json({ message: "Stock update failed!" });
      }
      console.log(update);
      res.status(200).json(update);
    } catch (error) {
      console.log(
        "🚀 ~ file: transactionController.js:131 ~ updateDocByReqID: ~ error:",
        error
      );
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
    const transID = req.params.transID;
    if (!transID)
      return res.status(400).json({ message: `Transaction ID is required!` });
    try {
      const { transID, transactor, status, releasedDate } = req.body;
      console.log(
        "🚀 ~ file: transactionController.js:179 ~ toggleDocStatus: ~ req.body:",
        req.body
      );
      const doc = await Transaction.findOne({ transID }).exec();
      if (!doc)
        return res
          .status(204)
          .json({ message: `Transaction ID [${transID}] not found!` });

      const update = await Transaction.findOneAndUpdate(
        { transID },
        {
          transactor,
          status,
          releasedDate,
        }
      );
      if (!update) {
        return res.status(400).json({ message: "Stock update failed!" });
      }
      let bulkTags = [];
      items.forEach(async (tag) => {
        bulkTags.push({
          updateOne: {
            filter: {
              medID: tag.medID,
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
            "🚀 ~ file: transactionController.js:214 ~ Inventory.bulkWrite ~ result:",
            result
          );
        }
      });
      console.log(update);
      res.status(200).json(update);
    } catch (error) {
      console.log("🚀 ~ file: transactionController.js:230 ~ toggleDocStatus: ~ error:", error)
      res.status(500).json({ message: error.message });
    }
  },
};
module.exports = transactionController;
