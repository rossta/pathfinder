import bfs from 'reducers/bfs';

const BFS = 'BFS';

export default function reducer(state = Map(), action) {
  return state.merge({
    [BFS]: bfs(state.get(BFS), action)
  });
}
