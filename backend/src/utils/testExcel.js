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

  const matchedKeys = {};

  for (const matchKey in matches) {
    // Her bir customKey öğesini döngü içinde ele alın

    let foundMatch = false;
    for (const customKeyKey in customKey) {
      // Eğer matches öğesinin değeri, customKey öğesinin değerine eşitse
      if (!Object.values(matches).includes(customKey[customKeyKey])) {
        // matchedKeys nesnesine ekleyin
        matchedKeys[customKeyKey] = customKeyKey;
      }

      if (matches[matchKey] === customKey[customKeyKey]) {
        // Eşleşen anahtarı matchedKeys nesnesine ekle
        matchedKeys[matchKey] = customKeyKey;
        foundMatch = true;
        // İç içe döngüden çık
        break;
      }
    }
    if (!foundMatch) {
      // Eğer eşleşme bulunamadıysa, "empty" değerini ata
      matchedKeys[matchKey] = "empty";
    }
  }

  result.Sayfa1.slice(1).forEach((personel) => {
    let isValid = true;

    const pers = {
      id: Math.random().toString().split(".")[1],
      // dynamics: {},
    };

    Object.entries(matchedKeys).forEach(([key, value]) => {
      if (value === "empty") {
        pers[key] = newPersonelSchema[key] || "";
      } else {
        pers[key] = personel[value];
      }
      console.log(pers);

      // else if (typeof personel[value] !== "undefined") {
      //   pers[key] = personel[value];
      // }

      //else if (
      //   typeof personel[matches[key]] != typeof newPersonelSchema.firstName ||
      //   typeof personel[matches[key]] != typeof newPersonelSchema.lastName ||
      //   typeof personel[matches[key]] !=
      //     typeof newPersonelSchema.salaryAmount ||
      //   typeof personel[matches[key]] != "number" ||
      //   (typeof personel[matches[key]] != "string" &&
      //     personel[matches[key]] != 0)
      // ) {
      //   isValid = false;
      // }
      //else {
      //   pers.dynamics[key] = personel[key];
      // }
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
