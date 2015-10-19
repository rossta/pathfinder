import React from 'react';
import {List, OrderedSet, Set} from 'immutable';

import Cell from 'components/Cell';

import 'styles/grid.scss';

export default class Grid extends React.Component {
  static propTypes = {
    grid:       React.PropTypes.instanceOf(List),
    toggleCell: React.PropTypes.func,
    start:      React.PropTypes.instanceOf(List),
    visited:    React.PropTypes.instanceOf(OrderedSet),
    frontier:   React.PropTypes.instanceOf(OrderedSet),
    walls:      React.PropTypes.instanceOf(Set)
  }

  constructor () {
    super();
  }

  render () {
    const {grid, toggleCell, visited, frontier, start, walls} = this.props;

    return (
      <div className="grid-container">
      <div className="grid">
        {grid.map(coords => {
          const [row, col] = coords.toJS();
          return (
            <Cell
              toggleCell={toggleCell}
              col={col}
              row={row}
              isStart={start.equals(coords)}
              isWall={walls.includes(coords)}
              onFrontier={frontier.includes(coords)}
              wasVisited={visited.includes(coords)}
              key={`cell-${row}-${col}`} />
          );
        })}
      </div>
      </div>
    );
  }
}
