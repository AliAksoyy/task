const express = require("express");
const { SaveController } = require("../controllers/SaveController");


const saveRouter = express.Router();

saveRouter.route("/").post(SaveController.saveExcel);

module.exports.saveRouter = saveRouter;
