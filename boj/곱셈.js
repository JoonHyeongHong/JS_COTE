const input = require("fs")
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim();

const [A, B, C] = input.split(" ").map(BigInt);

const pow = (a, b) => {
  if (b == 0) return BigInt(1);
  const temp = pow(b, BigInt(parseInt(b / BigInt(2))));
  if (b % BigInt(2) == 0) {
    return (temp * temp) % C;
  } else {
    return (temp * temp * a) % C;
  }
};

console.log(parseInt(pow(A, B)));
