const fs = require("fs");

const colors = new Map();
colors.set("red", 12);
colors.set("green", 13);
colors.set("blue", 14);

function main() {
  console.log("start");
  fs.readFile("day2input.txt", "utf8", (err, data) => {
    if (err) throw err;

    const arr = data.split("\n");
    let result = 0;
    arr.forEach((row) => {
      const games = row.split(":")[1].split(";");
      let maxRed = 1;
      let maxGreen = 1;
      let maxBlue = 1;

      games.forEach((game) => {
        const draws = game.split(",");
        draws.forEach((draw) => {
          const trimmed = draw.trim();
          const number = parseInt(trimmed.split(" ")[0]);
          const color = trimmed.split(" ")[1];
          if (color === "red") {
            if (number > maxRed) {
              maxRed = number;
            }
          }
          if (color === "green") {
            if (number > maxGreen) {
              maxGreen = number;
            }
          }
          if (color === "blue") {
            if (number > maxBlue) {
              maxBlue = number;
            }
          }
        });
      });

      result += maxRed * maxGreen * maxBlue;
    });
    console.log(result);
  });
}

main();
