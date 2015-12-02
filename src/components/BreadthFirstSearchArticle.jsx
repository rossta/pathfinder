import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

import BreadthFirstSearch from 'components/BreadthFirstSearch';

const BFSAnimation = 'BFSAnimation';
const BFSStepper = 'BFSStepper';

const mapStateToPropsFactory = (stateKey) => {
  return (state) => ({
    interval:  state.getIn([stateKey, 'interval']),
    frontier:  state.getIn([stateKey, 'frontier']),
    grid:      state.getIn([stateKey, 'grid']),
    start:     state.getIn([stateKey, 'start']),
    visited:   state.getIn([stateKey, 'visited']),
    walls:     state.getIn([stateKey, 'walls'])
  });
};

const BreadthFirstSearchAnimation = connect(
  mapStateToPropsFactory(BFSAnimation),
  actions
)(BreadthFirstSearch);

const BreadthFirstSearchStepper = connect(
  mapStateToPropsFactory(BFSStepper),
  actions,
)(BreadthFirstSearch);

export default class BreadthFirstSearchArticle extends React.Component {
  constructor () {
    super();
  }

  render () {
    return (
      <div className='breadth-first-search'>
        <h2>Visualizing breadth first search</h2>
        <BreadthFirstSearchAnimation name={BFSAnimation} />
        <h2>Breadth first search upclose</h2>
        <BreadthFirstSearchStepper name={BFSStepper} />
      </div>
    );
  }
}
