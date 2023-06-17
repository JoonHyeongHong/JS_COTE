function solution(s) {
  const bracket = {
    "[": (stack) => {
      stack.push("[");
      return true;
    },
    "(": (stack) => {
      stack.push("(");
      return true;
    },
    "{": (stack) => {
      stack.push("{");
      return true;
    },
    "]": (stack) => (stack.pop() === "[" ? true : false),
    "}": (stack) => (stack.pop() === "{" ? true : false),
    ")": (stack) => (stack.pop() === "(" ? true : false),
  };
  if (s.length % 2 === 1) return 0;

  let x = 0;
  let count = 0;
  while (x < s.length) {
    const stack = [];
    const str = s.split("");

    for (let i = 0; i < x; i++) {
      str.push(str.shift());
    }
    str.reverse();
    while (str.length) {
      if (!bracket[str.pop()](stack)) {
        count--;
        break;
      }
    }
    count++;
    x++;
  }

  return count;
}
