/*
오목은 바둑판에 검은 바둑알과 흰 바둑알을 교대로 놓아서 겨루는 게임이다. 바둑판에는 19개의 가로줄과 19개의 세로줄이 그려져 있는데 가로줄은 위에서부터 아래로 1번, 2번, ... ,19번의 번호가 붙고 세로줄은 왼쪽에서부터 오른쪽으로 1번, 2번, ... 19번의 번호가 붙는다.



위의 그림에서와 같이 같은 색의 바둑알이 연속적으로 다섯 알을 놓이면 그 색이 이기게 된다. 여기서 연속적이란 가로, 세로 또는 대각선 방향 모두를 뜻한다. 즉, 위의 그림은 검은색이 이긴 경우이다. 하지만 여섯 알 이상이 연속적으로 놓인 경우에는 이긴 것이 아니다.

입력으로 바둑판의 어떤 상태가 주어졌을 때, 검은색이 이겼는지, 흰색이 이겼는지 또는 아직 승부가 결정되지 않았는지를 판단하는 프로그램을 작성하시오. 단, 검은색과 흰색이 동시에 이기거나 검은색 또는 흰색이 두 군데 이상에서 동시에 이기는 경우는 입력으로 들어오지 않는다.
*/

const fs = require("fs")
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const solution = () => {
  const board = [];
  const black = 1;
  const white = 2;

  for (let i = 0; i < 19; i++) {
    board.push(input[i].split(" ").map(Number));
  }

  const dx = [1, 1, 1, 0, 0, -1, -1, -1];
  const dy = [1, 0, -1, 1, -1, 1, 0, -1];
  const checkFive = (x, y) => {
    for (let i = 0; i < 8; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (checkInsideBoard(nx, ny)) {
        let count =
          checkContinuity(x, y, dx[i], dy[i], 1) +
          checkContinuity(x, y, -dx[i], -dy[i], 0);
        if (count === 5) {
          if (dy[i] === -1) return [x + 4 * dx[i], y + 4 * dy[i]];
          else if (dx[i] === -1 && dx[i] === 0) return [x + 4 * dx[i], y];
          return [x, y];
        }
      }
    }
    return [];
  };

  const checkInsideBoard = (nx, ny) => {
    return 0 <= nx && 0 <= ny && nx < 19 && ny < 19;
  };

  const checkContinuity = (x, y, dx, dy, count) => {
    if (!checkInsideBoard(x + dx, y + dy)) return count;
    return board[x][y] === board[x + dx][y + dy]
      ? checkContinuity(x + dx, y + dy, dx, dy, count + 1)
      : count;
  };

  for (let i = 0; i < 19; i++) {
    for (let j = 0; j < 19; j++) {
      if (board[i][j] === black || board[i][j] === white) {
        const concave = checkFive(i, j);
        if (concave.length > 0) {
          const [x, y] = concave;
          return [board[i][j], x + 1, y + 1];
        }
      }
    }
  }
  return [0];
};

const answer = solution();
console.log(answer[0]);
if (answer[0] !== 0) console.log(answer[1], answer[2]);
