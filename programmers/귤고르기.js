function solution(k, tangerine) {
  const obj = tangerine.reduce((acc, cur) => {
    acc[cur] ??= 0;
    acc[cur]++;
    return acc;
  }, {});
  tangerine.sort((a, b) => b - a);
  tangerine.sort((a, b) => obj[b] - obj[a]);
  const length = tangerine.length;

  for (let i = 0; i < length - k; i++) {
    tangerine.pop();
  }
  const answer = new Set(tangerine);
  return answer.size;
}
