//임의의 두 사람이 최소 몇 단계 만에 이어질 수 있는 지 ?

const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const graph = Array.from({ length: N }, () => []);

for (let i = 1; i <= M; i++) {
  const [start, end] = input[i]
    .split(" ")
    .map(Number)
    .map((el) => el - 1);
  graph[start].push(end);
  graph[end].push(start);
}

const bfs = () => {
  const answer = [];

  for (let i = 0; i < N; i++) {
    const visited = new Array(N).fill(0);
    const queue = [...graph[i].map((el) => [el, 1])];
    visited[i] = 1;
    while (queue.length) {
      const [currentIndex, diff] = queue.shift();
      if (!visited[currentIndex]) {
        queue.push(...graph[currentIndex].map((el) => [el, diff + 1]));
        visited[currentIndex] = diff;
      }
    }
    answer.push(visited.reduce((acc, cur) => (acc += cur), 0) - 1);
  }

  // 최소값
  return answer.indexOf(Math.min(...answer)) + 1;
};

console.log(bfs());
