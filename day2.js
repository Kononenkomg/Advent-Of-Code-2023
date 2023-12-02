const fs = require("fs");

const REDS = 12;
const GREENS = 13;
const BLUE = 14;
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
      const id = row.split(":")[0].split(" ")[1];
      console.log(id);
      const games = row.split(":")[1].split(";");

      let gameIsPossible = true;
      games.forEach((game) => {
        const draws = game.split(",");
        draws.forEach((draw) => {
          const trimmed = draw.trim();

          console.log("draw", trimmed);

          const number = trimmed.split(" ")[0];
          const color = trimmed.split(" ")[1];
          console.log("number", number);
          console.log("color", color);
          console.log("max number", colors.get(color));
          if (number > colors.get(color)) {
            gameIsPossible = false;
          }
        });
      });
      if (gameIsPossible) {
        result += parseInt(id);
      }
    });
    console.log(result);
  });
}

main();
