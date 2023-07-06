const input = require("fs")
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const [n, ...rest] = input;
const N = Number(n);
const costs = rest.map((row) => row.split(" ").map(Number));
const R = 0;
const G = 1;
const B = 2;
const RGB = [R, G, B];

// const solution = (costs) => {
//   const dp = [[[0, 3]]];
//   for (let i = 0; i < N; i++) {
//     dp.push([]);
//     for (let j = 0; j < dp[i].length; j++) {
//       for (const color of RGB) {
//         if (color === dp[i][j][1]) continue;
//         dp[i + 1].push([dp[i][j][0] + costs[i][color], color]);
//       }
//     }
//   }

//   console.log(dp)

//   return Math.min(...dp[N].map((el) => el[0]));
// };
// console.log(solution(costs));

const solution2 = (costs) => {
  const dp = costs.map((row) => [...row]);
  for (let i = 1; i < N; i++) {
    dp[i][0] += Math.min(dp[i - 1][1], dp[i - 1][2]);
    dp[i][1] += Math.min(dp[i - 1][0], dp[i - 1][2]);
    dp[i][2] += Math.min(dp[i - 1][0], dp[i - 1][1]);
  }
  return Math.min(...dp[N - 1]);
};

console.log(solution2(costs));
