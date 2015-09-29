import {List, Map} from 'immutable';

function fillArray(n, callback) {
  const arr = Array.apply(null, Array(n));
  return arr.map(callback);
}

function emptyGrid(rows, cols) {
  return List(fillArray(rows, () => List(fillArray(cols, () => 0))));
}

const grid = emptyGrid(21, 35);

export default Map({
  grid
});
