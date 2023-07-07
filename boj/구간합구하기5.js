const input = require("fs")
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const array = input.slice(1, N + 1).map((row) => row.split(" ").map(Number));
const commands = input.slice(N + 1).map((row) => row.split(" ").map(Number));

const newArray = [];
let sum = 0;
for (let x = 0; x < array.length; x++) {
  newArray.push([]);
  for (let y = 0; y < array[0].length; y++) {
    sum += array[x][y];
    newArray[x][y] = sum;
  }
}

commands.forEach((command) => {
  const [x1, y1, x2, y2] = command.map((el) => el - 1);
  // x2,y2까지의 합
  console.log(newArray[x2][y2] - newArray[x1][y1]);
});
