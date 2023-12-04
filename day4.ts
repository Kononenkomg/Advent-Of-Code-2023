import * as fs from "fs";

function main() {
    console.log("start");
    fs.readFile("day4input.txt", "utf8", (err, data) => {
      if (err) throw err;
  
      const arr = data.split("\n");
      let result = 0;
      for (let i = 0; i < arr.length; i++) {
  
        console.log(arr[i]);
      }
      console.log(result);
    });
  }
  
  main();