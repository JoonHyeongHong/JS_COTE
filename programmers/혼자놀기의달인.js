function solution(cards) {
  const answer = [];
  cards.forEach((val, idx, arr) => {
    const queue = [val];
    const box1 = [];
    const box2 = [];

    const visited = new Array(arr.length).fill(0);
    while (queue.length) {
      const nextIndex = queue.pop() - 1;
      if (!visited[nextIndex]) {
        visited[nextIndex] = 1;
        queue.push(arr[nextIndex]);
        box1.push(nextIndex + 1);
      }
    }

    for (let i = idx; i < arr.length; i++) {
      if (!visited[i]) {
        queue.push(arr[i]);
        break;
      }
    }

    while (queue.length) {
      const nextIndex = queue.pop() - 1;
      if (!visited[nextIndex]) {
        visited[nextIndex] = 1;
        queue.push(arr[nextIndex]);
        box2.push(nextIndex + 1);
      }
    }

    answer.push(box1.length * box2.length);
  });

  return Math.max(...answer);
}
