const express = require("express");
const router = express.Router();
const inventoryController = require("../../controller/inventoryController");

router.get("/", inventoryController.getAllDoc);
router.patch("/update/:lotNum", inventoryController.updateDocByID);
router.get("/search/:lotNum", inventoryController.getDocByID);
router.post("/create", inventoryController.createDoc);
router.delete("/delete/:lotNum", inventoryController.deleteDocByID);
router.patch("/update/status/:lotNum", inventoryController.toggleDocStatus);

module.exports = router;
