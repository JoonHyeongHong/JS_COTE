let limit = 10000000;

let sosu = new Array(limit + 1).fill(true).fill(false, 0, 2);
for (let i = 2; i * i <= limit; i++) {
  if (sosu[i]) {
    for (let j = i * i; j <= limit; j += i) {
      sosu[j] = false;
    }
  }
}

function solution(n) {
  let cnt = 0;
  for (let i = 1; i <= n; i++) {
    if (sosu[i]) cnt++;
  }

  return cnt;
}
