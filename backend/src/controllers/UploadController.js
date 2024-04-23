const expressAsyncHandler = require("express-async-handler");
const path = require("path");
const testExcel = require("../utils/testExcel");
const fs = require("fs");
const excelToJson = require("convert-excel-to-json");
const testExcel1 = require("../utils/testExcel1");
const testExcel2 = require("../utils/testExcel2");

class UploadController {
  static uploadExcel = expressAsyncHandler(async (req, res) => {
    fs.writeFileSync(
      path.join(__dirname, "..", "uploads", req.file.originalname),
      req.file.buffer
    );
    const result = excelToJson({
      sourceFile: path.join(__dirname, "..", "uploads", req.file.originalname),
    });

    res.json({
      success: true,
      data: {
        fileName: req.file.originalname,
        excelKeys: Object.values(result.Sayfa1[0]),
        dbKeys: [
          "firstName",
          "lastName",
          "salaryType",
          "salaryAmount",
          "annualLeaveLimit",
          "emailAddress",
        ],
      },
    });
  });

  static test = expressAsyncHandler(async (req, res) => {
    const { matches, fileName } = req.body;

    const response = await testExcel2(fileName, matches);

    res.json({ success: true, data: response });
  });
}

module.exports.UploadController = UploadController;
