import {Map,List} from 'immutable';
// import { combineReducers } from 'redux';

import {ROWS, COLS} from 'stores/initial-state';

export function startAnimation (state, action) {
  return state.setIn(['animate', 'interval'], action.interval);
}

export function stopAnimation (state) {
  return state.deleteIn(['animate', 'interval']);
}

export function toggleCell (state, action) {
  const [row, col] = action.coordinates;
  const [role1, role2] = action.roles;
  const role = state.getIn(['grid', row, col, 'role']);
  return state.setIn(['grid', row, col, 'role'], (role === role1 ? role2 : role1));
}

export function resetAnimation(state, action) {
  const start = state.get('startCoordinates');
  return stopAnimation(state, action).set('frontier', start).setIn(['grid', ...start, 'frontier'], '@@TAIL');
}

export function stepAnimationForward (state, action) {
  const head = state.get('frontier');
  const grid = state.get('grid');

  if (grid.getIn(head)) {
    let neighbors = [];
    let tail, next;
    tail = head;
    next = state.getIn(['grid', ...tail, 'frontier']);
    while (next !== '@@TAIL') {
      tail = next;
      next = state.getIn(['grid', ...tail, 'frontier']);
    }
    tail = next;

    let [row,col] = head;
    neighbors.push([row-1, col]);
    neighbors.push([row, col-1]);
    neighbors.push([row+1, col]);
    neighbors.push([row, col+1]);

    neighbors.filter((coord) => {
      let cell = grid.getIn(coord);
      let [row,col] = coord;
      return cell.get('role') === 'empty' &&
        (row < ROWS && row >= 0 && col < COLS && col >= 0) &&
        !(cell.getIn(['data', 'frontier']) || cell.getIn(['data', 'visited']));
    }).forEach((neigh) => {
      state = state.setIn(['grid', ...tail, 'frontier'], neigh);
      state = state.setIn(['grid', ...neigh, 'frontier'], '@@TAIL');
      tail = neigh;
    });

    next = state.getIn(['grid', ...head, 'frontier']);
    state = state.setIn(['grid', ...head, 'visited'], true);
    state = state.set('frontier', state.getIn(['grid', ...next, 'frontier']));
  }
  return state;
}

export default function reducer (state = Map(), action) {
  switch (action.type) {
  case 'RESET_ANIMATION':
    return resetAnimation(state, action);
  case 'START_ANIMATION':
    return startAnimation(state, action);
  case 'STOP_ANIMATION':
    return stopAnimation(state, action);
  case 'STEP_ANIMATION_FORWARD':
    return stepAnimationForward(state, action);
  case 'TOGGLE_CELL':
    return toggleCell(state, action);
  default:
    return state;
  }
}

