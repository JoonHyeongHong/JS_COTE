/*
새로 생긴 놀이기구는 인기가 매우 많아 줄이 끊이질 않습니다. 이 놀이기구의 원래 이용료는 price원 인데, 놀이기구를 N 번 째 이용한다면 원래 이용료의 N배를 받기로 하였습니다. 즉, 처음 이용료가 100이었다면 2번째에는 200, 3번째에는 300으로 요금이 인상됩니다.
놀이기구를 count번 타게 되면 현재 자신이 가지고 있는 금액에서 얼마가 모자라는지를 return 하도록 solution 함수를 완성하세요.
단, 금액이 부족하지 않으면 0을 return 하세요.
*/

function solution(price, money, count) {

  // i번째 인덱스에 price * (i+1) 의 값이 들어있는 배열을 구현했다
  const arr = new Array(count).fill(price).map((el, idx) => el * (idx + 1));

  //총 합은 해당 배열의 원소의 합
  const total = arr.reduce((acc, cur) => acc + cur, 0);

  // 따라서 총합이 보유중인 금액보다 많으면, 뺴기를 해서 얼마나 부족한지 반환하고, 부족하지 않다면 0을 반환한다.
  return total > money ? total - money : 0;
}
