import React from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';

import * as actionCreators from '../action-creators';
import Row from 'components/Row';
import Cell from 'components/Cell';

import 'styles/grid.scss';

const mapStateToProps = (state) => ({
  grid: state.get('grid')
});

export default class Grid extends React.Component {
  static propTypes = {
    grid: React.PropTypes.instanceOf(List),
    toggleCell:  React.PropTypes.func
  }

  constructor () {
    super();
  }

  render () {
    const {grid, toggleCell} = this.props;

    return (
      <div className="grid-container">
        {grid.map((cells, row) => {
          return (
            <Row toggleCell={this.props.toggleCell} index={row} key={`row-${row}`}>
              {cells.map((role, col) => {
                return (
                  <Cell
                    toggleCell={toggleCell}
                    col={col}
                    row={row}
                    role={role}
                    key={`cell-${row}-${col}`} />
                );
              })}
            </Row>
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

