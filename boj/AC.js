//R 뒤집기
//D 버리기

const fncObj = {
  R: (count) => {
    count.reverse();
  },
  D: (count) => {
    count[0] += 1;
  },
};

const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n")
  .reverse();

const T = Number(input.pop());
for (let i = 0; i < T; i++) {
  const commands = input.pop().split("");

  const rCounts = commands.reduce(
    (acc, cur) => (cur === "R" ? acc + 1 : acc),
    0
  );
  const dCounts = commands.reduce(
    (acc, cur) => (cur === "D" ? acc + 1 : acc),
    0
  );

  const n = Number(input.pop());

  const integers = input.pop().split("");

  if (dCounts > n) {
    console.log("error");
    continue;
  }

  const array = n
    ? integers
        .slice(1, integers.length - 1)
        .join("")
        .split(",")
        .map(Number)
    : [];

  let isError = false;
  let count = [0, 0];

  for (const command of commands) {
    fncObj[command](count);
  }

  if (isError) {
    console.log("error");
    continue;
  }

  if (rCounts % 2 === 1) {
    array.reverse();
  }

  console.log(`[${array.slice(count[0], array.length - count[1]).join(",")}]`);
}
