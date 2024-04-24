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
const frontMatches = {
  A: "firstName",
  B: "lastName",
  C: "salaryAmount",
  D: "age", // default value
  E: "bloodType",
  F:"height"
};

const matchs = {
  // optionlarla seçilen data
  firstName: "firstName",
  lastName: "lastName",
  salaryAmount: "salaryAmount",
  D: "age", // default value
  E: "bloodType",
  F: "height",
};

const testExcel = async (fileName, matches) => {
  const result = excelToJson({
    sourceFile: path.join(__dirname, "..", "uploads", fileName),
  });

  const errors = [];
  const temps = [];

  const customKey = result.Sayfa1[0];

  let matchedKeys = matchKeys(matches, customKey);

  result.Sayfa1.slice(1).forEach((personel) => {
    let isValid = true;

    const pers = {
      id: Math.random().toString().split(".")[1],
    };

    Object.entries(matchedKeys).forEach(([key, value]) => {
      if (value === "Default") {
        pers[key] = newPersonelSchema[key] || "";
      } else {
        pers[matchs[key]] = personel[value];
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

  return { errors, temps, frontMatches };
};

module.exports = testExcel;

// const excelToJson = require("convert-excel-to-json");
// const path = require("path");
// const { matchKeys } = require("./matchedKeys");

// const newPersonelSchema = {
//   id: "", // unique identifier
//   firstName: "", // required
//   lastName: "", // required
//   salaryType: "TL", // required
//   salaryAmount: 0, // required
//   annualLeaveLimit: 15, // required
//   emailAddress: "", // nullable
// };
// const frontMatches = {
//   A: "firstName",
//   B: "lastName",
//   C: "salaryAmount",
//   D: "age", // default value
//   E: "bloodType",
//   F: "ali",
// };

// const matchs = {
//   // optionlarla seçilen data
//   firstName: "firstName",
//   lastName: "lastName",
//   salaryAmount: "salaryAmount",
//   D: "age", // default value
//   E: "bloodType",
//   F: "ali",
// };

// const testExcel = async (fileName, matches) => {
//   const result = excelToJson({
//     sourceFile: path.join(__dirname, "..", "uploads", fileName),
//   });

//   const errors = [];
//   const temps = [];

//   const customKey = result.Sayfa1[0];

//   let matchedKeys = matchKeys(matches, customKey);

//   result.Sayfa1.slice(1).forEach((personel) => {
//     let isValid = true;

//     const pers = {
//       id: Math.random().toString().split(".")[1],
//       dinamicFields: {},
//     };

//     Object.entries(matchedKeys).forEach(([key, value]) => {
//       if (value === "Default") {
//         pers[key] = newPersonelSchema[key] || "";
//       } else {
//         if (key === "D" || key === "E" || key === "F") {
//           pers.dinamicFields[matchs[key]] = personel[value];
//         } else {
//           pers[matchs[key]] = personel[value];
//         }
//       }
//     });

//     for (const key in pers) {
//       if (
//         typeof pers.firstName !== "string" ||
//         typeof pers.lastName !== "string" ||
//         typeof pers.salaryAmount !== "number" ||
//         isNaN(pers.salaryAmount) ||
//         typeof pers.dinamicFields.age !== "number" ||
//         isNaN(pers.dinamicFields.age) ||
//         typeof pers.dinamicFields.bloodType !== "string" ||
//         (pers.dinamicFields.bloodType != "0" &&
//           !pers.dinamicFields.bloodType.trim())
//       ) {
//         isValid = false;
//         break;
//       }
//     }

//     if (!isValid) {
//       errors.push(personel);
//     } else {
//       temps.push(pers);
//     }
//   });

//   return { errors, temps, frontMatches };
// };

// module.exports = testExcel;
