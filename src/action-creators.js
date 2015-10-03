export function resetAnimation () {
  return {
    type: 'RESET_ANIMATION'
  };
}

export function pauseAnimation () {
  return {
    type: 'PAUSE_ANIMATION'
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

export function toggleCell (coordinates, roles) {
  return {
    type : 'TOGGLE_CELL',
    coordinates,
    roles
  };
}
