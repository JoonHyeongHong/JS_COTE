function solution(numbers, target) {
  const answer = [];

  const fnc = (expression, idx) => {
    if (idx >= numbers.length && eval(expression) === target)
      return answer.push(expression);
    if (idx >= numbers.length) return 0;
    fnc(`${expression}+${numbers[idx].toString()}`, idx + 1);
    fnc(`${expression}-${numbers[idx].toString()}`, idx + 1);
  };

  fnc(`+${numbers[0].toString()}`, 1);
  fnc(`-${numbers[0].toString()}`, 1);

  return answer.length;
}
