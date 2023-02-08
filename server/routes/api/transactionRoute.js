const express = require("express");
const router = express.Router();
const transactionController = require("../../controller/transactionController");

router.get("/", transactionController.getAllDoc);
router.patch("/update/:transID", transactionController.updateDocByID);
router.get("/search/:transID", transactionController.getDocByID);
router.post("/create", transactionController.createDoc);
router.delete("/delete/:transID", transactionController.deleteDocByID);
router.patch("/update/status/:transID", transactionController.toggleDocStatus);

module.exports = router;
