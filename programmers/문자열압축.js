const solution = (s) => {
  let result = s.length; // 문자열의 최대개수.
  for (let i = 1; i <= Math.floor(s.length / 2); i++) {
    // 최대 절반까지비교.
    let temp = ""; // 문자열 임시저장.
    let cnt = 1; // 같은 문자열 count.

    for (let j = 0; j < s.length; j += i) {
      // j += i, i = 1... n/2개씩 증가.
      let s1 = s.slice(j, j + i); // 비교대상 문자열

      while (true) {
        // 같은 문자열 찾는 루프.
        j += i; // 그 다음 문자열 index
        let s2 = s.slice(j, j + i);
        if (s1 === s2) {
          // 비교문자열과 같은 문자열이라면 cnt증가.
          cnt++;
        } else {
          // 다른 문자열이라면 break;
          break;
        }
      }

      temp += cnt >= 2 ? cnt + s1 : s1; // 2번이상 반복된다면 압축.
      j -= i; // 다음 for문에서 증가되므로 한번 감소.
      cnt = 1; // cnt를 초기화.
    }
    result = Math.min(temp.length, result); // 단순 문자열길이 이므로 최소값만 저장.
  }
  return result;
};
