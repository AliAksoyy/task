const mongoose = require("mongoose");

const DbConnection = mongoose.createConnection(process.env.MONGO_URI);

module.exports = DbConnection;
