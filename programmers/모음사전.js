function solution(word) {
  const aeiou = ["A", "E", "I", "O", "U"];
  let answer = 0;
  let count = 0;
  const getResult = (str) => {
    if (str === word) return (answer = count);
    if (str.length === 5) return 0;

    for (const s of aeiou) {
      getResult(str + s, count++);
    }
  };
  getResult("", 0);
  return answer;
}
