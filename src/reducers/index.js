import {Map, List, OrderedSet} from 'immutable';
// import { combineReducers } from 'redux';

import {ROWS, COLS} from 'stores/initial-state';

export function startAnimation (state) {
  return state;
}

export function pauseAnimation (state) {
  return state;
}

export function toggleCell (state) {
  const [row, col] = action.coordinates;
  const [role1, role2] = action.roles;
  const role = state.getIn(['grid', row, col, 'role']);
  return state.setIn(['grid', row, col, 'role'], (role === role1 ? role2 : role1));
}

export function resetAnimation(state) {
  const visited  = OrderedSet();
  const frontier = OrderedSet();
  const walls    = OrderedSet();

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

export function stepAnimationForward (state) {
  let current = state.get('current');
  let frontier = state.get('frontier');
  let visited = state.get('visited');

  if (!current) {
    const start = state.get('start');
    frontier = frontier.add(start);
    visited = visited.add(start);
  }

  if (!frontier.isEmpty()) {
    current = frontier.first();
    frontier = frontier.remove(current).merge(neighbors(current).filter((coords) => {
      return !visited.includes(coords);
    }));
    visited = visited.add(current);
  }

  return state.merge({
    frontier,
    current,
    visited
  });
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

