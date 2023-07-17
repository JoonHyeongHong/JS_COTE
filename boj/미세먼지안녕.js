/**
 * 1. 미세먼지가 확산된다. 모든 칸에서 동시에 일어남
 * - (r,c)에 있는 미세먼지는 인접한 네 방향으로 확산됨
 * - 인접한 방향에 공기청정기가 있거나, 칸이 없으면 그 방향은 X
 * - 확산되는 양은 A(r,c) / 5이고 소수점은 버림
 * - (r,c)에 남는 양은 A(r,c) - A(r,c) / 5  * 확산된 방향의 개수
 *
 * 2. 공기청정기 가동
 * 위쪽 공기청정기의 바람은 반시게방향
 * 아래쪽 공치정정기의 바람은 시계빵향
 * 바람이 불면 미세먼지는 바람의 방향대로 모두 한 칸 씩 이동
 * 공기청정기에서 부는 바람은 미세먼지가 없는 바람, 공기청정기로 들어간 바람은 모두 정화됨
 */

(() => {
  const input = require("fs")
    .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
    .toString()
    .trim()
    .split("\n");

  const [RCT, ...rest] = input;
  const [R, C, T] = RCT.split(" ").map(Number);
  const map = rest.map((row) => row.split(" ").map(Number));

  // 미세먼지 확산
  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  const isInMap = (x, y) => {
    return 0 <= x && x < R && 0 <= y && y < C && map[x][y] !== -1;
  };

  const diffusion = (x, y, newMap) => {
    const diffusionDirection = [];
    if (map[x][y] <= 4) return 0;
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      if (isInMap(nx, ny)) diffusionDirection.push([nx, ny]);
    }

    let dustAmount = map[x][y];
    const diffusedDust = Math.floor(dustAmount / 5);

    diffusionDirection.forEach(([nx, ny]) => {
      dustAmount -= diffusedDust;
      newMap[nx][ny] += diffusedDust;
    });

    map[x][y] = dustAmount;
  };

  const airConditioner = [];
  map.forEach((row, x) =>
    row.forEach((el) => {
      if (el === -1) airConditioner.push(x);
    })
  );

  const cleanAir = () => {
    const [top, bottom] = airConditioner;
    const end = C - 1;
    //위 컨디셔너
    for (let x = top - 1; x > 0; x--) {
      map[x][0] = map[x - 1][0];
    }

    for (let y = 0; y < C; y++) {
      map[0][y] = map[0]?.[y + 1] ?? 0;
    }

    for (let x = 0; x < top; x++) {
      map[x][end] = map[x + 1][end];
    }

    for (let y = end; y > 0; y--) {
      map[top][y] = map[top][y - 1];
    }
    map[top][1] = 0;

    // 아래 컨디셔너
    for (let x = bottom + 1; x < R; x++) {
      map[x][0] = map[x + 1]?.[0] ?? 0;
    }

    for (let y = 0; y < C; y++) {
      map[R - 1][y] = map[R - 1]?.[y + 1] ?? 0;
    }

    for (let x = R - 1; x > bottom; x--) {
      map[x][end] = map[x - 1][end];
    }

    for (let y = end; y > 0; y--) {
      map[bottom][y] = map[bottom][y - 1];
    }
    map[bottom][1] = 0;
  };

  for (let t = 0; t < T; t++) {
    const newMap = map.map((row) => row.map(() => 0));
    for (let x = 0; x < R; x++) {
      for (let y = 0; y < C; y++) {
        if (map[x][y] > 4) diffusion(x, y, newMap);
      }
    }

    for (let x = 0; x < R; x++) {
      for (let y = 0; y < C; y++) {
        map[x][y] += newMap[x][y];
      }
    }
    cleanAir();
  }

  console.log(
    map.reduce(
      (acc, cur) => acc + cur.reduce((acc2, cur2) => acc2 + cur2, 0),
      0
    ) + 2
  );
})();
