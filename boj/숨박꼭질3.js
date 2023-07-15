const input = require("fs")
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);

const moves = [(X) => X - 1, (X) => X + 1, (X) => X * 2];

const bfs = (start, end) => {
  if (start === end) return 0;
  const visited = new Array(100001).fill(0);
  const queue = [[start, 0]];
  visited[start] = 1;

  while (queue.length) {
    const [x, count] = queue.shift();
    if (x === end) return count;
    for (const move of moves) {
      const nx = move(x);
      if (0 <= nx && nx <= 100000 && !visited[nx]) {
        visited[nx] = 1;
        if (nx === x * 2) {
          queue.push([nx, count]);
        } else {
          queue.push([nx, count + 1]);
        }
      }
    }
  }
};

console.log(bfs(N, K));
