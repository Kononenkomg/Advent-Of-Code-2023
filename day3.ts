// TO RUN ts-node --esm day3.ts

import * as fs from "fs";

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

function getGearNumbersFromRow(row: string, i: number) {
  const rowIndexes = [];
  rowIndexes.push(...checkIfNumberOnTheLeft({ row, index: i }));
  rowIndexes.push(...checkIfNumberOnTheRight({ row, index: i }));
  const sortedUpRowIndexes = removeDuplicatesAndSort(rowIndexes);
  const arrayOfIndexesOfUpRowNumbers =
    mapSubArraysOfIndexes(sortedUpRowIndexes);
  return mapNumbersFromArray(
    arrayOfIndexesOfUpRowNumbers,
    row.split("")
  );

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
          const upRowNumbers = getGearNumbersFromRow(upRow, i)
          const middleRowNumbers = getGearNumbersFromRow(middleRow, i)
          const downRowNumbers = getGearNumbersFromRow(downRow, i)
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
