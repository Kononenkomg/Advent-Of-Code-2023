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
  if (!isNaN(parseInt(input.row.split("")[input.index]))) {
    result.push(input.index);
  }
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
  if (!isNaN(parseInt(input.row.split("")[input.index]))) {
    result.push(input.index);
  }
  if (!isNaN(parseInt(input.row.split("")[input.index + 1]))) {
    result.push(input.index + 1);
    result.push(
      ...checkIfNumberOnTheRight({ row: input.row, index: input.index + 1 })
    );
  }
  return result;
}

function removeDuplicatesAndSort(arr: number[]) {
  return [...Array.from(new Set<number>(arr.sort((a, b) => a - b)))];
}

function mapSubArraysOfIndexes(arr: number[]) {
  let subarrays = [];
  let currentSubarray = [arr[0]];

  for (let i = 1; i < arr.length; i++) {
    if (Math.abs(arr[i] - currentSubarray[currentSubarray.length - 1]) === 1) {
      currentSubarray.push(arr[i]);
    } else {
      subarrays.push(currentSubarray);
      currentSubarray = [arr[i]];
    }
  }

  subarrays.push(currentSubarray);
  return subarrays;
}

function mapNumbersFromArray(indexes: number[][], arr: string[]) {
  const result = [];
  indexes.forEach((subarray) => {
    let str = "";
    subarray.forEach((element) => {
      str += arr[element];
    });
    result.push(parseInt(str));
  });
  return result;
}

function main() {
  console.log("start");
  fs.readFile("day3input.txt", "utf8", (err, data) => {
    if (err) throw err;

    const arr = data.split("\n");
    let result = 0;
    for (let i = 0; i < arr.length; i++) {

      const upRow = arr[i - 1];
      const middleRow = arr[i];
      const downRow = arr[i + 1];
      middleRow.split("").forEach((element, i) => {
        if (element === "*") {
          const upRowIndexes = [];
          upRowIndexes.push(
            ...checkIfNumberOnTheLeft({ row: upRow, index: i })
          );
          upRowIndexes.push(
            ...checkIfNumberOnTheRight({ row: upRow, index: i })
          );
          const sortedUpRowIndexes = removeDuplicatesAndSort(upRowIndexes);
          const arrayOfIndexesOfUpRowNumbers =
            mapSubArraysOfIndexes(sortedUpRowIndexes);
          const upRowNumbers = mapNumbersFromArray(
            arrayOfIndexesOfUpRowNumbers,
            upRow.split("")
          );
          const middleRowIndexes = [];
          middleRowIndexes.push(
            ...checkIfNumberOnTheRight({ row: middleRow, index: i })
          );
          middleRowIndexes.push(
            ...checkIfNumberOnTheLeft({ row: middleRow, index: i })
          );
          const sortedMiddleRowIndexes =
            removeDuplicatesAndSort(middleRowIndexes);
          const arrayOfIndexesOfMiddleRowNumbers = mapSubArraysOfIndexes(
            sortedMiddleRowIndexes
          );
          const middleRowNumbers = mapNumbersFromArray(
            arrayOfIndexesOfMiddleRowNumbers,
            middleRow.split("")
          );
          const downRowIndexes = [];
          downRowIndexes.push(
            ...checkIfNumberOnTheRight({ row: downRow, index: i })
          );
          downRowIndexes.push(
            ...checkIfNumberOnTheLeft({ row: downRow, index: i })
          );
          const sortedDownRowIndexes = removeDuplicatesAndSort(downRowIndexes);
          const arrayOfIndexesOfDownRowNumbers =
            mapSubArraysOfIndexes(sortedDownRowIndexes);
          const downRowNumbers = mapNumbersFromArray(
            arrayOfIndexesOfDownRowNumbers,
            downRow.split("")
          );
          const resultArray = [
            ...upRowNumbers,
            ...middleRowNumbers,
            ...downRowNumbers,
          ].filter((element) => !isNaN(element));
          if (resultArray.length > 1) {
            result += resultArray.reduce((a, b) => a * b, 1);
          }
        }
      });
    }
    console.log(result);
  });
}

main();
