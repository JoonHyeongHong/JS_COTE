const solution = (step) => {
  const items = [1, 3, 5];
  const one = [5, 3, 1];
  const two = [];
  const three = [];
  const move = (n, start, sub, end) => {
    if (n === 1) return console.log(step, start, sub, end);
    //1번에서 3번으로 옮기는 것을 최우선으로 삼는다.
    if (n === 2) {
      console.log(one, two, three);
      sub.push(start.pop());
      move(n - 1, start, sub, end);
    } else {
      //3이면,
      console.log(one, two, three);
      sub.push(start.pop());
      move(n - 1, sub, start, end);
    }
  };
  move(step, one, two, three);
};

solution(3);
