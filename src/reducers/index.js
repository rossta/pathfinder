import {Map, List, OrderedSet} from 'immutable';
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

export function stepAnimationForwardGrid (state, action) {
  const head = state.get('frontier');
  const grid = state.get('grid');

  if (grid.getIn(head)) {
    let neighbors = [];
    let tail, next;
    tail = head;
    next = state.getIn(['grid', ...tail, 'frontier']);

    console.log("frontier");
    console.log("head", head.toJS());

    while (next !== '@@TAIL') {
      tail = next;
      console.log("next", tail.toJS());
      next = state.getIn(['grid', ...tail, 'frontier']);
    }
    console.log("tail", tail.toJS());

    let [row,col] = head;
    neighbors.push(List([row-1, col]));
    neighbors.push(List([row, col-1]));
    neighbors.push(List([row+1, col]));
    neighbors.push(List([row, col+1]));

    neighbors.filter((coord) => {
      let [row,col] = coord;
      return (row < ROWS && row >= 0 && col < COLS && col >= 0);
    }).filter((coord) => {
      let cell = grid.getIn(coord);
      return cell.get('role') === 'empty' &&
        !cell.get('frontier') &&
        !cell.get('visited');
    }).forEach((neigh) => {
      state = state.setIn(['grid', ...tail, 'frontier'], neigh);
      state = state.setIn(['grid', ...neigh, 'frontier'], '@@TAIL');
      tail  = neigh;
      console.log("frontier", neigh.toJS());
    });

    next = state.getIn(['grid', ...head, 'frontier']);
    state = state.setIn(['grid', ...head, 'visited'], true);
    state = state.set('frontier', next);
  }
  return state;
}

function neighbors (coords) {
  let [row,col] = coords;
  let neighbors = [];
  neighbors.push(List([row-1, col]));
  neighbors.push(List([row, col-1]));
  neighbors.push(List([row+1, col]));
  neighbors.push(List([row, col+1]));

  return OrderedSet(neighbors.filter((coord) => {
    let [row,col] = coord;
    return (row < ROWS && row >= 0 && col < COLS && col >= 0);
  }));
}

export function stepAnimationForward (state, action) {
  let current = state.get('current');
  let frontier = state.get('frontierX');
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
    frontierX: frontier,
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

