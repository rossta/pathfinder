import React from 'react';
import {List} from 'immutable';

import Cell from 'components/Cell';

export default class Row extends React.Component {
  static propTypes = {
    cells: React.PropTypes.instanceOf(List),
    number: React.PropTypes.number,
    toggleCell:  React.PropTypes.func
  }

  constructor () {
    super();
  }

  render () {
    const {number, cells} = this.props;
    return (
      <div className="row">
        {cells.map((role, col) => {
          const coordinates = [number, col];
          return (<Cell
            toggleCell={this.props.toggleCell}
            coordinates={coordinates}
            role={role}
            key={`col-${col}`} />);
        })}
      </div>
    );
  }
}
