/*
욱제는 구사과의 열렬한 팬이다. 오늘 욱제는 구사과에게 선물()을 전달해주려고 한다. 지난 며칠간의 관찰 끝에 욱제는 구사과의 이동 패턴을 모두 파악했다.

구사과가 있는 곳은 1×N 크기의 직사각형 지도로 나타낼 수 있으며, 1×1크기의 정사각형으로 나누어져 있다. 구사과의 위치는 (1, x)로 나타낼 수 있으며, (1, x)는 왼쪽에서부터 x번째 칸을 의미한다.

지도의 각 칸에는 E, W중의 한 문자가 쓰여져 있는데, 구사과는 이 문자를 이용해서 이동한다. 구사과의 위치가 (1, x)인 경우에 E가 쓰여져 있는 칸에 서 있었다면, (1, x+1)로, W의 경우에는 (1, x-1)로 순간이동한다. 구사과는 지치지 않기 때문에, 계속해서 이동한다.

욱제는 구사과의 위치를 모르기 때문에, 구사과가 이동을 시작하는 위치와 관계없이 선물을 주는 방법을 알아내려고 한다. 최소 몇 개의 칸 위에 선물을 놓으면, 구사과가 항상 선물을 가져가는지 구하는 프로그램을 작성하시오. 선물이 놓여진 칸에 구사과가 이동하면, 구사과는 항상 선물을 가져간다.
*/

const moveObj = {
  E: (position) => {
    return position + 1;
  },
  W: (position) => {
    return position - 1;
  },
};

const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const moves = input[1].split("");
const map = new Array(N).fill(0);
for (let x = 0; x < N; x++) {
  let position = x;
  const newMoves = [...moves];
  while (newMoves[position] !== "" && map[position] === 0) {
    const command = newMoves[position];
    newMoves[position] = "";
    position = moveObj[command](position);
  }
  map[position]++;
}

console.log(map.filter((el) => el !== 0).length);
