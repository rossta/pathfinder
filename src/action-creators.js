export function pauseAnimation () {
  return (dispatch, getState) => {
    const interval = getState().getIn(['animation', 'breadthFirstSearch']);
    if (interval) {
      clearInterval(interval);
    }
    dispatch({
      type: 'PAUSE_ANIMATION'
    });
  };
}

export function stepAnimationForward () {
  return (dispatch, getState) => {
    const state = getState();
    if (state.get('current') && state.get('frontier').isEmpty()) {
      dispatch(pauseAnimation());
    } else {
      dispatch({
        type: 'STEP_ANIMATION_FORWARD'
      });
    }
  };
}

export function stepAnimationBack () {
  return (dispatch, getState) => {
    const state = getState();
    if (!state.get('frontier').isEmpty()) {
      dispatch({
        type: 'STEP_ANIMATION_BACK'
      });
    }
  };
}

export function startAnimation () {
  return (dispatch) => {
    dispatch(pauseAnimation());

    const interval = setInterval(() => {
      dispatch(stepAnimationForward());
    });

    dispatch({
      type : 'START_ANIMATION',
      interval
    });

    dispatch(stepAnimationForward());
  };
}

export function resetAnimation () {
  return (dispatch) => {
    dispatch(pauseAnimation());

    dispatch({
      type: 'RESET_ANIMATION'
    });
  };
}

export function toggleCell (coordinates) {
  return {
    type : 'TOGGLE_CELL',
    coordinates
  };
}

export function printGrid () {
  return {
    type : 'PRINT_GRID'
  };
}
