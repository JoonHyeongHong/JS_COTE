(() => {
  const input = require("fs")
    .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
    .toString()
    .trim()
    .split("\n");

  //값 입력
  const [NM, Truth, ...parties] = input;
  const [N, M] = NM.split(" ").map(Number);
  const [_, ...peopleKnowingTruth] = Truth.split(" ").map(Number);

  if (M === 0) return console.log(0);
  if (peopleKnowingTruth === 0) return console.log(M);

  const visitingLists = parties.map((party) => {
    const [_, ...visitingNumbers] = party.split(" ").map(Number);
    return visitingNumbers;
  });

  // count 변수
  let ableToLie = 0;

  //방문 배열
  const visited = new Array(N + 1).fill(false);
  peopleKnowingTruth.forEach((number) => {
    visited[number] = true;
  });

  //그래프용 간선 배열
  const edges = [];
  visitingLists.forEach((visitors) => {
    edges.push(visitors);
  });

  // 그래프
  const graph = Array.from({ length: N + 1 }, () => []);
  edges.forEach((edge) => {
    edge.forEach((number, idx) => {
      graph[number].push(...edge.slice(0, idx), ...edge.slice(idx + 1));
    });
  });

  const dfs = (node) => {
    if (visited[node]) return;
    visited[node] = true;
    const stack = [...graph[node]];
    while (stack.length) {
      const next = stack.pop();
      if (!visited[next]) dfs(next);
    }
  };

  visitingLists;

  visitingLists.forEach((visitors) => {
    const stack = [];

    //한 명이라도 진실을 알고 있다면, 해당 파티에 방문인원들은
    if (visitors.some((number) => visited[number])) {
      stack.push(...visitors);
    }
    while (stack.length) {
      const node = stack.pop();
      dfs(node);
    }
  });

  visitingLists.forEach((visitors) => {
    if (!visitors.some((number) => visited[number])) {
      ableToLie++;
    }
  });

  return console.log(Math.min(ableToLie, M));
})();
