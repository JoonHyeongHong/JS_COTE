const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input.shift());
const originalPaper = Array.from({ length: n }, () => []);
for (let i = 0; i < n; i++) {
  originalPaper[i].push(...input.shift().split(" ").map(Number));
}

const solution = () => {
  let bluePaper = 0;
  let whitePaper = 0;

  /**같은 색으로 칠해져있지 않다면 가로와 세로 중간부분 자르는 내부함수*/
  const divideArray = (array) => {
    const newArray = Array.from({ length: 4 }, () => []);
    const middle = array.length / 2;
    for (let i = 0; i < middle; i++) {
      newArray[0].push(array[i].filter((_, idx) => idx < middle));
      newArray[1].push(array[i].filter((_, idx) => idx >= middle));
      newArray[2].push(array[middle + i].filter((_, idx) => idx < middle));
      newArray[3].push(array[middle + i].filter((_, idx) => idx >= middle));
    }
    return newArray;
  };

  /**같은 색으로만 이루어져있는 지 확인하는 내부함수*/
  const isRectangle = (paper) => {
    return (
      paper.every((row) => row.every((el) => el === 1)) ||
      paper.every((row) => row.every((el) => el === 0))
    );
  };

  /**종이를 제일 작은 단위까지 나누는 재귀함수*/
  const division = (paper) => {
    if (!isRectangle(paper)) {
      const dividedPapers = divideArray(paper);
      dividedPapers.forEach((dividedPaper) => division(dividedPaper));
    } else {
      paper[0][0] ? bluePaper++ : whitePaper++;
    }
  };

  division(originalPaper);
  return [whitePaper, bluePaper];
};

const answer = solution();
console.log(answer[0]);
console.log(answer[1]);
