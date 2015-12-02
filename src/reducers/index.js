import bfs from 'reducers/bfs';

const BFSAnimation = 'BFSAnimation';
const BFSStepper = 'BFSStepper';

export default function reducer(state = Map(), action) {
  return state.merge({
    [BFSAnimation]: bfs(state.get(BFSAnimation), action),
    [BFSStepper]: bfs(state.get(BFSStepper), action)
  });
}
