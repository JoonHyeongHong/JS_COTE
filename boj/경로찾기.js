const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const graph = input.slice(1).map((el) => el.split(" ").map(Number));

const output = [...new Array(N)].map(() => new Array(N).fill(0));

const dfs = (node, start, visited) => {
  for (let i = 0; i < N; i++) {
    if (graph[node][i] && !visited[i]) {
      visited[i] = true;
      output[start][i] = 1;
      dfs(i, start, visited);
    }
  }
};

for (let i = 0; i < N; i++) {
  const visited = new Array(N).fill(false);
  dfs(i, i, visited);
}

console.log(output.map((row) => row.join(" ")).join("\n"));
