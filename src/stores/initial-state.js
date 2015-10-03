import {Map, List, OrderedSet} from 'immutable';
import _ from 'lodash';

export const ROWS = 15;
export const COLS = 25;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const rows = ROWS;
const cols = COLS;

const start    = List([getRandomInt(0, ROWS), getRandomInt(0, COLS)]);
const visited  = OrderedSet();
const frontier = OrderedSet();
const walls    = OrderedSet();

const grid = _.reduce(_.range(rows), (list, row) => {
  return list.push(..._.map(_.range(cols), col =>  {
    return List([row, col]);
  }));
}, List());

export default Map({
  grid,
  rows,
  cols,
  start,
  visited,
  frontier,
  walls
});
