(() => {
  const input = require("fs")
    .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
    .toString()
    .trim()
    .split("\n");
  const N = Number(input.shift());
  const map = input.map((row) => row.split(" ").map(Number));

  const dp = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => [0, 0, 0])
  );

  for (let i = 1; i < N; i++) {
    if (map[0][i] === 1) break;
    dp[0][i][0] = 1;
  }

  for (let i = 1; i < N; i++) {
    for (let j = 1; j < N; j++) {
      if (map[i][j] === 1) continue;
      dp[i][j][0] = dp[i][j - 1][0] + dp[i][j - 1][2];
      dp[i][j][1] = dp[i - 1][j][1] + dp[i - 1][j][2];
      if (map[i - 1][j] === 0 && map[i][j - 1] === 0) {
        dp[i][j][2] =
          dp[i - 1][j - 1][0] + dp[i - 1][j - 1][1] + dp[i - 1][j - 1][2];
      }
    }
  }

  const result = dp[N - 1][N - 1].reduce((acc, cur) => acc + cur, 0);
  console.log(result);
})();
