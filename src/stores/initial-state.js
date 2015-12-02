import {Map, Set} from 'immutable';
import bfs from 'stores/bfs';

const BFSAnimation = 'BFSAnimation';
const BFSStepper = 'BFSStepper';

export default function initialState() {
  return Map({
    [BFSAnimation]: bfs(),
    [BFSStepper]: bfs({rows: 4, cols: 6, walls: Set()}),
  });
}
