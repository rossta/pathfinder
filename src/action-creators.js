export function stopAnimation() {
  return {
    type: 'STOP_ANIMATION'
  };
}

export function startAnimation() {
  return {
    type : 'START_ANIMATION'
  };
}

export function toggleCell(coordinates) {
  return {
    type : 'TOGGLE_CELL',
    coordinates
  };
}
