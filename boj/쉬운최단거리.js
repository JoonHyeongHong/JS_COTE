const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input.shift().split(" ").map(Number);
const map = Array.from({ length: n }, () => []);
for (let i = 0; i < n; i++) {
  map[i].push(...input[i].split(" ").map(Number));
}

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];
const target = 2;

const getTargetIndex = () => {
  const targetIndex = [0, 0];
  map.forEach((row, x) => {
    row.forEach((el, y) => {
      if (el === target) {
        targetIndex[0] = x;
        targetIndex[1] = y;
      }
    });
  });

  return targetIndex;
};

const isInMap = (x, y) => {
  return 0 <= x && x < n && 0 <= y && y < m;
};

const solution = () => {
  const newMap = [
    ...map.map((row, x) => row.map((_, y) => (map[x][y] ? -1 : 0))),
  ];
  const visited = Array.from({ length: n }, () => new Array(m).fill(false));
  const targetIndex = getTargetIndex();
  const queue = [[...targetIndex, 0]];

  while (queue.length) {
    const [x, y, diff] = queue.shift();
    newMap[x][y] = diff;
    visited[x][y] = true;
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (isInMap(nx, ny) && !visited[nx][ny] && newMap[nx][ny]) {
        visited[nx][ny] = true;
        queue.push([nx, ny, diff + 1]);
      }
    }
  }
  return newMap;
};

const answer = solution();
answer.forEach((row) => console.log(row.join(" ")));
