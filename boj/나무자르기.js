/*
상근이는 나무 M미터가 필요하다. 근처에 나무를 구입할 곳이 모두 망해버렸기 때문에, 정부에 벌목 허가를 요청했다. 정부는 상근이네 집 근처의 나무 한 줄에 대한 벌목 허가를 내주었고, 상근이는 새로 구입한 목재절단기를 이용해서 나무를 구할것이다.

목재절단기는 다음과 같이 동작한다. 먼저, 상근이는 절단기에 높이 H를 지정해야 한다. 높이를 지정하면 톱날이 땅으로부터 H미터 위로 올라간다. 그 다음, 한 줄에 연속해있는 나무를 모두 절단해버린다. 따라서, 높이가 H보다 큰 나무는 H 위의 부분이 잘릴 것이고, 낮은 나무는 잘리지 않을 것이다. 예를 들어, 한 줄에 연속해있는 나무의 높이가 20, 15, 10, 17이라고 하자. 상근이가 높이를 15로 지정했다면, 나무를 자른 뒤의 높이는 15, 15, 10, 15가 될 것이고, 상근이는 길이가 5인 나무와 2인 나무를 들고 집에 갈 것이다. (총 7미터를 집에 들고 간다) 절단기에 설정할 수 있는 높이는 양의 정수 또는 0이다.

상근이는 환경에 매우 관심이 많기 때문에, 나무를 필요한 만큼만 집으로 가져가려고 한다. 이때, 적어도 M미터의 나무를 집에 가져가기 위해서 절단기에 설정할 수 있는 높이의 최댓값을 구하는 프로그램을 작성하시오.
*/

//입력을 위한 fs
const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .split("\n");

// 나무 수 n, 가져가려는 나무의 길이 m
const [n, m] = input[0].split(" ").map(Number);
// 다음 줄은 나무의 높이들
const trees = input[1]
  .split(" ")
  .slice(0, n)
  .map(Number)
  .sort((a, b) => a - b); // 이진탐색을 위한 정렬

let left = 0; // 절단할 높이의 최솟값
let right = trees[n - 1]; // 절단할 높이의 최대값
let answer = Number.MIN_SAFE_INTEGER; // 앞으로 구할 절단 높이 변수
let middle = 0; //중간값 (미정)

while (left <= right) {
  // 이진탐색의 경우 left가 right와 같아질때까지 반복한다
  let sum = 0; // m의 값과 비교하기 위한 변수
  middle = Math.floor((left + right) / 2); //중간값은 정수여야하므로 Math.floor()로 버린다
  for (const tree of trees) {
    // 나무 높이끼리 계산해서 sum을 구한다
    sum += tree > middle ? tree - middle : 0;
  }

  //sum이 m보다 작다는 소리는, tree - middle 값을 높이기 위해
  //middle 값이 작아져야하므로, right를 middle - 1로하여, middle = Math.floor(left+middle-1)/2 로 만든다
  if (sum < m) {
    right = middle - 1;
  } else if (sum >= m) {
    //반대로 sum이 m보다 크거나 같은 소리는, 가져야가야할 나무만큼을 충족했다는 의미이므로
    //일단 middle이 answer보다 큰지 여부에 따라, 더 큰 값을 answer에 저장시킨다
    if (middle > answer) answer = middle;
    left = middle + 1; // 그 뒤 다음 값을 구하기 위해(여전히 sum>=m이 되야하므로) left에 middle +1을 할당한다
  }
}
console.log(answer); // 그렇게 반복하여 구한 answer 값이 바로 최대값이다
