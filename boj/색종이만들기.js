const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input.shift());
const paper = Array.from({ length: n }, () => []);
for (let i = 0; i < n; i++) {
  paper[i].push(...input.shift().split(" ").map(Number));
}

// 같은 색으로 칠해져있지 않다면 가로와 세로 중간부분 자른다

const solution = () => {
  let bluePaper = 0;
  let whitePaper = 0;

  const getDivision = (array) => {
    const newArray = Array.from({ length: 4 }, () => []);
    const length = array.length;
    for (let i = 0; i < length / 2; i++) {
      newArray[0].push(array[i].filter((_, idx) => idx < length / 2));
      newArray[1].push(array[i].filter((_, idx) => idx >= length / 2));
      newArray[2].push(
        array[length / 2 + i].filter((_, idx) => idx < length / 2)
      );
      newArray[3].push(
        array[length / 2 + i].filter((_, idx) => idx >= length / 2)
      );
    }
    return newArray;
  };

  const division = (paper) => {
    if (
      paper.every((row) => row.every((el) => el === 1)) ||
      paper.every((row) => row.every((el) => el === 0))
    ) {
      paper[0][0] ? bluePaper++ : whitePaper++;
    } else {
      const dividedPapers = getDivision(paper);
      dividedPapers.forEach((dividedPaper) => division(dividedPaper));
    }
  };

  division(paper);
  return [whitePaper, bluePaper];
};

const answer = solution();
console.log(answer[0]);
console.log(answer[1]);
