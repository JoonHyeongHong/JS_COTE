const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const [m, n, h] = input.shift().split(" ").map(Number);

//3차원 배열 container
const container = Array.from({ length: h }, () =>
  Array.from({ length: n }, () => [])
);

for (let i = 0; i < h; i++) {
  for (let j = 0; j < n; j++) {
    container[i][j].push(...input.shift().split(" ").map(Number));
  }
}

//3차원 좌표 이동용 배열
const dx = [1, -1, 0, 0, 0, 0];
const dy = [0, 0, 1, -1, 0, 0];
const dz = [0, 0, 0, 0, 1, -1];

// 좌표가 container를 벗어나는지 여부 확인
const isInContainer = (x, y, z) => {
  return 0 <= x && x < h && 0 <= y && y < n && 0 <= z && z < m;
};

//창고 내부의 토마토가 전부 익었는지 (즉 0이 없어졌는지)
const isAllRepen = (container) => {
  return container.every((arr) =>
    arr.every((row) => row.every((el) => el !== 0))
  )
    ? Math.max(...container.flat().flat())
    : -1;
};

const solution = (container) => {
  if (container.every((arr) => arr.every((row) => row.every((el) => el !== 0))))
    return 0;

  //
  const newContainer = container.map((arr) => arr.map((row) => [...row]));
  const visited = container.map((arr) =>
    arr.map((row) => row.map(() => false))
  );

  const queue = [];

  for (let x = 0; x < h; x++) {
    for (let y = 0; y < n; y++) {
      for (let z = 0; z < m; z++) {
        if (newContainer[x][y][z] === 1) {
          visited[x][y][z] = true;
          queue.push([x, y, z, 0]);
        }
      }
    }
  }

  let index = 0;
  while (queue.length !== index) {
    let [x1, y1, z1, diff] = queue[index++];
    for (let i = 0; i < 6; i++) {
      const nx = x1 + dx[i];
      const ny = y1 + dy[i];
      const nz = z1 + dz[i];
      if (
        isInContainer(nx, ny, nz) &&
        !visited[nx][ny][nz] &&
        container[nx][ny][nz] === 0
      ) {
        visited[nx][ny][nz] = true;
        newContainer[nx][ny][nz] = diff + 1;
        queue.push([nx, ny, nz, diff + 1]);
      }
    }
  }

  return isAllRepen(newContainer);
};

const answer = solution(container);
console.log(answer);
