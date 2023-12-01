const fs = require("fs");

const namesOfNumberstoNumberMap = new Map();
namesOfNumberstoNumberMap.set("1", "1");
namesOfNumberstoNumberMap.set("2", "2");
namesOfNumberstoNumberMap.set("3", "3");
namesOfNumberstoNumberMap.set("4", "4");
namesOfNumberstoNumberMap.set("5", "5");
namesOfNumberstoNumberMap.set("6", "6");
namesOfNumberstoNumberMap.set("7", "7");
namesOfNumberstoNumberMap.set("8", "8");
namesOfNumberstoNumberMap.set("9", "9");
namesOfNumberstoNumberMap.set("one", "1");
namesOfNumberstoNumberMap.set("two", "2");
namesOfNumberstoNumberMap.set("three", "3");
namesOfNumberstoNumberMap.set("four", "4");
namesOfNumberstoNumberMap.set("five", "5");
namesOfNumberstoNumberMap.set("six", "6");
namesOfNumberstoNumberMap.set("seven", "7");
namesOfNumberstoNumberMap.set("eight", "8");
namesOfNumberstoNumberMap.set("nine", "9");
function main() {
  console.log("start");
  let result = 0;
  fs.readFile("day1input.txt", "utf8", (err, data) => {
    if (err) throw err;

    const arr = data.split("\n");
    arr.forEach((row) => {
      console.log("row", row);
      let replacedRow = row;
      const indexNumberMap = new Map();
      [...namesOfNumberstoNumberMap.keys()].forEach((nameOfNumber) => {
        const firstIndex = replacedRow.indexOf(nameOfNumber);
        const lastIndex = replacedRow.lastIndexOf(nameOfNumber);
        if (firstIndex !== -1) {
          indexNumberMap.set(firstIndex, nameOfNumber);
        }
        if (lastIndex !== -1) {
          indexNumberMap.set(lastIndex, nameOfNumber);
        }

      });

      const firstIndex = Math.min(...indexNumberMap.keys());
      const lastIndex = Math.max(...indexNumberMap.keys());
      result += parseInt(
        namesOfNumberstoNumberMap.get(indexNumberMap.get(firstIndex)) +
          namesOfNumberstoNumberMap.get(indexNumberMap.get(lastIndex)) ??
          namesOfNumberstoNumberMap.get(indexNumberMap.get(firstIndex))
      );
     
      console.log("result", result);
    });
  });
}

main();
