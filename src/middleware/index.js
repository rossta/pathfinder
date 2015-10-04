const logger = store => next => action => {
  console.log('dispatching', action);

  if (action.type === 'PRINT_GRID') {
    console.log('walls', ...store.getState().get('walls').map(cell => cell.toJS()));
  }

  const result = next(action);
  console.log('next state', store.getState());
  return result;
};

export {
  logger
};
