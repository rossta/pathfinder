import React from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';

import 'styles/grid.scss';

function fillArray(n, callback) {
  const arr = Array.apply(null, Array(n));
  return arr.map(callback);
}

function emptyGrid(rows, cols) {
  return List(fillArray(rows, () => List(fillArray(cols, () => 0))));
}

const initialGrid = emptyGrid(21, 35);

const mapStateToProps = (state) => ({
  grid: state.get('grid', initialGrid)
});

export default class Grid extends React.Component {
  static propTypes = {
    grid: React.PropTypes.instanceOf(List)
  }

  constructor () {
    super();
  }

  render () {
    const grid = this.props.grid;

    return (
      <div className="grid-container">
        {grid.map((row, i) =>
         <div className="row" key={`row-${i}`}>
           {row.map((col, j) =>
            <div className="col" key={`col-${j}`}></div>
           )}
         </div>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(Grid);

