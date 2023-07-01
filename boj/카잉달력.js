const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n")
  .reverse();

const T = input.pop();
const getGcd = (a, b) => (a % b === 0 ? b : getGcd(b, a % b));
const getLcm = (a, b) => (a * b) / getGcd(a, b);

const solution = () => {
  const [M, N, x, y] = input.pop().split(" ").map(Number);
  let x1 = x;
  let y1 = y;
  const lcm = getLcm(M, N);
  while (x1 <= lcm && y1 <= lcm) {
    if (x1 > y1) y1 += N;
    else if (x1 < y1) x1 += M;
    else if (x1 === y1) return x1;
  }
  return -1;
};

for (let i = 0; i < T; i++) {
  console.log(solution());
}
