import {Map, List, OrderedSet} from 'immutable';

export const ROWS = 15;
export const COLS = 25;

function fillArray(n, callback) {
  const arr = Array.apply(null, Array(n));
  return arr.map(callback);
}

function emptyGrid(rows, cols) {
  return List(fillArray(rows, () => List(fillArray(cols, () => Map({ role: 'empty' })))));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// State
// 1. List of Lists of Maps with role, visited?, frontier
// 2. List of coordinates (Arrays) each for visited, frontier, walls

const startCoordinates = List([getRandomInt(0, ROWS), getRandomInt(0, COLS)]);

const rows = ROWS;
const cols = COLS;

const grid = _.reduce(_.range(rows), function(rows, row) {
  return rows.push(..._.map(_.range(cols), function (col) {
    return List([row, col]);
  }));
}, List());

const start    = startCoordinates;
const visited  = OrderedSet();
const frontierX = OrderedSet();
const walls    = OrderedSet();

export default Map({
  grid,
  startCoordinates,

  rows,
  cols,
  start,
  visited,
  frontierX,
  walls
});
