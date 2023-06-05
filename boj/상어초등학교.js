/*
상어 초등학교에는 교실이 하나 있고, 교실은 N×N 크기의 격자로 나타낼 수 있다. 학교에 다니는 학생의 수는 N2명이다. 오늘은 모든 학생의 자리를 정하는 날이다. 학생은 1번부터 N2번까지 번호가 매겨져 있고, (r, c)는 r행 c열을 의미한다. 교실의 가장 왼쪽 윗 칸은 (1, 1)이고, 가장 오른쪽 아랫 칸은 (N, N)이다.

선생님은 학생의 순서를 정했고, 각 학생이 좋아하는 학생 4명도 모두 조사했다. 이제 다음과 같은 규칙을 이용해 정해진 순서대로 학생의 자리를 정하려고 한다. 한 칸에는 학생 한 명의 자리만 있을 수 있고, |r1 - r2| + |c1 - c2| = 1을 만족하는 두 칸이 (r1, c1)과 (r2, c2)를 인접하다고 한다.

비어있는 칸 중에서 좋아하는 학생이 인접한 칸에 가장 많은 칸으로 자리를 정한다.
1을 만족하는 칸이 여러 개이면, 인접한 칸 중에서 비어있는 칸이 가장 많은 칸으로 자리를 정한다.
2를 만족하는 칸도 여러 개인 경우에는 행의 번호가 가장 작은 칸으로, 그러한 칸도 여러 개이면 열의 번호가 가장 작은 칸으로 자리를 정한다.
예를 들어, N = 3이고, 학생 N2명의 순서와 각 학생이 좋아하는 학생이 다음과 같은 경우를 생각해보자.

학생의 번호	좋아하는 학생의 번호
4	2, 5, 1, 7
3	1, 9, 4, 5
9	8, 1, 2, 3
8	1, 9, 3, 4
7	2, 3, 4, 8
1	9, 2, 5, 7
6	5, 2, 3, 4
5	1, 9, 2, 8
2	9, 3, 1, 4
가장 먼저, 4번 학생의 자리를 정해야 한다. 현재 교실의 모든 칸은 빈 칸이다. 2번 조건에 의해 인접한 칸 중에서 비어있는 칸이 가장 많은 칸인 (2, 2)이 4번 학생의 자리가 된다.

 	 	 
 	4	 
 	 	 
다음 학생은 3번이다. 1번 조건을 만족하는 칸은 (1, 2), (2, 1), (2, 3), (3, 2) 이다. 이 칸은 모두 비어있는 인접한 칸이 2개이다. 따라서, 3번 조건에 의해 (1, 2)가 3번 학생의 자리가 된다.

 	3	 
 	4	 
 	 	 
다음은 9번 학생이다. 9번 학생이 좋아하는 학생의 번호는 8, 1, 2, 3이고, 이 중에 3은 자리에 앉아있다. 좋아하는 학생이 가장 많이 인접한 칸은 (1, 1), (1, 3)이다. 두 칸 모두 비어있는 인접한 칸이 1개이고, 행의 번호도 1이다. 따라서, 3번 조건에 의해 (1, 1)이 9번 학생의 자리가 된다.

9	3	 
 	4	 
 	 	 
이번에 자리를 정할 학생은 8번 학생이다. (2, 1)이 8번 학생이 좋아하는 학생과 가장 많이 인접한 칸이기 때문에, 여기가 그 학생의 자리이다.

9	3	 
8	4	 
 	 	 
7번 학생의 자리를 정해보자. 1번 조건을 만족하는 칸은 (1, 3), (2, 3), (3, 1), (3, 2)로 총 4개가 있고, 비어있는 칸과 가장 많이 인접한 칸은 (2, 3), (3, 2)이다. 행의 번호가 작은 (2, 3)이 7번 학생의 자리가 된다.

9	3	 
8	4	7
 	 	 
이런식으로 학생의 자리를 모두 정하면 다음과 같다.

9	3	2
8	4	7
5	6	1
이제 학생의 만족도를 구해야 한다. 학생의 만족도는 자리 배치가 모두 끝난 후에 구할 수 있다. 학생의 만족도를 구하려면 그 학생과 인접한 칸에 앉은 좋아하는 학생의 수를 구해야 한다. 그 값이 0이면 학생의 만족도는 0, 1이면 1, 2이면 10, 3이면 100, 4이면 1000이다.

학생의 만족도의 총 합을 구해보자.
*/

const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");

const solution = () => {
  const N = Number(input[0]);
  const position = Array.from({ length: N }, () => new Array(N).fill(0));

  const students = [];
  const studentNumbers = [];
  const satisfyScore = [0, 1, 10, 100, 1000];

  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  let score = 0;

  const checkInPosition = (x, y) => {
    return 0 <= x && x < N && 0 <= y && y < N;
  };

  const getFavoriteScore = (x, y, studentNumber) => {
    let favoriteCount = 0;
    for (const number of students[studentNumber]) {
      favoriteCount += checkFavorite(x, y, number) ? 1 : 0;
    }

    return { count: favoriteCount, score: satisfyScore[favoriteCount] };
  };

  const checkFavorite = (x, y, studentNumber) => {
    let count = 0;
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      count +=
        checkInPosition(nx, ny, N) && position[nx][ny] === studentNumber
          ? 1
          : 0;
    }
    return count;
  };

  function setPosition(studentNumber) {
    let willSitPosition = {
      maxFavoriteCount: -1,
      position: [0, 0],
      maxEmptyCount: -1,
    };

    for (let x = 0; x < N; x++) {
      for (let y = 0; y < N; y++) {
        if (!position[x][y]) {
          const favoriteCount = getFavoriteScore(x, y, studentNumber).count;
          const emptyCount = checkFavorite(x, y, 0);

          if (favoriteCount > willSitPosition.maxFavoriteCount) {
            willSitPosition = {
              maxFavoriteCount: favoriteCount,
              position: [x, y],
              maxEmptyCount: emptyCount,
            };
          }
          if (
            favoriteCount === willSitPosition.maxFavoriteCount &&
            emptyCount > willSitPosition.maxEmptyCount
          ) {
            willSitPosition = {
              ...willSitPosition,
              maxEmptyCount: emptyCount,
              position: [x, y],
            };
          }
        }
      }
    }
    return sitPosition(willSitPosition.position, studentNumber);
  }

  const sitPosition = ([x, y], studentNumber) => {
    position[x][y] = studentNumber;
  };

  for (let i = 1; i <= N ** 2; i++) {
    const [studentNumber, ...favoriteStudents] = input[i]
      .split(" ")
      .map(Number);
    students[studentNumber] ??= favoriteStudents;
    studentNumbers.push(studentNumber);
  }

  for (const studentNumber of studentNumbers) {
    setPosition(studentNumber);
  }

  for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
      score += getFavoriteScore(x, y, position[x][y]).score;
    }
  }

  return score;
};
console.log(solution());
