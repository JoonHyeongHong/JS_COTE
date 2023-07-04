const input = require("fs")
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const [N, ...edges] = input;
const graph = Array.from({ length: Number(N) + 1 }, () => []);
edges.forEach((edge) => {
  const [start, end] = edge.split(" ").map(Number);
  graph[end].push(start);
  graph[start].push(end);
});

const answer = [];
const visited = new Array(Number(N) + 1).fill(0);
const dfs = (node, parent) => {
  visited[node] = 1;
  answer[node] = parent;
  for (const next of graph[node]) {
    if (!visited[next]) {
      dfs(next, node);
    }
  }
};

dfs(1, 0);
console.log(answer.slice(2).join("\n"));
