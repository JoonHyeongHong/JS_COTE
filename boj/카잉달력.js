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
  const [M, N, X, Y] = input.pop().split(" ").map(Number);
  let x = X;
  let y = Y;

  const lcm = getLcm(M, N);
  while (x <= lcm && y <= lcm) {
    if (x > y) y += N;
    else if (x < y) x += M;
    else if (x === y) return x;
  }
  return -1;
};

for (let i = 0; i < T; i++) {
  console.log(solution());
}
