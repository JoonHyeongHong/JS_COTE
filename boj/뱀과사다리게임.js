// 주사위 조작 시 최소 몇번 만에 도착할 수 있는 가 ?

// 1 부터 6
// 10 x 10

const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const map = new Array(101).fill(null).map((_, idx) => idx);

for (let i = 1; i <= N + M; i++) {
  const [start, end] = input[i].split(" ").map(Number);
  map[start] = end;
}

//최소 횟수를 구하기 때문에 bfs로 풀었다
const bfs = () => {
  const visited = new Array(101).fill(0);
  const queue = [1];
  visited[1] = 0;
  while (queue.length) {
    const cur = queue.shift();

    // 주사위는 1 ~ 6을 던짐
    for (let dice = 1; dice <= 6; dice++) {
      let next = cur + dice;
      if (next > 100) break;

      next = map[next];

      if (!visited[next]) {
        visited[next] = visited[cur] + 1;
        queue.push(next);
      }
    }
  }
  console.log(visited);
  console.log(visited[100]);
};

bfs();
