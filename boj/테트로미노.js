const input = require("fs")
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const [NM, ...rest] = input;
const [N, M] = NM.split(" ").map(Number);
const map = rest.map((row) => row.split(" ").map(Number));

const isInMap = (x, y) => {
  return 0 <= x && x < N && 0 <= y && y < M;
};

const dx = [1, -1, 0, 0, 1, 1, -1, -1];
const dy = [0, 0, 1, -1, 1, -1, -1];
const maxValue = Math.max(...map.flat());
let maxSum = Number.MIN_SAFE_INTEGER;
const visited = map.map((row) => row.map(() => false));

const dfs = (x, y, count, sum) => {
  if (sum + (4 - count) * maxValue <= maxSum) {
    return;
  }

  if (count === 4) {
    return (maxSum = Math.max(maxSum, sum));
  }

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (isInMap(nx, ny) && !visited[nx][ny]) {
      if (count === 2) {
        visited[nx][ny] = true;
        dfs(x, y, count + 1, sum + map[nx][ny]);
        visited[nx][ny] = false;
      }

      visited[nx][ny] = true;
      dfs(nx, ny, count + 1, sum + map[nx][ny]);
      visited[nx][ny] = false;
    }
  }
};
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    visited[i][j] = true;
    dfs(i, j, 1, map[i][j]);
    visited[i][j] = false;
  }
}

console.log(maxSum);
