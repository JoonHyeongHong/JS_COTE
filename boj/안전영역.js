const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const [N, ...rest] = input;
const map = rest.map((row) => row.split(" ").map(Number));

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

const isInMap = (x, y) => {
  return 0 <= x && x < N && 0 <= y && y < N;
};

const bfs = (startX, startY, visited, depth) => {
  const queue = [[startX, startY]];
  visited[startX][startY] = 1;
  while (queue.length) {
    const [x, y] = queue.shift();
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      if (isInMap(nx, ny) && !visited[nx][ny] && map[nx][ny] >= depth) {
        visited[nx][ny] = 1;
        queue.push([nx, ny]);
      }
    }
  }
};

let maxCount = -1;
let max = Math.max(...map.flat());

for (let depth = 1; depth <= max; depth++) {
  const visited = map.map((row) => row.map(() => 0));
  let count = 0;
  for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
      if (!visited[x][y] && map[x][y] >= depth) {
        bfs(x, y, visited, depth);
        count++;
      }
    }
  }

  maxCount = Math.max(maxCount, count);
}

console.log(maxCount);
