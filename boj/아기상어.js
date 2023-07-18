const input = require("fs")
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const [N, ...M] = input;
const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];
const map = M.map((row) => row.split(" ").map(Number));
const isInMap = (x, y) => 0 <= x && x < N && 0 <= y && y < N;
const isAbleToEat = (x, y, level) => 0 < map[x][y] && map[x][y] < level;

const getFeed = (startX, startY, endX, endY, level) => {
  const visited = map.map((row) => row.map(() => 0));
  const queue = [[startX, startY, 0]];
  while (queue.length) {
    const [x, y, count] = queue.shift();
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      if (isInMap(nx, ny) && map[nx][ny] <= level && !visited[nx][ny]) {
        visited[nx][ny] = 1;
        if (nx === endX && ny === endY) {
          return count + 1;
        }
        queue.push([nx, ny, count + 1]);
      }
    }
  }
  return 0;
};

const findFeed = (x, y, level) => {
  const feed = [];
  for (let nx = 0; nx < N; nx++) {
    for (let ny = 0; ny < N; ny++) {
      if (isAbleToEat(nx, ny, level)) {
        const distance = getFeed(x, y, nx, ny, level);
        if (distance) feed.push([nx, ny, distance]);
      }
    }
  }
  feed.sort((a, b) => a[2] - b[2]);
  return feed[0] ?? undefined;
};

const bfs = (X, Y) => {
  let time = 0;
  let level = 2;

  let feedCount = 0;

  const feed = findFeed(X, Y, level);
  if (!feed) return time;

  const nextFeed = [[...feed]];
  while (nextFeed.length) {
    const [endX, endY, distance] = nextFeed.shift();
    feedCount++;
    map[endX][endY] = 0;
    time += distance;
    if (feedCount === level) {
      feedCount = 0;
      level++;
    }
    const next = findFeed(endX, endY, level);
    if (!next) return time;
    nextFeed.push(next);
  }
  return time;
};

let answer = 0;
for (let x = 0; x < N; x++) {
  for (let y = 0; y < N; y++) {
    if (map[x][y] === 9) {
      map[x][y] = 0;
      answer = bfs(x, y);
    }
  }
}

console.log(answer);
