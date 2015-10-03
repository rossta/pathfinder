const logger = store => next => action => {
  console.log('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  return result;
};

const animation = store => next => action => {
};

export {
  animation,
  logger
};