const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");
let index = 0;

const X = "X";
const O = "O";

const checkValid = (game) => {
  let oWin = 0;
  let xWin = 0;
  let countX = game.filter((el) => el === X).length;
  let countO = game.filter((el) => el === O).length;
  // 가로 체크
  for (let i = 0; i < 9; i += 3) {
    xWin +=
      game[i] === X && game[i] === game[i + 1] && game[i] === game[i + 2]
        ? 1
        : 0;
    oWin +=
      game[i] === O && game[i] === game[i + 1] && game[i] === game[i + 2]
        ? 1
        : 0;
  }

  for (let i = 0; i < 3; i++) {
    xWin +=
      game[i] === X && game[i] === game[i + 3] && game[i] === game[i + 6]
        ? 1
        : 0;
    oWin +=
      game[i] === O && game[i] === game[i + 3] && game[i] === game[i + 6]
        ? 1
        : 0;
  }

  xWin += game[0] === X && game[0] === game[4] && game[0] === game[8] ? 1 : 0;
  oWin += game[0] === O && game[0] === game[4] && game[0] === game[8] ? 1 : 0;

  xWin += game[2] === X && game[2] === game[4] && game[2] === game[6] ? 1 : 0;
  oWin += game[2] === O && game[2] === game[4] && game[2] === game[6] ? 1 : 0;

  if (xWin && oWin) return "invalid";
  if (countO > countX) return "invalid";
  if (xWin && countX - 1 !== countO) return "invalid";
  if (oWin && countX > countO) return "invalid";
  if (xWin > 1 && countX !== 5) return "invalid";
  if (oWin > 1) return "invalid";
  if (!xWin && !oWin && countX + countO !== 9) return "invalid";
  return "valid";
};

while (input[index] !== "end") {
  const game = input.shift().split("");
  console.log(checkValid(game));
}
