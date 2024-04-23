const express = require("express");
const multer = require("multer");
const upload = multer();
const { UploadController } = require("../controllers/UploadController");

const uploadRouter = express.Router();

uploadRouter
  .route("/")
  .post(upload.single("file"), UploadController.uploadExcel);

uploadRouter.route("/test").post(UploadController.test);

module.exports.uploadRouter = uploadRouter;
