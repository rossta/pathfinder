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

// Example thunk
// export function animate() {
//   return function (dispatch, getState) {
//     let interval = getState().getIn(['animation', 'interval']);
//     if (interval) {
//       clearInterval(interval);
//       dispatch(stopAnimation());
//     } else {
//       const interval = setInterval(function() {
//         dispatch(stepAnimationForward());
//       }, 1000);
//       dispatch(startAnimation(interval));
//       dispatch(stepAnimationForward());
//     }
//   }
// }
