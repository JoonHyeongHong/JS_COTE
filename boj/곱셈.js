const input = require("fs")
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim();

const [A, B, C] = input.split(" ").map(BigInt);

const solution = (power) => {
  if (power === 1n) {
    return A % C;
  }

  const half = solution(power / 2n) % C;

  if (power % 2n) {
    return (half * half * (A % C)) % C;
  }

  return (half * half) % C;
};

console.log(solution(B).toString());
