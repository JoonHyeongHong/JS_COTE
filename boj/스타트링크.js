const input = require("fs")
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const [F, S, G, U, D] = input[0].split(" ").map(Number);
const moves = [(X) => X + U, (X) => X - D];
const bfs = () => {
  if (S === G) return 0;
  const visited = new Array(F + 1).fill(0);
  const queue = [[S, 0]];
  visited[S] = 1;
  while (queue.length) {
    const [current, count] = queue.pop();
    if (current === G) return count;
    for (const move of moves) {
      const next = move(current);
      if (1 <= next && next <= F && !visited[next]) {
        visited[next] = 1;
        queue.push([next, count + 1]);
      }
    }
  }
  return "use the stairs";
};

console.log(bfs());
