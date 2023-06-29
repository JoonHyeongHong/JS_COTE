const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

// 이동하려는 채널
const targetChannel = Number(input[0]);

//고장난 버튼의 개수
const errorCount = Number(input[1]);

//고장난 버튼, 개수가 0개면 그냥 []
const errorButtons = errorCount ? input[2].split(" ").map(Number) : [];

// 해당 번호가 사용가능 시 true, 고장난 경우 false를 저장할 배열
const buttons = [];
for (let i = 0; i < 10; i++) {
  buttons.push(errorButtons.includes(i) ? false : true);
}

const solution = () => {
  if (targetChannel === 100) return 0;
  let minDiff = Math.abs(targetChannel - 100);

  for (let i = 0; i <= 999999; i++) {
    let isErrorButtonIncluded = false;
    let currentChannel = i.toString();

    for (const number of currentChannel) {
      if (buttons[number]) continue;

      isErrorButtonIncluded = true;
      break;
    }

    if (isErrorButtonIncluded) continue;

    let diff =
      currentChannel.length + Math.abs(targetChannel - Number(currentChannel));

    minDiff = Math.min(diff, minDiff);
  }
  return minDiff;
};

console.log(solution());
