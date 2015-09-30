import {Map, List} from 'immutable';

export const ROWS = 21;
export const COLS = 35;

function fillArray(n, callback) {
  const arr = Array.apply(null, Array(n));
  return arr.map(callback);
}

function emptyGrid(rows, cols) {
  return List(fillArray(rows, () => List(fillArray(cols, () => 'empty'))));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const startCoordinates = List([getRandomInt(0, ROWS), getRandomInt(0, COLS)]);

const grid = emptyGrid(ROWS, COLS).setIn(startCoordinates.toArray(), 'start');

export default Map({
  grid,
  startCoordinates
});
