import React from 'react';
import { connect } from 'react-redux';
import {Map, List, OrderedSet} from 'immutable';

import * as actions from '../actions';

import AnimationContainer from 'components/AnimationContainer';
import Grid from 'components/Grid';

const mapStateToProps = (state) => ({
  animation: state.get('animation'),
  frontier:  state.get('frontier'),
  grid:      state.get('grid'),
  start:     state.get('start'),
  visited:   state.get('visited'),
  walls:     state.get('walls'),

  breadthFirstSearch: state.get('breadthFirstSearch')
});

export class BreadthFirstSearch extends React.Component {
  static propTypes = {
    animation: React.PropTypes.instanceOf(Map),
    children: React.PropTypes.element,
    dispatch: React.PropTypes.func,
    grid: React.PropTypes.instanceOf(List),
    visited: React.PropTypes.instanceOf(OrderedSet)
  }

  constructor () {
    super();
  }

  render () {
    const animation = {
      max: this.props.grid.count(),
      current: this.props.visited.count(),
      interval: this.props.animation.get('breadthFirstSearch')
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
