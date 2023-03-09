const express = require("express");
const router = express.Router();
const transactionController = require("../../controller/transactionController");

router.get("/", transactionController.getAllDoc);
router.get("/allTransactions", transactionController.getAllTrans);
router.patch("/update/:transID", transactionController.updateDocByID);
router.patch("/update/req/:reqID", transactionController.updateDocByReqID);
router.get("/search/:transID", transactionController.getDocByID);
router.get("/search/req/:reqID", transactionController.getDocByReqID);
router.post("/create", transactionController.createDoc);
router.delete("/delete/:transID", transactionController.deleteDocByID);
router.patch("/update/status/:transID", transactionController.toggleDocStatus);

module.exports = router;
