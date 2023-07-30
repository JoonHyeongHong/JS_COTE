(() => {
  const input = require("fs")
    .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
    .toString()
    .trim()
    .split("\n");
  const G = Number(input[0]);
  const answer = [];
  let currentWeight = 2;
  let pastWeight = 1;
  const array = Array.from({ length: 100001 }, (_, idx) => idx ** 2);
  while (true) {
    if (
      (currentWeight - pastWeight === 1) &
      (array[currentWeight] - array[pastWeight] > 100000)
    )
      break;

    if (array[currentWeight] - array[pastWeight] < G) {
      currentWeight++;
    } else if (array[currentWeight] - array[pastWeight] > G) {
      pastWeight++;
    } else {
      answer.push(currentWeight);
      pastWeight++;
    }
  }
  if (answer.length) {
    console.log(answer.join("\n"));
  } else {
    console.log(-1);
  }
})();
