const input = require("fs")
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const [NM, numbers] = input;
const [N, M] = NM.split(" ").map(Number);
const nums = numbers.split(" ").map(Number);
nums.sort((a, b) => a - b);
const answer = new Set();

const choose = (restNumbers, M, array) => {
  if (M === 0) return answer.add(array.join(" "));
  for (let i = 0; i < restNumbers.length; i++) {
    choose([...restNumbers.slice(0, i), ...restNumbers.slice(i + 1)], M - 1, [
      ...array,
      restNumbers[i],
    ]);
  }
};

choose(nums, M, []);

console.log([...answer].join("\n"));
