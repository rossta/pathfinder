import React from 'react';
import {List,OrderedSet} from 'immutable';
import {connect} from 'react-redux';
import _ from 'lodash';

import * as actionCreators from '../action-creators';
import Row from 'components/Row';
import Cell from 'components/Cell';

import 'styles/grid.scss';

const mapStateToProps = (state) => ({
  grid:     state.get('grid'),
  start:    state.get('start'),
  visited:  state.get('visited'),
  frontierX: state.get('frontierX'),
  walls:    state.get('walls'),
  start:    state.get('start')
});

export default class Grid extends React.Component {
  static propTypes = {
    grid: React.PropTypes.instanceOf(List),
    toggleCell:  React.PropTypes.func,
    start:    React.PropTypes.instanceOf(List),
    visited:  React.PropTypes.instanceOf(OrderedSet),
    frontierX: React.PropTypes.instanceOf(OrderedSet),
    walls:    React.PropTypes.instanceOf(OrderedSet)
  }

  constructor () {
    super();
  }

  cellRole (coords) {
    const { start, walls } = this.props;
    if (walls.includes(coords)) {
      return 'wall';
    }
    if (start.equals(coords)) {
      return 'start';
    }
    return 'empty';
  }

  render () {
    const {grid, toggleCell, visited, frontierX} = this.props;

    return (
      <div className="grid-container">
        {grid.map(coords => {
          const [row, col] = coords.toJS();
          return (
            <Cell
              toggleCell={toggleCell}
              col={col}
              row={row}
              role={this.cellRole(coords)}
              frontier={frontierX.includes(coords)}
              visited={visited.includes(coords)}
              key={`cell-${row}-${col}`} />
          );
        })}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  actionCreators
)(Grid);

