import * as fs from "fs";

function main() {
  console.log("start");
  fs.readFile("day4input.txt", "utf8", (err, data) => {
    if (err) throw err;

    const arr = data.split("\n");
    // let result = 0;
    const finalCopies = [];
    let originals = 0
    let cps = 0
    // const copiesMap = new Map<number, number[]>();
    for (let i = 0; i < arr.length; i++) {
      const copies = [];
      copies.push(i + 1);
        originals++;
      const points = arr[i].split(":")[1].trim();
      //   copiesMap.set(i + 1, []);
      const [winnings, players] = points.split("|");
      const winningArr = winnings.split(" ").filter((x) => x !== " ");
      const playerArr = players.split(" ").filter((x) => x !== " ");
      // console.log(winningArr, playerArr);
      let matches = 1;
      winningArr.forEach((winning) => {
        playerArr.forEach((player) => {
          if (parseInt(winning) === parseInt(player)) {
            // console.log(winning, player);
            matches++;

            copies.push(i + matches);
            //   console.log(copies);
            // copiesMap.get(i + 1)?.push(i + matches);
          }
        });
      });
      //   console.log(copies);
      copies?.forEach((copy) => {
        cps++;
        if (copy >= arr.length) return;
        const points = arr[copy - 1]?.split(":")[1].trim();
        // copiesMap.set(i + 1, []);
        const [winnings, players] = points.split("|");
        const winningArr = winnings.split(" ").filter((x) => x !== " ");
        const playerArr = players.split(" ").filter((x) => x !== " ");
        // console.log(winningArr, playerArr);
        let matches = 1;
        winningArr.forEach((winning) => {
          playerArr.forEach((player) => {
            if (parseInt(winning) === parseInt(player)) {
              // console.log(winning, player);
              matches++;

              copies.push(copy + matches);
              //   console.log(copies);
              //   copiesMap.get(i + 1)?.push(i + matches);
            }
          });
        });
      });
      finalCopies.push(...copies);
    }
    console.log(originals+cps);
    // finalCopies.sort((a, b) => a - b).forEach((x) => {
    //     console.log(arr[x-1])
    // });

    console.log(finalCopies.sort((a, b) => a - b).length);
    // console.log(Array.from(new Set(copies)).length);
    // console.log(result);
  });
}

main();
