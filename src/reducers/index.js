import {Map, List, OrderedSet, Set} from 'immutable';
// import { combineReducers } from 'redux';

import {ROWS, COLS, DEFAULT_WALLS} from 'stores/initial-state';

export function startAnimation (state, action) {
  return state.setIn(['animation', 'breadthFirstSearch'], action.interval);
}

export function pauseAnimation (state) {
  return state.setIn(['animation', 'breadthFirstSearch'], null);
}

export function toggleCell (state, action) {
  let walls = state.get('walls');
  let { coordinates } = action;
  coordinates = List(coordinates);
  if (walls.includes(coordinates)) {
    walls = walls.remove(coordinates);
  } else {
    walls = walls.add(coordinates);
  }
  return state.merge({ walls });
}

// TODO reset and initial-state duplicate setup
export function resetAnimation(state) {
  const frontier = OrderedSet();
  const visited  = OrderedSet();
  const walls    = Set(DEFAULT_WALLS);

  // TODO support reset of one animation when
  // others are running
  const animation = Map();

  return state.remove('current').merge({
    visited,
    frontier,
    walls
  });
}

function neighbors (coords) {
  const [row, col] = coords;
  const list = [
    List([row - 1, col]),
    List([row, col - 1]),
    List([row + 1, col]),
    List([row, col + 1])
  ];

  return OrderedSet(list.filter((ncoords) => {
    const [nrow, ncol] = ncoords;
    return (nrow < ROWS && nrow >= 0 && ncol < COLS && ncol >= 0);
  }));
}

function visitableNeighbors(coords, state) {
  const visited = state.get('visited');
  const walls = state.get('walls');
  return neighbors(coords).filter((c) => !(visited.includes(c) || walls.includes(c)));
}

function breadthFirstSearch (state) {
  let current  = state.get('current');
  let frontier = state.get('frontier');
  let visited  = state.get('visited');

  if (!current) {
    const start = state.get('start');
    frontier = frontier.add(start);
    visited = visited.add(start);
  }

  if (!frontier.isEmpty()) {
    current = frontier.first();
    frontier = frontier.remove(current).merge(visitableNeighbors(current, state));
    visited = visited.add(current);
  }

  return state.merge({
    frontier,
    current,
    visited
  });
}

export function stepAnimationForward (state) {
  return breadthFirstSearch(state);
}

export default function reducer (state = Map(), action) {
  switch (action.type) {
  case 'RESET_ANIMATION':
    return resetAnimation(state, action);
  case 'START_ANIMATION':
    return startAnimation(state, action);
  case 'PAUSE_ANIMATION':
    return pauseAnimation(state, action);
  case 'STEP_ANIMATION_FORWARD':
    return stepAnimationForward(state, action);
  case 'TOGGLE_CELL':
    return toggleCell(state, action);
  default:
    return state;
  }
}

