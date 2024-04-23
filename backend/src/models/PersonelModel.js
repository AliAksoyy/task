const mongoose = require("mongoose");
const DbConnection = require("../db/DbConnection");

const PersonelSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  salaryType: {
    type: String,
    required: true,
  },
  salaryAmount: {
    type: Number,
    required: true,
  },
  annualLeaveLimit: {
    type: Number,
    required: true,
  },
  emailAddress: {
    type: String,
    required: false,
  },
  dynamicFields: {
    type: mongoose.Schema.Types.Mixed,
    default: {}, 
  },
});

module.exports.PersonelBase = DbConnection.model(
  "PersonelBase",
  PersonelSchema
);
