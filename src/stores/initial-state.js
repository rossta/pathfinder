import {Map} from 'immutable';
import bfs from 'stores/bfs';

export default function initialState() {
  return Map({
    BFS: bfs()
  });
}
