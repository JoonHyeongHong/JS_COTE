const input = require("fs")
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const [NM, ...edges] = input;
const [N, M] = NM.split(" ").map(Number);

const graph = Array.from({ length: N + 1 }, () => []);
edges.forEach((edge) => {
  const [start, end] = edge.split(" ").map(Number);
  graph[start].push(end);
  graph[end].push(start);
});

const visited = new Array(N + 1).fill(0);

const dfs = (node) => {
  visited[node] = 1;
  for (const index of graph[node]) {
    if (!visited[index]) {
      dfs(index);
    }
  }
};

let count = 0;

for (let i = 1; i <= N; i++) {
  if (!visited[i]) {
    dfs(i);
    count++;
  }
}

visited;
count;
console.log(count);
