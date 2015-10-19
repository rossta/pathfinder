import { Map, List, OrderedSet, Set, fromJS } from 'immutable';
import _ from 'lodash';

export const ROWS = 15;
export const COLS = 25;

export const DEFAULT_WALLS = [[8, 20], [6, 20], [8, 9], [10, 9], [4, 15], [6, 9], [10, 20], [5, 9], [6, 4], [5, 20], [9, 15], [3, 4], [7, 9], [11, 9], [4, 9], [11, 4], [7, 4], [8, 4], [8, 15], [11, 15], [11, 20], [5, 15], [5, 4], [6, 15], [9, 9], [3, 15], [7, 15], [9, 4], [3, 9], [3, 20], [10, 15], [10, 4], [7, 20], [9, 20], [4, 4], [4, 20], [11, 5], [11, 6], [11, 7], [11, 8], [7, 10], [7, 11], [7, 13], [7, 14], [3, 16], [3, 17], [3, 18], [3, 19]];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function createCells(rows, cols) {
  return  _.reduce(_.range(rows), (list, row) => {
    return list.concat(_.map(_.range(cols), col => [row, col]));
  }, []);
}

export default function bfs({ rows = ROWS, cols = COLS } = {}) {
  const start     = List([Math.floor(rows/2), 1]);
  const visited   = OrderedSet();
  const frontier  = OrderedSet();
  const interval  = null;
  const history   = Map();
  const cells     = fromJS(createCells(rows, cols));
  const grid      = cells;
  const walls     = Set(fromJS(DEFAULT_WALLS));

  return Map({
    grid,
    rows,
    cols,
    start,
    walls,
    interval,
    visited,
    frontier,
    history
  });
}
