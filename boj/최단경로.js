(() => {
  const input = require("fs")
    .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
    .toString()
    .trim()
    .split("\n");
  const [first, second, ...rest] = input;
  const [V, E] = first.split(" ").map(Number);
  const K = Number(second);
  const edges = rest.map((row) => row.split(" ").map(Number));

  const linkedInfo = (uvws) => {
    const links = new Array(V + 1);
    uvws.forEach((edge) => {
      const [u, v, w] = edge;
      links[u] ??= [];
      links[u].push({ vertex: V, cost: w });
    });
    return links;
  };

  class MinHeap {
    constructor() {
      this.nodes = [];
    }

    insert(value) {
      this.nodes.push(value);
      this.bubbleUp();
    }

    bubbleUp(index = this.nodes.length - 1) {
      if (index < 1) return;

      const currentNode = this.nodes[index];
      const parentIndex = Math.floor((index - 1) / 2);
      const parentNode = this.nodes[parentIndex];
      if (parentNode.cost <= currentNode.cost) return;

      this.nodes[index] = parentNode;
      this.nodes[parentIndex] = currentNode;
      index = parentIndex;
      this.bubbleUp(index);
    }

    extract() {
      const min = this.nodes[0];
      if (this.nodes.length === 1) {
        this.nodes.pop();
        return min;
      }

      this.nodes[0] = this.nodes.pop();
      this.trickleDown();
      return min;
    }

    trickleDown(index = 0) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      const length = this.nodes.length;
      let minimum = index;

      if (!this.nodes[rightChildIndex] && !this.nodes[leftChildIndex]) return;
      if (!this.nodes[rightChildIndex]) {
        if (this.nodes[leftChildIndex].cost < this.nodes[minimum].cost) {
          minimum = leftChildIndex;
        }
        return;
      }

      if (this.nodes[leftChildIndex].cost > this.nodes[rightChildIndex].cost) {
        if (
          rightChildIndex <= length &&
          this.nodes[rightChildIndex].cost < this.nodes[minimum].cost
        ) {
          minimum = rightChildIndex;
        }
      } else {
        if (
          leftChildIndex <= length &&
          this.nodes[leftChildIndex].cost < this.nodes[minimum].cost
        ) {
          minimum = leftChildIndex;
        }
      }

      if (minimum !== index) {
        let temp = this.nodes[minimum];
        this.nodes[minimum] = this.nodes[index];
        this.nodes[index] = temp;
        this.trickleDown(minimum);
      }
    }
  }

  const dijkstra = (links, startV) => {
    let shortestPathTable = Array(V + 1).fill(Infinity);
    shortestPathTable[0] = -1;
    shortestPathTable[startV] = 0;
    let minHeap = new MinHeap();
    const start = { vertex: startV, cost: 0 };
    minHeap.insert(start);
    while (minHeap.nodes.length) {
      const selected = minHeap.extract();
      const { vertex: startVertex, cost: beforeCost } = selected;
      if (links[startVertex] === undefined) continue;
      if (shortestPathTable[startVertex] < beforeCost) continue;
      links[startVertex].forEach((edge) => {
        const { vertex, cost } = edge;
        if (shortestPathTable[vertex] <= shortestPathTable[startVertex] + cost)
          return;
        shortestPathTable[vertex] = shortestPathTable[startVertex] + cost;
        const next = {
          vertex,
          cost: shortestPathTable[startVertex] + cost,
        };
        minHeap.insert(next);
      });
    }
    return shortestPathTable;
  };

  const printAll = (shortestPathTable) => {
    let answer = "";
    for (let i = 1; i < shortestPathTable.length; i++) {
      if (shortestPathTable[i] === Infinity) answer += "INF" + "\n";
      else answer += shortestPathTable[i] + "" + "\n";
    }
    console.log(answer.trim());
  };

  const links = linkedInfo(edges);
  const table = dijkstra(links, K);
  printAll(table);
})();
