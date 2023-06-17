function solution(n) {
  const soobak = [(el) => el + "수", (el) => el + "박"];
  let answer = "";
  for (let i = 0; i < n; i++) {
    answer = soobak[i % 2](answer);
  }
  return answer;
}
