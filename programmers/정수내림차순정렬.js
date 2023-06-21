function solution(n) {
  return Number(
    n
      .toString()
      .split("")
      .sort((a, b) => b - a)
      .map(Number)
      .join("")
  );
}
