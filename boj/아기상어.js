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
  let feed = [];
  for (let nx = 0; nx < N; nx++) {
    for (let ny = 0; ny < N; ny++) {
      if (isAbleToEat(nx, ny, level)) {
        const distance = getFeed(x, y, nx, ny, level);
        if (distance) feed.push([nx, ny, distance]);
      }
    }
  }
  feed.sort((a, b) => a[2] - b[2]);
  return feed.length ? [feed[0][0], feed[0][1]] : undefined;
};

const bfs = (X, Y) => {
  let time = 0;
  let feedCount = 0;
  const feed = findFeed(X, Y, 2);
  if (!feed) return 0;
  const nextFeed = [[X, Y, ...feed, 2]];
  while (nextFeed.length) {
    const [startX, startY, endX, endY, curLevel] = nextFeed.shift();
    const queue = [[startX, startY, curLevel, 0]];
    const visited = map.map((row) => row.map(() => 0));
    while (queue.length) {
      const [x, y, level, count] = queue.shift();
      visited[x][y] = 1;
      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        if (isInMap(nx, ny) && map[nx][ny] <= level && !visited[nx][ny]) {
          visited[nx][ny] = 1;
          if (nx === endX && ny === endY) {
            map[nx][ny] = 0;
            let newLevel = level;
            feedCount++;
            if (feedCount === newLevel) {
              feedCount = 0;
              newLevel++;
            }
            time += count + 1;
            const feed = findFeed(nx, ny, newLevel);
            if (!feed) return time;
            nextFeed.push([nx, ny, ...feed, newLevel]);
            break;
          } else {
            queue.push([nx, ny, level, count + 1]);
          }
        }
      }
    }
  }
  return time;
};

let answer = 0;
for (let x = 0; x < N; x++) {
  for (let y = 0; y < N; y++) {
    if (map[x][y] === 9) {
      map[x][y] = 0;
      answer += bfs(x, y);
    }
  }
}

console.log(answer);
