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
  return stopAnimation(state, action).set('frontier', start);
}

function collectFrontier(state) {
}

export function stepAnimationForward (state, action) {
  const fcoord = state.get('frontier');
  const grid   = state.get('grid');

  let head = grid.getIn(fcoord);
  if (head) {
    let neighbors = [];
    let next = fcoord;
    let [row,col] = next.toJS();
    neighbors.push([row-1, col]);
    neighbors.push([row, col-1]);
    neighbors.push([row+1, col]);
    neighbors.push([row, col+1]);

    neighbors.filter((coord) => {
      return grid.getIn([...coord, 'role']) === 'empty'
    }).forEach((neigh) => {
      state = state.setIn(['grid', ...next, 'frontier'], neigh);
      state = state.setIn(['grid', ...neigh, 'frontier'], '@@TAIL');
      next = neigh;
    });
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

