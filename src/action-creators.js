export function resetAnimation () {
  return (dispatch, getState) => {
    dispatch(pauseAnimation());

    dispatch({
      type: 'RESET_ANIMATION'
    });
  };
}

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

export function startAnimation (interval) {
  return (dispatch, getState) => {
    dispatch(pauseAnimation());

    const interval = setInterval(function() {
      dispatch(stepAnimationForward());
    });

    dispatch({
      type : 'START_ANIMATION',
      interval
    });

    dispatch(stepAnimationForward());
  }
}

export function stepAnimationForward () {
  return function (dispatch, getState) {
    const state = getState();
    if (state.get('current') && state.get('frontier').isEmpty()) {
      dispatch(pauseAnimation());
    } else {
      dispatch({
        type: 'STEP_ANIMATION_FORWARD'
      });
    }
  }
}

export function stepAnimationBack () {
  return function (dispatch, getState) {
    const state = getState();
    if (!state.get('frontier').isEmpty()) {
      dispatch({
        type: 'STEP_ANIMATION_BACK'
      });
    }
  }
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
