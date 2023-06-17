function solution(arrayA, arrayB) {
  const getA = (arrayA, arrayB) => {
    let answer = 0;
    let gcd = (a, b) => (a % b === 0 ? b : gcd(b, a % b));
    arrayA.forEach((val) => (answer = gcd(answer, val)));
    if (arrayB.some((val) => val % answer === 0)) return 0;
    return answer;
  };

  let a = getA(arrayA, arrayB);

  let b = getA(arrayB, arrayA);

  return Math.max(a, b);
}
