function solution(name) {
  const input = new Array(name.length).fill("A");
  let minMove = Number.MAX_SAFE_INTEGER;

  const joyStick = (currentIndex, move, input, count) => {
    //만약 해당 문자열이 name과 같다면, minMove와 비교해서 더 작은 값 저장
    //move - 1 의 이유 : 재귀함수에 한 번 더 불려졌기 때문
    if (input.join("") === name) {
      return (minMove = Math.min(minMove, move));
    }

    //옆으로 조작해서 한 바퀴 돌았는데도 문자열이 같지 않다면, 함수 종료
    if (count >= input.length) return 0;

    //다음 재귀함수에 넣기 위해 선언
    let newMove = move;
    const newInput = [...input];

    //몇번째 알파벳인지 구함
    let alphabetIndex =
      name[currentIndex].charCodeAt(0) - newInput[currentIndex].charCodeAt(0);

    //알파벳을 절반으로 나눴을 때 A에서부터 가까울 때
    if (alphabetIndex <= 13) {
      newMove += alphabetIndex;
    } else {
      //Z쪽에서 가까울 때
      newMove += 26 - alphabetIndex;
    }

    //문자열을 바꿔줍니다
    newInput[currentIndex] = name[currentIndex];

    //우측 방향으로 돌리면서 문자열 바꿈
    joyStick(
      (currentIndex + 1) % newInput.length,
      newMove + 1,
      newInput,
      count + 1
    );

    //왼쪽 방향으로 돌리면서 문자열 바꿈
    currentIndex
      ? joyStick(currentIndex - 1, newMove + 1, newInput, count + 1)
      : joyStick(newInput.length - 1, newMove + 1, newInput, count + 1);
  };

  joyStick(0, 0, input, 0);
  return Math.max(minMove, 0); // "AAAAAA" 같은 문자열일 때 minMove가 -1이 됨, 그런 경우를 위한 0처리
}
