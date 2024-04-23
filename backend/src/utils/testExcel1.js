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

const testExcel1 = async (fileName, matches) => {
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

  const customerKey = result.Sayfa1[0];

  const errors = [];
  const temps = [];

  result.Sayfa1.slice(1).forEach((personel) => {
    let isValid = true;
    Object.keys(customerKey).forEach((key) => {
      if (key == "age" && typeof personel[key] != "number") {
        isValid = false;
      }
    });
    if (!isValid) {
      errors.push(personel);
    } else {
      temps.push(personel);
    }

    // if (
    //   typeof personel.personelName != typeof newPersonelSchema.firstName ||
    //   typeof personel.personelSurname != typeof newPersonelSchema.lastName ||
    //   typeof personel.netSalary != typeof newPersonelSchema.salaryAmount ||
    //   typeof personel.age != "number" ||
    //   (typeof personel.bloodType != "string" && personel.bloodType != 0)
    // ) {
    //   isValid = false;
    // }
    // if (!isValid) {
    //   errors.push(personel);
    // } else {
    //   temps.push({
    //     id: Math.random().toString().split(".")[1],
    //     firstName: personel.personelName,
    //     lastName: personel.personelSurname,
    //     salaryType: "TL", // default
    //     salaryAmount: personel.netSalary, // required
    //     annualLeaveLimit: 15, // default
    //     emailAddress: null, // default
    //     age: personel.age,
    //     bloodType: personel.bloodType,
    //   });
    // }
  });
  console.log(errors);
  console.log(temps);
  return { errors, temps };
};

module.exports = testExcel1;
