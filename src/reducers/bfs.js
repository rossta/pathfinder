import {Map, List, OrderedSet, Set} from 'immutable';

import {ROWS, COLS, DEFAULT_WALLS} from 'stores/bfs';
import bfsState from 'stores/bfs';

function startAnimation(state, action) {
  return state.set('interval', action.interval);
}

function pauseAnimation(state) {
  return state.set('interval', null);
}

function toggleCell(state, action) {
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

function resetAnimation(state) {
  return state.remove('current').merge(bfsState());
}

function neighbors(coords) {
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

function breadthFirstSearchStepForward(state) {
  let current  = state.get('current');
  let frontier = state.get('frontier');
  let visited  = state.get('visited');
  let history  = state.get('history');

  if (!current) {
    const start = state.get('start');
    frontier    = frontier.add(start);
    visited     = visited.add(start);
  }

  const frontierHistory = history.get('frontier', List());
  const visitedHistory = history.get('visited', List());

  history = history.merge({
    frontier: frontierHistory.push(frontier),
    visited: visitedHistory.push(visited)
  });

  if (!frontier.isEmpty()) {
    current  = frontier.first();
    frontier = frontier.remove(current).merge(visitableNeighbors(current, state));
    visited  = visited.add(current);
  }

  return state.merge({
    current,
    frontier,
    visited,
    history
  });
}

function breadthFirstSearchStepBack(state) {
  if (!state.get('current') || state.get('current').equals(state.get('start'))) {
    return state;
  }

  const current         = state.get('visited').last();
  let history           = state.get('history');

  const frontierHistory = history.get('frontier');
  const visitedHistory  = history.get('visited');

  const frontier        = frontierHistory.last();
  const visited         = visitedHistory.last();

  history = history.merge({
    frontier: frontierHistory.pop(),
    visited: visitedHistory.pop()
  });

  return state.merge({
    current,
    frontier,
    visited,
    history
  });
}

function stepAnimationBack(state) {
  return breadthFirstSearchStepBack(state);
}

function stepAnimationForward(state) {
  return breadthFirstSearchStepForward(state);
}

export default function reducer(state = Map(), action) {
  switch (action.type) {
  case 'RESET_ANIMATION':
    return resetAnimation(state, action);
  case 'START_ANIMATION':
    return startAnimation(state, action);
  case 'PAUSE_ANIMATION':
    return pauseAnimation(state, action);
  case 'STEP_ANIMATION_FORWARD':
    return stepAnimationForward(state, action);
  case 'STEP_ANIMATION_BACK':
    return stepAnimationBack(state, action);
  case 'TOGGLE_CELL':
    return toggleCell(state, action);
  default:
    return state;
  }
}
