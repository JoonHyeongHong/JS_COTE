/*
집에서 시간을 보내던 오영식은 박성원의 부름을 받고 급히 달려왔다. 박성원이 캠프 때 쓸 N개의 랜선을 만들어야 하는데 너무 바빠서 영식이에게 도움을 청했다.

이미 오영식은 자체적으로 K개의 랜선을 가지고 있다. 그러나 K개의 랜선은 길이가 제각각이다. 박성원은 랜선을 모두 N개의 같은 길이의 랜선으로 만들고 싶었기 때문에 K개의 랜선을 잘라서 만들어야 한다. 예를 들어 300cm 짜리 랜선에서 140cm 짜리 랜선을 두 개 잘라내면 20cm는 버려야 한다. (이미 자른 랜선은 붙일 수 없다.)

편의를 위해 랜선을 자르거나 만들 때 손실되는 길이는 없다고 가정하며, 기존의 K개의 랜선으로 N개의 랜선을 만들 수 없는 경우는 없다고 가정하자. 그리고 자를 때는 항상 센티미터 단위로 정수길이만큼 자른다고 가정하자. N개보다 많이 만드는 것도 N개를 만드는 것에 포함된다. 이때 만들 수 있는 최대 랜선의 길이를 구하는 프로그램을 작성하시오.
*/

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [K, N] = input.shift().split(" ").map(Number);
const nums = input.map(Number);

const solution = (K, N, nums) => {
  let answer = Number.MIN_SAFE_INTEGER;
  let start = 0;
  let end = Math.max(...nums);
  let middle;
  while (start <= end) {
    let sum = 0;
    middle = Math.floor((start + end) / 2);

    //nums에 있는 원소들을 middle로 나눈 몫값을 sum에 더한다
    for (const num of nums) {
      sum += Math.floor(num / middle);
    }

    //sum이 원하던 갯수보다 많거나 같으면 
    //middle을 늘려본다.
    if (sum >= N) {
      start = middle + 1;
      answer = answer >= middle ? answer : middle;
    } else {
    
        //작다면 middle을 줄여본다
      end = middle - 1;
    }
  }

  return answer;
};

console.log(solution(K, N, nums));
