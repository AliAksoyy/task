const http = require("http");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({
  path: path.join(__dirname, "config", ".env"),
});

const DbConnection =require("./db/DbConnection");
const app = require("./app");

const server = http.createServer(app);


DbConnection.on("connected", () => {
  console.log("DbConnection connected");
  if (!server.listening) {
    server.listen(process.env.PORT, () => {
      console.log(`server listening on http://localhost:${process.env.PORT}`);
    });
  }
});