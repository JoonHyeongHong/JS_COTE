function solution(n, arr1, arr2) {
  const one = arr1.map((el) =>
    el.toString(2).padStart(n).split("").map(Number)
  );
  const two = arr2.map((el) =>
    el.toString(2).padStart(n).split("").map(Number)
  );
  const answer = one.map((row, idx) =>
    row
      .map((el, idx2) => {
        return el || two[idx][idx2] ? "#" : " ";
      })
      .join("")
  );
  return answer;
}
