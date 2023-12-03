// TO RUN ts-node --esm day3.ts

import * as fs from "fs";

type checkIfNumberTouchingSymbolInput = {
  upRow?: string;
  middleRow: string;
  downRow?: string;
  index: number;
};

function checkIfNotDotAndNotNumber(element: string) {
  return element && element !== "." && isNaN(parseInt(element));
}

function checkIfNumberTouchingSymbol(input: checkIfNumberTouchingSymbolInput) {
  if (checkIfNotDotAndNotNumber(input.upRow?.split("")[input.index - 1])) {
    return true;
  }
  if (checkIfNotDotAndNotNumber(input.upRow?.split("")[input.index])) {
    return true;
  }
  if (checkIfNotDotAndNotNumber(input.upRow?.split("")[input.index + 1])) {
    return true;
  }
  if (checkIfNotDotAndNotNumber(input.middleRow.split("")[input.index - 1])) {
    return true;
  }
  if (checkIfNotDotAndNotNumber(input.middleRow.split("")[input.index + 1])) {
    return true;
  }
  if (checkIfNotDotAndNotNumber(input.downRow?.split("")[input.index - 1])) {
    return true;
  }
  if (checkIfNotDotAndNotNumber(input.downRow?.split("")[input.index + 1])) {
    return true;
  }
  if (checkIfNotDotAndNotNumber(input.downRow?.split("")[input.index])) {
    return true;
  }
  return false;
}

type checkIfNumberOnTheLeftInput = {
  row: string;
  index: number;
};

function checkIfNumberOnTheLeft(input: checkIfNumberOnTheLeftInput) {
  const result = [];
  if (!isNaN(parseInt(input.row.split("")[input.index - 1]))) {
    result.push(input.index - 1);
    result.push(
      ...checkIfNumberOnTheLeft({ row: input.row, index: input.index - 1 })
    );
  }
  return result;
}

function checkIfNumberOnTheRight(input: checkIfNumberOnTheLeftInput) {
  const result = [];
  if (!isNaN(parseInt(input.row.split("")[input.index + 1]))) {
    result.push(input.index + 1);
    result.push(
      ...checkIfNumberOnTheRight({ row: input.row, index: input.index + 1 })
    );
  }
  return result;
}

function main() {
  console.log("start");
  fs.readFile("day3input.txt", "utf8", (err, data) => {
    if (err) throw err;

    const arr = data.split("\n");
    let result = 0;
    for (let i = 0; i < arr.length; i++) {
      console.log(arr[i]);

      const upRow = arr[i - 1];
      const middleRow = arr[i];
      const downRow = arr[i + 1];
      const arrayOfIndexesWhereNumber = [];
      middleRow.split("").forEach((element, i) => {
        if (!isNaN(parseInt(element))) {
          if (
            checkIfNumberTouchingSymbol({
              upRow,
              middleRow,
              downRow,
              index: i,
            })
          ) {
            arrayOfIndexesWhereNumber.push(i);
            arrayOfIndexesWhereNumber.push(
              ...checkIfNumberOnTheLeft({ row: middleRow, index: i })
            );
            arrayOfIndexesWhereNumber.push(
              ...checkIfNumberOnTheRight({ row: middleRow, index: i })
            );
          }
        }
      });
      const sortedFilteredIndexes = Array.from(
        new Set<number>(arrayOfIndexesWhereNumber.sort((a, b) => a - b))
      );
      let subarrays = [];
      let currentSubarray = [sortedFilteredIndexes[0]];

      for (let i = 1; i < sortedFilteredIndexes.length; i++) {
        if (
          Math.abs(
            sortedFilteredIndexes[i] -
              currentSubarray[currentSubarray.length - 1]
          ) === 1
        ) {
          currentSubarray.push(sortedFilteredIndexes[i]);
        } else {
          subarrays.push(currentSubarray);
          currentSubarray = [sortedFilteredIndexes[i]];
        }
      }

      subarrays.push(currentSubarray);

      subarrays.forEach((subarray) => {
        let str = "";
        subarray.forEach((element) => {
          str += middleRow[element];
        });
        result += parseInt(str);
      });
    }
    console.log(result);
  });
}

main();
