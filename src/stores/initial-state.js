import { Map, List, OrderedSet, Set } from 'immutable';
import _ from 'lodash';

export const ROWS = 15;
export const COLS = 25;

export const DEFAULT_WALLS = [[7, 21], [8, 9], [4, 24], [12, 11], [8, 5], [8, 21], [8, 2], [13, 2], [4, 5], [9, 18], [12, 15], [7, 18], [12, 5], [10, 9], [4, 22], [13, 11], [8, 4], [8, 13], [13, 18], [3, 4], [12, 8], [13, 13], [11, 15], [11, 18], [3, 3], [13, 12], [1, 13], [6, 21], [9, 9], [12, 18], [3, 5], [12, 6], [5, 21], [12, 2], [11, 11], [5, 5], [8, 18], [2, 13], [4, 23], [8, 1], [5, 18], [0, 13], [6, 18], [11, 9], [3, 18], [8, 3], [4, 21], [9, 21], [6, 5], [9, 13], [7, 5], [4, 13], [3, 13], [10, 18], [8, 0], [12, 7], [13, 14], [14, 18], [13, 15], [12, 9], [5, 13], [7, 13], [4, 18], [6, 13], [11, 2]].map((xy) => List(xy));

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function createGrid(rows, cols) {
  return  _.reduce(_.range(rows), (list, row) => {
    return list.push(..._.map(_.range(cols), col =>  {
      return List([row, col]);
    }));
  }, List());
}

export default function initialState({ rows = ROWS, cols = COLS } = {}) {
  const start     = List([getRandomInt(0, rows), getRandomInt(0, cols)]);
  const visited   = OrderedSet();
  const frontier  = OrderedSet();
  const walls     = Set();
  const animation = Map();
  const history   = Map();
  const grid = createGrid(rows, cols);

  return Map({
    grid,
    rows,
    cols,
    start,
    walls,
    animation,
    visited,
    frontier,
    history
  });
}
