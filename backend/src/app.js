const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const { indexRouter } = require("./routes/indexRouter");
const ErrorHandler = require("./error/ErrorHandler");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);


app.use("/public", express.static(path.join(__dirname, "public")));

app.use(indexRouter);

app.use(ErrorHandler);

module.exports = app;
