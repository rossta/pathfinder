import React from 'react';
import { connect } from 'react-redux';
import {startAnimation, stopAnimation} from '../action-creators';

import Grid from 'components/Grid';

const mapStateToProps = (state) => ({
  animating: state.getIn(['animate', 'animating'])
});

function animate() {
  return function (dispatch, getState) {
    let interval = getState().getIn(['animate', 'animating']);
    if (interval) {
      clearInterval(interval);
      dispatch(stopAnimation());
    } else {
      const interval = setInterval(function() {
        console.log('step');
      }, 1000);
      dispatch(startAnimation(interval));
    }
  }
}

export class AnimationContainer extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    interval: React.PropTypes.number
  }

  constructor () {
    super();
  }

  // normally you'd import an action creator, but I don't want to create
  // a file that you're just going to delete anyways!
  onClickButton () {
    this.props.dispatch(animate());
  }

  isAnimating () {
    return !!this.props.interval;
  }

  buttonText () {
    return this.isAnimating() ? 'Pause' : 'Start';
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
  mapStateToProps
)(AnimationContainer);
