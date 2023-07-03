// 간선 정보를 던져줌
const input = require("fs")
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

let [nodeCount, edgeCount, ...edges] = input;
nodeCount = Number(nodeCount);
edgeCount = Number(edgeCount);
edges = edges.map((el) => el.split(" ").map(Number));

const visited = new Array(nodeCount + 1).fill(0);

const network = Array.from({ length: nodeCount + 1 }, () => []);
for (const edge of edges) {
  const [computerA, computerB] = edge;
  network[computerA].push(computerB);
  network[computerB].push(computerA);
}

function dfs(nodeIndex) {
  visited[nodeIndex] = 1;
  for (const i of network[nodeIndex]) {
    if (!visited[i]) dfs(i);
  }
}

dfs(1);
console.log(visited.reduce((acc, cur) => acc + cur, 0) - 1);
// -1 해준 이유는 1번 컴퓨터도 감염되었기 때문
