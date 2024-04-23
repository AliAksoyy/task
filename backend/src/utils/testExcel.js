const excelToJson = require("convert-excel-to-json");
const path = require("path");

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
  console.log("matches", matches);
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

  console.log("aaa", result);

  const errors = [];
  const temps = [];

  result.Sayfa1.slice(1).forEach((personel) => {
    let isValid = true;

    const pers = {
      id: Math.random().toString().split(".")[1],
      dynamics: {},
    };

    // Object.keys(matches).forEach((key) => {
    //   if (typeof personel[key] == typeof newPersonelSchema[matches[key]]) {
    //     pers[key] = personel[key];
    //   } else if (typeof newPersonelSchema[matches[key]] == "undefined") {
    //     pers.dynamics[key] = personel[key];
    //   } else {
    //     isValid = false;
    //   }
    // });

    Object.keys(matches).forEach((key) => {
      if (matches[key] === "empty") {
        pers[key] = newPersonelSchema[key] || "";
      } else if (typeof personel[matches[key]] !== "undefined") {
        pers[key] = personel[matches[key]];
      } else if (
        typeof personel[matches[key]] != typeof newPersonelSchema.firstName ||
        typeof personel[matches[key]] != typeof newPersonelSchema.lastName ||
        typeof personel[matches[key]] !=
          typeof newPersonelSchema.salaryAmount ||
        typeof personel[matches[key]] != "number" ||
        (typeof personel[matches[key]] != "string" &&
          personel[matches[key]] != 0)
      ) {
        isValid = false;
      } else {
        pers.dynamics[key] = personel[key];
      }
    });

    // if (
    //   typeof personel.personelName != typeof newPersonelSchema.firstName ||
    //   typeof personel.personelSurname != typeof newPersonelSchema.lastName ||
    //   typeof personel.netSalary != typeof newPersonelSchema.salaryAmount ||
    //   typeof personel.age != "number" ||
    //   (typeof personel.bloodType != "string" && personel.bloodType != 0)
    // ) {
    //   isValid = false;
    // }
    if (!isValid) {
      errors.push(personel);
    } else {
      temps.push(pers);
      // temps.push({
      //   id: Math.random().toString().split(".")[1],
      //   [firstName]: personel.personelName,
      //   lastName: personel.personelSurname,
      //   salaryType: "TL", // default
      //   salaryAmount: personel.netSalary, // required
      //   annualLeaveLimit: 15, // default
      //   emailAddress: null, // default
      //   age: personel.age,
      //   bloodType: personel.bloodType,
      // });
    }
  });

  return { errors, temps };
};

module.exports = testExcel;
