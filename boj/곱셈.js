const input = require("fs")
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim();

const [A, B, C] = input.split(" ").map(BigInt);

const solution = (power) => {
  if (power === 1n) return A % C;
  const temp = solution(B, BigInt(parseInt(B / BigInt(2))));
  if (B % BigInt(2) == 0) {
    return (temp * temp) % C;
  } else {
    return (temp * temp * A) % C;
  }
};

console.log(parseInt(solution(A, B)));
