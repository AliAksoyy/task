const matchKeys = (matches, customKey) => {
  const matchedKeys = {};

  for (const matchKey in matches) {
    let foundMatch = false;
    for (const customKeyKey in customKey) {
      if (!Object.values(matches).includes(customKey[customKeyKey])) {
        matchedKeys[customKeyKey] = customKeyKey;
      }

      if (matches[matchKey] === customKey[customKeyKey]) {
        matchedKeys[matchKey] = customKeyKey;
        foundMatch = true;
        break;
      }
    }
    if (!foundMatch) {
      matchedKeys[matchKey] = "Default";
    }
  }

  return matchedKeys;
};

module.exports = { matchKeys };
