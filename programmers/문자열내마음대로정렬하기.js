function solution(strings, n) {
  return strings.sort().sort((a, b) => a[n].charCodeAt(0) - b[n].charCodeAt(0));
}
