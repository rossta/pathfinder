import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

import Grid from 'components/Grid';

const mapStateToProps = (state) => ({
  animating: state.getIn(['animate', 'animating'])
});

export class AnimationContainer extends React.Component {
  static propTypes = {
    stopAnimation:  React.PropTypes.func,
    startAnimation: React.PropTypes.func,
    animating:      React.PropTypes.bool
  }

  constructor () {
    super();
  }

  // normally you'd import an action creator, but I don't want to create
  // a file that you're just going to delete anyways!
  onClickButton () {
    if (this.props.animating) {
      this.props.stopAnimation();
    } else {
      this.props.startAnimation();
    }
  }

  buttonText () {
    return this.props.animating ? 'Pause' : 'Start';
  }

  render () {
    return (
      <div>
        <Grid />
        <button className='btn btn-default'
          onClick={::this.onClickButton}>
          {this.buttonText()}
        </button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  actionCreators
)(AnimationContainer);
