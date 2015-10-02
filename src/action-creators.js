export function resetAnimation () {
  return {
    type: 'RESET_ANIMATION'
  };
}

export function stopAnimation () {
  return {
    type: 'STOP_ANIMATION'
  };
}

export function startAnimation (interval) {
  return {
    type : 'START_ANIMATION',
    interval
  };
}

export function stepAnimationForward () {
  return {
    type: 'STEP_ANIMATION_FORWARD'
  };
}

export function animate() {
  return function toggleInterval (dispatch, getState) {
    let interval = getState().getIn(['animate', 'interval']);
    if (interval) {
      clearInterval(interval);
      dispatch(stopAnimation());
    } else {
      // interval = setInterval(function dispatchStep () {
      //   dispatch(stepAnimationForward());
      // }, 1000);
      dispatch(startAnimation(interval));
      dispatch(stepAnimationForward());
    }
  };
}

export function toggleCell (coordinates, roles) {
  return {
    type : 'TOGGLE_CELL',
    coordinates,
    roles
  };
}
