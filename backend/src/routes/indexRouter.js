const express = require("express");
const { uploadRouter } = require("./uploadRouter");
const { saveRouter } = require("./saveRouter");

const indexRouter = express.Router();

indexRouter.use("/upload", uploadRouter);
indexRouter.use("/save", saveRouter);

module.exports.indexRouter = indexRouter;
