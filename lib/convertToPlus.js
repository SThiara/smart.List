const convertSpacesToPlus = function(inputString) {
  let newString = "";
  for (const letter of inputString) {
    if (letter === " ") {
      newString += "+";
    } else {
      newString += letter;
    }
  }
  while (newString[newString.length - 1] === "+") {
    newString = newString.slice(0, -1);
  }
};

module.exports = { convertSpacesToPlus };