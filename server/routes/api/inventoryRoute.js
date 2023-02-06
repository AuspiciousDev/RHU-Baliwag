const express = require("express");
const router = express.Router();
const inventoryController = require("../../controller/inventoryController");

router.get("/", inventoryController.getAllDoc);
router.patch("/update/:stockID", inventoryController.updateDocByID);
router.get("/search/:stockID", inventoryController.getDocByID);
router.post("/create", inventoryController.createDoc);
router.delete("/delete/:stockID", inventoryController.deleteDocByID);
router.patch("/update/status/:stockID", inventoryController.toggleDocStatus);

module.exports = router;
