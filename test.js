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
    // push
  } else if (typeof newPersonelSchema[matchs[key]] == "undefined") {
    // default yazıp pushlama
  } else {
    // hatalı kısım
    // hatalı listesine ekleme
  }
});


//  if (
//    "D" in matchedKeys ||
//    "E" in matchedKeys ||
//    "F" in matchedKeys ||
//    "G" in matchedKeys
//  ) {
//    matchedKeys = {
//      ...matchedKeys,
//      [customKey.D]: customKey.D,
//      [customKey.E]: customKey.E,
//      [customKey.F]: customKey.F,
//      [customKey.G]: customKey.G,
//    };
//  }

//  const { D, E, F, G, ...remainingKeys } = matchedKeys;
//  matchedKeys = remainingKeys;

//  console.log("matchedKeys", matchedKeys);