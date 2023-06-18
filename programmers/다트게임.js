function solution(dartResult) {
  const answer = [];
  const bonuses = {
    S: (el) => +el,
    D: (el) => el ** 2,
    T: (el) => el ** 3,
  };

  const options = {
    "*": (array, idx) => {
      const newArray = [...array];
      idx ? (newArray[idx - 1] *= 2) : 0;
      newArray[idx] *= 2;
      return newArray;
    },
    "#": (array, idx) => {
      const newArray = [...array];
      newArray[idx] *= -1;
      return newArray;
    },
  };

  const regex = new RegExp(/\d+\w[*|#]*/, "g");
  const darts = dartResult.match(regex);
  const regex2 = new RegExp(/\d+|\S/, "g");
  darts.forEach((dart, idx) => {
    const [score, bonus, option] = dart.match(regex2);
    answer.push(bonuses[bonus](score));
    const newAnswer = option ? options[option](answer, idx) : answer;
    newAnswer.forEach((value, idx) => {
      answer[idx] = value;
    });
  });
  return answer.reduce((acc, cur) => acc + cur, 0);
}
