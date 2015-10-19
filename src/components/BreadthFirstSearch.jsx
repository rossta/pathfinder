import React from 'react';
import { connect } from 'react-redux';
import {Map, List, OrderedSet} from 'immutable';

import * as actions from '../actions';

import AnimationContainer from 'components/AnimationContainer';
import Grid from 'components/Grid';

const BFS = 'BFS';

const mapStateToProps = (state) => ({
  interval:  state.getIn([BFS, 'interval']),
  frontier:  state.getIn([BFS, 'frontier']),
  grid:      state.getIn([BFS, 'grid']),
  start:     state.getIn([BFS, 'start']),
  visited:   state.getIn([BFS, 'visited']),
  walls:     state.getIn([BFS, 'walls'])
});

export class BreadthFirstSearch extends React.Component {
  static propTypes = {
    animation: React.PropTypes.instanceOf(Map),
    children:  React.PropTypes.element,
    dispatch:  React.PropTypes.func,
    grid:      React.PropTypes.instanceOf(List),
    visited:   React.PropTypes.instanceOf(OrderedSet),
    interval:  React.PropTypes.number
  }

  constructor () {
    super();
  }

  render () {
    const animation = {
      max: this.props.grid.count(),
      current: this.props.visited.count(),
      interval: this.props.interval,
      name: BFS
    };

    return (
      <div className='breadth-first-search'>
        <h2>Visualizing breadth first search</h2>
        <AnimationContainer {...animation}>
          <Grid {...this.props} />
        </AnimationContainer>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(BreadthFirstSearch);
