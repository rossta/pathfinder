import React from 'react';
import { connect } from 'react-redux';
import { animate, stepAnimationForward } from '../action-creators';

const mapStateToProps = (state) => ({
  interval: state.getIn(['animate', 'interval'])
});

export class AnimationContainer extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    interval: React.PropTypes.number,
    children: React.PropTypes.element
  }

  constructor () {
    super();
  }

  // normally you'd import an action creator, but I don't want to create
  // a file that you're just going to delete anyways!
  onClickAnimate () {
    this.props.dispatch(animate());
  }

  onClickStepForward () {
    this.props.dispatch(stepAnimationForward())
  }

  isAnimating () {
    return !!this.props.interval;
  }

  animateButtonText () {
    return this.isAnimating() ? 'Pause' : 'Start';
  }

  render () {
    const animateButtonText = this.isAnimating() ? 'Pause' : 'Start';
    return (
      <div className="animation">
        {this.props.children}
        <button className='btn btn-default'
          onClick={::this.onClickAnimate}>
          {animateButtonText}
        </button>
        <button className='btn btn-default'
          onClick={::this.onClickStepForward}>
          Step forward >
        </button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(AnimationContainer);
