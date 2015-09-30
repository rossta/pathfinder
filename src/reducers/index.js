import {Map} from 'immutable';
// import { combineReducers } from 'redux';

const START_ANIMATION = 'START_ANIMATION';
const STOP_ANIMATION  = 'STOP_ANIMATION';

export function animate (state, action) {
  switch (action.type) {
  case START_ANIMATION:
    return state.setIn(['animate', 'animating'], true);
  case STOP_ANIMATION:
    return state.setIn(['animate', 'animating'], false);
  default:
    return state;
  }
}

export default function toggleCell(state, action) {
  const [row, col] = action.coordinates;
  const [role1, role2] = action.roles;
  const role = state.getIn(['grid', row, col]);
  return state.setIn(['grid', row, col], (role === role1 ? role2 : role1));
}

export default function reducer(state = Map(), action) {
  switch (action.type) {
  case 'START_ANIMATION':
  case 'STOP_ANIMATION':
    return animate(state, action);
  case 'TOGGLE_CELL':
    return toggleCell(state, action);
  default:
    return state;
  }
}

