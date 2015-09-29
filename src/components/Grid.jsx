import React from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
  grid: state.get('grid')
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
    console.log('grid', grid);
    return (
      <div className="grid-container">
        {grid.map((row, i) =>
                       <div className="row">
                         {row.map((col, j) =>
                                  <div className="col">[{i},{j}]</div>
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

