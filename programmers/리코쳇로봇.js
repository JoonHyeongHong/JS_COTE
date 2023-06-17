/*
리코쳇 로봇이라는 보드게임이 있습니다.

이 보드게임은 격자모양 게임판 위에서 말을 움직이는 게임으로, 시작 위치에서 목표 위치까지 최소 몇 번만에 도달할 수 있는지 말하는 게임입니다.

이 게임에서 말의 움직임은 상, 하, 좌, 우 4방향 중 하나를 선택해서 게임판 위의 장애물이나 맨 끝에 부딪힐 때까지 미끄러져 이동하는 것을 한 번의 이동으로 칩니다.

다음은 보드게임판을 나타낸 예시입니다.

...D..R
.D.G...
....D.D
D....D.
..D....
여기서 "."은 빈 공간을, "R"은 로봇의 처음 위치를, "D"는 장애물의 위치를, "G"는 목표지점을 나타냅니다.
위 예시에서는 "R" 위치에서 아래, 왼쪽, 위, 왼쪽, 아래, 오른쪽, 위 순서로 움직이면 7번 만에 "G" 위치에 멈춰 설 수 있으며, 이것이 최소 움직임 중 하나입니다.

게임판의 상태를 나타내는 문자열 배열 board가 주어졌을 때, 말이 목표위치에 도달하는데 최소 몇 번 이동해야 하는지 return 하는 solution함수를 완성하세요. 만약 목표위치에 도달할 수 없다면 -1을 return 해주세요.
*/
function solution(board) {
  let min = Number.MAX_SAFE_INTEGER;

  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  const checkInBoard = (x, y) => {
    return 0 <= x && x < board.length && 0 <= y && y < board[0].length;
  };

  const recochat = (startPosition) => {
    let min = Number.MAX_SAFE_INTEGER;
    const visited = Array.from(board).map((row) => row.split("").map(() => 0));

    const queue = [[...startPosition, 0]];
    while (queue.length) {
      const [x, y, count] = queue.shift();
      visited[x][y] = 1;

      for (let i = 0; i < 4; i++) {
        let nx = x + dx[i];
        let ny = y + dy[i];
        while (checkInBoard(nx, ny) && board[nx][ny] !== "D") {
          nx += dx[i];
          ny += dy[i];
        }
        nx -= dx[i];
        ny -= dy[i];
        if (!visited[nx][ny]) {
          visited[nx][ny] = 1;
          if (board[nx][ny] === "G") {
            min = Math.min(min, count + 1);
          }
          queue.push([nx, ny, count + 1]);
        }
      }
    }

    return min !== Number.MAX_SAFE_INTEGER ? min : -1;
  };

  const startPoint = [0, 0];
  board.forEach((row, x) => {
    row.split("").map((el, y) => {
      if (el === "R") {
        startPoint[0] = x;
        startPoint[1] = y;
      }
    });
  });

  return recochat(startPoint);
}
