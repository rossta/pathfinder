export function stopAnimation() {
  return {
    type: 'STOP_ANIMATION'
  };
}

export function startAnimation(interval) {
  return {
    type : 'START_ANIMATION',
    interval
  };
}

export function toggleCell(coordinates, roles) {
  return {
    type : 'TOGGLE_CELL',
    coordinates,
    roles
  };
}
