const Request = require("../model/Request");

const requestController = {
  getAllDoc: async (req, res) => {
    try {
      const doc = await Request.find().sort({ createdAt: -1 }).lean();
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
      const { username, requestType, prescriptionIMG_URL } = req.body;

      if (!username) emptyFields.push("Username");
      if (!requestType) emptyFields.push("Request Type");
      if (emptyFields.length > 0)
        return res
          .status(400)
          .json({ message: "Please fill in all the fields", emptyFields });

      const docObject = {
        username,
        requestType,
        prescriptionIMG_URL,
      };
      const createDoc = await Request.create(docObject);
      res.status(201).json(createDoc);
    } catch (error) {
      console.log(
        "🚀 ~ file: requestController.js:60 ~ createDoc: ~ error",
        error
      );
      res.status(500).json({ message: error.message });
    }
  },
  getDocByID: async (req, res) => {
    const reqID = req.params.reqID;
    console.log(
      "🚀 ~ file: requestController.js:46 ~ getDocByID: ~ reqID:",
      reqID
    );
    if (!reqID)
      return res.status(400).json({ message: "Request ID is required!" });
    try {
      // const doc = await Request.findOne({ reqID }).exec();
      const doc = await Request.aggregate([
        { $match: { $expr: { $eq: ["$reqID", { $toObjectId: reqID }] } } },
        {
          $lookup: {
            from: "users",
            localField: "username",
            foreignField: "username",
            as: "profile",
          },
        },
        {
          $unwind: {
            path: "$profile",
          },
        },
        {
          $set: {
            username: {
              $toString: "$profile.username",
            },
            firstName: {
              $toString: "$profile.firstName",
            },
            lastName: {
              $toString: "$profile.lastName",
            },
          },
        },
      ]);
      console.log(
        "🚀 ~ file: requestController.js:80 ~ getDocByID: ~ doc:",
        doc
      );

      if (!doc)
        return res
          .status(400)
          .json({ message: `Request ID [${reqID}] not found!` });
      res.json(doc);
    } catch (error) {
      console.log(
        "🚀 ~ file: requestController.js:79 ~ getDocByID: ~ error",
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
    const reqID = req.params.reqID;
    if (!reqID)
      return res.status(400).json({ message: `Stock ID is required!` });
    try {
      const { reqID, transactor, status, releasingDate } = req.body;
      console.log(
        "🚀 ~ file: transactionController.js:23 ~ createDoc: ~ req.body",
        transactor,
        status
      );
      const doc = await Request.findOne({ reqID }).exec();

      if (!doc)
        return res
          .status(204)
          .json({ message: `Request ID [${reqID}] not found!` });
      const update = await Request.findOneAndUpdate(
        { reqID },
        {
          actionBy: transactor,
          status,
          releasingDate,
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
module.exports = requestController;
