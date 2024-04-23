const expressAsyncHandler = require("express-async-handler");
const { PersonelBase } = require("../models/PersonelModel");
class SaveController {
  static saveExcel = expressAsyncHandler(async (req, res) => {
    const data = req.body;

    const personelsData = [];

    for (const item of data) {
      const dynamicFields = {};

      if (item.age) dynamicFields.age = item.age;
      if (item.bloodType) dynamicFields.bloodType = item.bloodType;

      personelsData.push({
        firstName: item.firstName,
        lastName: item.lastName,
        salaryType: item.salaryType,
        salaryAmount: item.salaryAmount,
        annualLeaveLimit: item.annualLeaveLimit,
        dynamicFields: dynamicFields,
      });
    }

    const savedPersonels = await PersonelBase.insertMany(personelsData);

    res.json({ success: true, data: savedPersonels });
  });
}

module.exports.SaveController = SaveController;
