const expressAsyncHandler = require("express-async-handler");
const { PersonelBase } = require("../models/PersonelModel");
class SaveController {
  static saveExcel = expressAsyncHandler(async (req, res) => {
    const data = req.body;

    const personelsData = [];

    for (const item of data) {
      const dynamicFields = {};
      for (const key in item) {
        if (
          key !== "firstName" &&
          key !== "lastName" &&
          key !== "salaryType" &&
          key !== "salaryAmount" &&
          key !== "annualLeaveLimit" &&
          key !== "emailAddress"
        ) {
          dynamicFields[key] = item[key];
        }
      }

      personelsData.push({
        firstName: item.firstName,
        lastName: item.lastName,
        salaryType: item.salaryType,
        salaryAmount: item.salaryAmount,
        annualLeaveLimit: item.annualLeaveLimit,
        emailAddress: item.emailAddress,
        dynamicFields: dynamicFields,
      });
    }

    const savedPersonels = await PersonelBase.insertMany(personelsData);

    res.json({ success: true, data: savedPersonels });
  });
}

module.exports.SaveController = SaveController;
