import _ from 'lodash';

const N = 'N';
const W = 'W';
const S = 'S';
const E = 'E';
const directions = [N, W, S, E];
const DX = { E: 1, W: -1, N:  0, S: 0 };
const DY = { E: 0, W:  0, N: -1, S: 1 };
const OPP = { E: W, W: E, N: S, S: N };

function shuffle(array) {
  let currentIndex = array.length, temp, randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }

  return array;
}

function carvePassagesFrom(cx, cy, grid) {
  shuffle(directions).forEach(direction => {
    let [ny, nx] = [cx + DX[direction], cy + DY[direction]];

    if (_.inRange(ny, grid.length-1) && _.inRange(nx, grid[ny].length-1 && grid[ny][nx] === 0)) {
      grid[cy][cx] = !!direction;
      grid[ny][nx] = !!OPP[direction];
      carvePassagesFrom(nx, ny, grid);
    }
  });

  return grid;
}

export default function(rows, cols) {
  const grid = _.range(rows).map(r => _.range(cols).map(col => 0));
  return carvePassagesFrom(0, 0, grid);
}
