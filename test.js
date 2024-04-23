const newPersonelSchema = {
  id: "", // unique identifier
  firstName: "", // required
  lastName: "", // required
  salaryType: "TL", // required
  salaryAmount: 0, // required
  annualLeaveLimit: 15, // required
  emailAddress: "", // nullable
};

const matchs = {
  // optionlarla seçilen data
  A: "firstName",
  B: "lastName",
  C: "salaryAmount",
  D: "age", // default value
  E: "bloodType",
};

// if (typeof personel["A"] == typeof newPersonelSchema[A]) {
//   console.log("here");
// }

const personel = {
  A: "Emre",
  B: "Terzi",
  C: 4500,
  D: 25,
  E: "A+",
  F: 12,
};

Object.keys(matchs).forEach((key) => {
  if (typeof personel[key] == typeof newPersonelSchema[matchs[key]]) {
    // console.log("here");
    // push
  } else if (typeof newPersonelSchema[matchs[key]] == "undefined") {
    // default yazıp pushlama
  } else {
    // hatalı kısım
    // hatalı listesine ekleme
  }
});
