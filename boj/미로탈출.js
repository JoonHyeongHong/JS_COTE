function solution(maps) {
  let S;
  let E;
  let L;
  maps.forEach((row, idx) => {
    row.split("").forEach((el, idx2) => {
      if (el === "S") S = [idx, idx2];
      else if (el === "L") L = [idx, idx2];
      else if (el === "E") E = [idx, idx2];
    });
  });

  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  const bps = (start, end) => {
    const visited = Array.from({ length: maps.length }, () =>
      Array.from({ length: maps[0].length }, () => false)
    );

    const queue = [[...start, 0]];
    while (queue.length > 0) {
      const [x, y, count] = queue.shift();
      if (x === end[0] && y === end[1]) return count;
      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        if (0 <= nx && nx < maps.length && 0 <= ny && ny < maps[0].length) {
          if (!visited[nx][ny] && maps[nx][ny] !== "X") {
            visited[nx][ny] = true;
            queue.push([nx, ny, count + 1]);
          }
        }
      }
    }
    return -1;
  };
  let count1 = 0;
  let count2 = 0;
  count1 = bps(S, L);
  if (count1 === -1) return -1;
  count2 = bps(L, E);
  return count2 >= 0 ? count1 + count2 : count2;
}
