export function pauseAnimation(name) {
  return (dispatch, getState) => {
    const interval = getState().getIn([name, 'interval']);
    if (interval) {
      clearInterval(interval);
    }
    dispatch({
      type: 'PAUSE_ANIMATION',
      name
    });
  };
}

export function stepAnimationForward(name) {
  return (dispatch, getState) => {
    const state = getState().get(name);
    if (state.get('current') && state.get('frontier').isEmpty()) {
      dispatch(pauseAnimation(name));
    } else {
      dispatch({
        type: 'STEP_ANIMATION_FORWARD',
        name
      });
    }
  };
}

export function stepAnimationBack(name) {
  return (dispatch, getState) => {
    if (!getState().getIn([name, 'frontier']).isEmpty()) {
      dispatch({
        type: 'STEP_ANIMATION_BACK',
        name
      });
    }
  };
}

export function startAnimation(name) {
  return (dispatch) => {
    dispatch(pauseAnimation(name));

    const interval = setInterval(() => {
      dispatch(stepAnimationForward(name));
    });

    dispatch({
      type: 'START_ANIMATION',
      interval,
      name
    });

    dispatch(stepAnimationForward(name));
  };
}

export function resetAnimation(name) {
  return (dispatch) => {
    dispatch(pauseAnimation(name));

    dispatch({
      type: 'RESET_ANIMATION',
      name
    });
  };
}

export function toggleCell(coordinates) {
  return {
    type: 'TOGGLE_CELL',
    coordinates
  };
}

export function printGrid() {
  return {
    type: 'PRINT_GRID'
  };
}
