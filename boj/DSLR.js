//D S L R 명령어 4개
// 레지스터 - 0 ~ 9999 십진수 저장 가능

const input = require("fs")
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const commands = {
  D(n) {
    return (n * 2) % 10000;
  },
  S(n) {
    return n ? n - 1 : 9999;
  },
  L(n) {
    return (n % 1000) * 10 + Math.floor(n / 1000);
  },
  R(n) {
    return (n % 10) * 1000 + Math.floor(n / 10);
  },
};

const bfs = (register) => {
  const [A, B] = register.split(" ").map(Number);

  if (A === B) return "";
  const visited = new Array(10000).fill(0);
  const queue = [[A, ""]];
  visited[A] = 1;
  let index = 0;
  while (queue.length) {
    const [number, enteredCommand] = queue[index++];

    for (const command in commands) {
      const newNumber = commands[command](number);
      if (!visited[newNumber]) {
        if (newNumber === B) return console.log(enteredCommand + command);
        visited[newNumber] = 1;
        queue.push([newNumber, enteredCommand + command]);
      }
    }
  }
};

const [T, ...registers] = input;
registers.forEach(bfs);
