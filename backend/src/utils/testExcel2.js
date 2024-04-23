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

const testExcel2 = async (fileName, matches) => {
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

  result.Sayfa1.slice(1).forEach((personel) => {
    let isValid = true;
    if (
      typeof personel.personelName != typeof newPersonelSchema.firstName ||
      typeof personel.personelSurname != typeof newPersonelSchema.lastName ||
      typeof personel.netSalary != typeof newPersonelSchema.salaryAmount ||
      typeof personel.age != "number" ||
      (typeof personel.bloodType != "string" && personel.bloodType != 0)
    ) {
      isValid = false;
    }
    if (!isValid) {
      errors.push(personel);
    } else {
      temps.push({
        id: Math.random().toString().split(".")[1],
        firstName: personel.personelName,
        lastName: personel.personelSurname,
        salaryType: "TL", // default
        salaryAmount: personel.netSalary, // required
        annualLeaveLimit: 15, // default
        emailAddress: null, // default
        age: personel.age,
        bloodType: personel.bloodType,
      });
    }
  });

  return { errors, temps };
};

module.exports = testExcel2;

// matches {
//   firstName: 'Personnel name',
//   lastName: 'Personnel surname',
//   salaryType: 'empty',
//   salaryAmount: 'Net Salary',
//   annualLeaveLimit: 'empty',
//   emailAddress: 'empty'
// }

// customKey {
//   personelName: 'Personnel name',
//   personelSurname: 'Personnel surname',
//   netSalary: 'Net Salary',
//   age: 'Age',
//   bloodType: 'Blood Type'
// }

// [
//   {
//     personelName: "Ali",
//     personelSurname: "Gökçe",
//     netSalary: 3700,
//     age: 23,
//     bloodType: "B",
//   },
//   {
//     personelName: "Cihan",
//     personelSurname: "Altınbaş",
//     netSalary: 7300,
//     age: 49,
//     bloodType: "A Rh-",
//   },
//   {
//     personelName: "Sevinç",
//     personelSurname: "Arslanoğlu",
//     netSalary: 3100,
//     age: 28,
//     bloodType: "B Rh+",
//   },
//   { personelName: "Hakan", age: 35, bloodType: "A" },
//   {
//     personelName: "Ayşegül",
//     personelSurname: "Avcı",
//     netSalary: 3700,
//     age: "yas",
//     bloodType: "AB Rh-",
//   },
//   {
//     personelName: "Burak",
//     personelSurname: "Aydoğdu",
//     age: 42,
//     bloodType: "A Rh+",
//   },
//   {
//     personelName: "Ediz",
//     personelSurname: "Arıcı",
//     netSalary: 6400,
//     age: 38,
//     bloodType: "B",
//   },
//   {
//     personelName: "Elif",
//     personelSurname: "Avcılar",
//     netSalary: 4000,
//     age: 27,
//     bloodType: "AB Rh+",
//   },
//   {
//     personelSurname: "Avcıoğlu",
//     netSalary: 6900,
//     age: 45,
//     bloodType: "A Rh-",
//   },
// ];
