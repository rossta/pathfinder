import React from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';

import * as actionCreators from '../action-creators';
import Row from 'components/Row';

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
    const grid = this.props.grid;

    return (
      <div className="grid-container">
        {grid.map((cells, i) => {
          return <Row toggleCell={this.props.toggleCell} number={i} cells={cells} key={`row-${i}`} />;
        })}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  actionCreators
)(Grid);

