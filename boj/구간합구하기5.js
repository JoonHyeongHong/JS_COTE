const input = require("fs")
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const array = input.slice(1, N + 1).map((row) => row.split(" ").map(Number));
const commands = input.slice(N + 1).map((row) => row.split(" ").map(Number));

const dp = Array.from({ length: N + 1 }, () => new Array(N + 1).fill(0));

for (let x = 1; x < N + 1; x++) {
  for (let y = 1; y < N + 1; y++) {
    dp[x][y] =
      array[x - 1][y - 1] + dp[x][y - 1] + dp[x - 1][y] - dp[x - 1][y - 1];
  }
}

let answer = "";

commands.forEach((command) => {
  const [x1, y1, x2, y2] = command;
  answer +=
    dp[x2][y2] - (dp[x1 - 1][y2] + dp[x2][y1 - 1]) + dp[x1 - 1][y1 - 1] + "\n";
});

console.log(answer);
