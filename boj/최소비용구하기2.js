(() => {
  class PriorityQueue {
    constructor() {
      this.heap = [];
    }

    empty() {
      return this.heap.length === 0;
    }

    peek() {
      return this.heap[0];
    }

    push(data) {
      this.heap.push(data);
      let index = this.heap.length - 1;
      while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2);
        if (this.heap[parentIndex] < this.heap[index]) break;
        [this.heap[parentIndex], this.heap[index]] = [
          this.heap[index],
          this.heap[parentIndex],
        ];
        index = parentIndex;
      }
    }

    pop() {
      if (this.empty()) return;
      const value = this.peek();
      [this.heap[0], this.heap[this.heap.length - 1]] = [
        this.heap[this.heap.length - 1],
        this.heap[0],
      ];
      this.heap.pop();
      this._heapify();
      return value;
    }

    _heapify() {
      const x = this.peek();
      const n = this.heap.length;
      let cur = 0;

      while (2 * cur + 1 < n) {
        const leftChild = cur * 2 + 1;
        const rightChild = cur * 2 + 2;
        const smallerChild =
          rightChild < n && this.heap[rightChild] < this.heap[leftChild]
            ? rightChild
            : leftChild;

        if (x > this.heap[smallerChild]) {
          [this.heap[cur], this.heap[smallerChild]] = [
            this.heap[smallerChild],
            this.heap[cur],
          ];
          cur = smallerChild;
        } else {
          break;
        }
      }
    }
  }

  const input = require("fs")
    .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
    .toString()
    .trim()
    .split("\n");
  const [n, m, ...rest] = input;
  const last = rest.pop();
  const [start, end] = last.split(" ").map(Number);
  const edges = rest.map((str) => str.split(" ").map(Number));
  const distances = new Array(Number(n) + 1).fill(Infinity);
  const cities = Array.from({ length: Number(n) + 1 }, () => []);
  const graph = Array.from({ length: Number(n) + 1 }, () => []);
  for (const edge of edges) {
    const [u, v, w] = edge;
    graph[u].push([v, w]);
  }

  const dijkstra = (start) => {
    const pq = new PriorityQueue();
    pq.push([0, start, [start]]);
    distances[start] = 0;

    while (!pq.empty()) {
      const [dist, cur, city] = pq.pop();
      if (distances[cur] < dist) continue;
      if (cur === end) continue;

      for (const vw of graph[cur]) {
        const [node, weight] = vw;
        const cost = dist + weight;
        if (cost < distances[node]) {
          const newCity = [...city];
          newCity.push(node);
          distances[node] = cost;
          cities[node] = newCity;
          pq.push([cost, node, newCity]);
        }
      }
    }
  };

  const printAll = (end) => {
    let answer = "";
    answer += distances[end] + "\n";
    answer += cities[end].length + "\n";
    for (const city of cities[end]) {
      answer += city + " ";
    }
    console.log(answer);
  };

  dijkstra(start);
  printAll(end);
})();
