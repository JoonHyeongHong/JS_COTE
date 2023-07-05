const input = require("fs")
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const [NM, numbers] = input;
const [N, M] = NM.split(" ").map(Number);
const answer = new Set();
const choose = (nums, M, array) => {
  if (M === 0) return answer.add(array.join(" "));

  for (let i = 0; i < nums.length; i++) {
    choose([...nums.slice(0, i), ...nums.slice(i + 1)], M - 1, [
      ...array,
      nums[i],
    ]);
  }
};

const nums = numbers.split(" ").map(Number);
nums.sort((a, b) => a - b);
choose(nums, M, []);
console.log([...answer].join("\n"));
