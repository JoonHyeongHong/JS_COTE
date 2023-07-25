function solution(dirs) {
  const isInMap = (x, y) => {
    return -5 <= x && x <= 5 && -5 <= y && y <= 5;
  };
  const commadns = {
    U(x, y) {
      return [x - 1, y];
    },
    D(x, y) {
      return [x + 1, y];
    },
    L(x, y) {
      return [x, y - 1];
    },
    R(x, y) {
      return [x, y + 1];
    },
  };
  const set = new Set();
  let [x, y] = [0, 0];
  for (const dir of dirs) {
    const [nx, ny] = commadns[dir](x, y);
    if (!isInMap(nx, ny)) continue;
    set.add(`from:(${x},${y}),to:${nx},${ny}`);
    set.add(`from:(${nx},${ny}),to:${x},${y}`);
    [x, y] = [nx, ny];
  }
  return set.size / 2;
}
