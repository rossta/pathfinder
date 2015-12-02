import React from 'react';
import {Map, List, OrderedSet} from 'immutable';

import AnimationContainer from 'components/AnimationContainer';
import Grid from 'components/Grid';

export default class BreadthFirstSearch extends React.Component {
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
      name: this.props.name
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
