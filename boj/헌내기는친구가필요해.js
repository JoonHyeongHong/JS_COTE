const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const Wall = "X";
const Me = "I";
const Person = "P";

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

const [N, M] = input.shift().split(" ").map(Number);
const map = Array.from({ length: N }, () => []);
for (let i = 0; i < N; i++) {
  map[i].push(...input[i].split(""));
}

const startPoint = [0, 0];
map.forEach((row, x) =>
  row.forEach((el, y) => {
    if (el === Me) {
      startPoint[0] = x;
      startPoint[1] = y;
    }
  })
);

const isInMap = (x, y) => {
  return 0 <= x && x < N && 0 <= y && y < M;
};

const bfs = () => {
  let howManyMeetPerson = 0;
  const visited = map.map((row) => row.map(() => false));
  const queue = [[...startPoint]];
  while (queue.length) {
    const [x, y] = queue.shift();
    visited[x][y] = true;
    if (map[x][y] === Person) howManyMeetPerson++;

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      if (isInMap(nx, ny) && !visited[nx][ny] && map[nx][ny] !== Wall) {
        visited[nx][ny] = true;
        queue.push([nx, ny]);
      }
    }
  }

  return howManyMeetPerson ? howManyMeetPerson : "TT";
};

console.log(bfs());
