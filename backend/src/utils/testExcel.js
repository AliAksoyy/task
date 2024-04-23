const excelToJson = require("convert-excel-to-json");
const path = require("path");
const { matchKeys } = require("./matchedKeys");

const newPersonelSchema = {
  id: "", // unique identifier
  firstName: "", // required
  lastName: "", // required
  salaryType: "TL", // required
  salaryAmount: 0, // required
  annualLeaveLimit: 15, // required
  emailAddress: "", // nullable
};

const testExcel = async (fileName, matches) => {
  const result = excelToJson({
    sourceFile: path.join(__dirname, "..", "uploads", fileName),
    columnToKey: {
      A: "personelName",
      B: "personelSurname",
      C: "netSalary",
      D: "age",
      E: "bloodType",
    },
  });

  const errors = [];
  const temps = [];

  const customKey = result.Sayfa1[0];

  const matchedKeys = matchKeys(matches, customKey);

  result.Sayfa1.slice(1).forEach((personel) => {
    let isValid = true;

    const pers = {
      id: Math.random().toString().split(".")[1],
    };

    Object.entries(matchedKeys).forEach(([key, value]) => {
      if (value === "Default") {
        pers[key] = newPersonelSchema[key] || "";
      } else {
        pers[key] = personel[value];
      }
    });

    for (const key in pers) {
      if (
        (typeof pers[key] !== "string" && typeof pers[key] !== "number") ||
        (key == "age" && typeof pers[key] !== "number") ||
        (key == "salaryAmount" && typeof pers[key] !== "number")
      ) {
        isValid = false;
        break;
      }
    }

    if (!isValid) {
      errors.push(personel);
    } else {
      temps.push(pers);
    }
  });
  console.log(temps);
  console.log(errors);
  return { errors, temps };
};

module.exports = testExcel;
