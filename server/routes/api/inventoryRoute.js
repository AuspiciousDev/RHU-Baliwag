const express = require("express");
const router = express.Router();
const inventoryController = require("../../controller/inventoryController");

router.get("/", inventoryController.getAllDoc);
router.patch("/update/:medicineID", inventoryController.updateDocByID);
router.get("/search/:medicineID", inventoryController.getDocByID);
router.post("/register", inventoryController.createDoc);
router.delete("/delete/:medicineID", inventoryController.deleteDocByID);
router.patch("/update/status/:medicineID", inventoryController.toggleDocStatus);

module.exports = router;
