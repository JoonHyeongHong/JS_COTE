const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n")
  .reverse();

const T = input.pop();
for (let i = 0; i < T; i++) {
  const N = input.pop();
  const people = input.pop().split(" ");

  //MBTI가 같은 사람이 적어도 3사람이 나올 수 있는 수
  if (N > 32) {
    console.log(0);
    continue;
  }

  const calcMbtiDiff = (mbti1, mbti2) => {
    if (mbti1 === mbti2) return 0;

    let count = 0;
    for (let i = 0; i < 4; i++) {
      count += mbti1[i] !== mbti2[i];
    }
    return count;
  };

  const calcPeopleMinDiff = (people) => {
    let minDiff = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < people.length - 2; i++) {
      for (let j = 1; j < people.length - 1; j++) {
        for (let k = 2; k < people.length; k++) {
          if (i === j || j === k || i === k) continue;
          if (minDiff === 0) return 0;

          let diff = 0;
          diff += calcMbtiDiff(people[i], people[j]);
          diff += calcMbtiDiff(people[i], people[k]);
          diff += calcMbtiDiff(people[j], people[k]);
          minDiff = Math.min(minDiff, diff);
        }
      }
    }
    return minDiff;
  };

  console.log(calcPeopleMinDiff(people));
}
