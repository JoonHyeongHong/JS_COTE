(() => {
  const input = require("fs")
    .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
    .toString()
    .trim()
    .split("\n");
  const [NM, Truth, ...parties] = input;
  const [N, M] = NM.split(" ").map(Number);
  if (M === 0) return console.log(0);

  const [_, ...KnowingTruthNumber] = Truth.split(" ").map(Number);

  if (KnowingTruthNumber === 0) return console.log(M);

  let ableToLie = 0;

  const visited = new Array(N + 1).fill(false);
  KnowingTruthNumber.forEach((number) => {
    visited[number] = true;
  });

  const edges = [];
  parties.forEach((party) => {
    const [visitedCount, ...visitingNumbers] = party.split(" ").map(Number);
    if (visitedCount > 1) edges.push(visitingNumbers);
  });

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

  parties.forEach((party) => {
    const [_, ...visitingNumbers] = party.split(" ").map(Number);
    const stack = [];
    if (visitingNumbers.some((number) => visited[number])) {
      stack.push(...visitingNumbers);
    }
    while (stack.length) {
      const node = stack.pop();
      dfs(node);
    }
  });

  parties.forEach((party) => {
    const [_, ...visitingNumbers] = party.split(" ").map(Number);
    if (!visitingNumbers.some((number) => visited[number])) {
      ableToLie++;
    }
  });

  console.log(Math.min(ableToLie, M));
})();
