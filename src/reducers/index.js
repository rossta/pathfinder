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

export default function reducer(state = Map(), action) {
  switch (action.type) {
  case 'START_ANIMATION':
  case 'STOP_ANIMATION':
    return animate(state, action);
  default:
    return state;
  }
}

