const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const [N, ...pictureForNormal] = input;

const pictureForWeakness = pictureForNormal.map((row) =>
  row.replaceAll("R", "G")
);

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

const isInPicture = (x, y) => {
  return 0 <= x && x < N && 0 <= y && y < N;
};

const isEqualColor = (picture, node1, node2) => {
  const [x1, y1] = node1;
  const [x2, y2] = node2;
  return picture[x1][y1] === picture[x2][y2];
};

const visitedForNormal = pictureForNormal.map((row) =>
  row.split("").map(() => false)
);
const visitedForWeakness = pictureForNormal.map((row) =>
  row.split("").map(() => false)
);

const bfs = (node, picture, visited) => {
  const queue = [node];
  while (queue.length) {
    const [x, y] = queue.shift() ?? [0, 0];
    visited[x][y] = true;
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      if (
        isInPicture(nx, ny) &&
        !visited[nx][ny] &&
        isEqualColor(picture, node, [nx, ny])
      ) {
        visited[nx][ny] = true;
        queue.push([nx, ny]);
      }
    }
  }
};

let normal = 0;
let weakness = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!visitedForNormal[i][j]) {
      bfs([i, j], pictureForNormal, visitedForNormal);
      normal++;
    }

    if (!visitedForWeakness[i][j]) {
      console.log(visitedForWeakness);
      bfs([i, j], pictureForWeakness, visitedForWeakness);
      weakness++;
    }
  }
}

console.log(normal, weakness);
