function solution(elements) {
  let answer = [];
  elements.push(...elements);

  //시작위치
  for (let i = 0; i < elements.length / 2; i++) {
    //길이
    const set2 = new Set();
    for (let j = 1; j <= elements.length / 2; j++) {
      const array = elements.slice(i, i + j);
      set2.add(array.reduce((acc, cur) => acc + cur, 0));
    }
    answer.push(...set2);
  }

  answer.sort((a, b) => a - b);
  const set = new Set(answer);
  return set.size;
}
