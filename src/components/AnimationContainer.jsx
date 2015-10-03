import React from 'react';
import { connect } from 'react-redux';
import { stepAnimationForward, resetAnimation, startAnimation, pauseAnimation } from '../action-creators';

export class AnimationContainer extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    children: React.PropTypes.element
  }

  constructor () {
    super();
    this.state = { interva: null };
  }

  onClickStart () {
    this.start();
  }

  onClickPause () {
    this.pause();
  }

  onClickStepForward () {
    this.stepForward();
  }

  onClickReset () {
    this.reset();
  }

  start() {
    const dispatch = this.props.dispatch;
    dispatch(pauseAnimation());
    dispatch(startAnimation());
    dispatch(stepAnimationForward());
    const interval = setInterval(() => {
      dispatch(stepAnimationForward());
    });
    this.setState({ interval });
  }

  pause () {
    if (this.isAnimating()) {
      clearInterval(this.state.interval);
      this.setState({ interval: null });
      return this.props.dispatch(pauseAnimation());
    }
  }

  reset () {
    this.pause();
    return this.props.dispatch(resetAnimation());
  }

  stepForward () {
    return this.props.dispatch(stepAnimationForward());
  }

  isAnimating () {
    console.log('props', this.props);
    return !!this.state.interval;
  }

  renderAnimateButton () {
    let button;
    if (this.isAnimating()) {
      button = (<button
        className='btn btn-default'
        onClick={::this.onClickPause}>
        Pause
      </button>);
    } else {
      button = (<button
        className='btn btn-default'
        onClick={::this.onClickStart}>
        Start
      </button>);
    }
    return button;
  }

  render () {
    return (
      <div className="animation">
        {this.props.children}
        {::this.renderAnimateButton()}
        <button className='btn btn-default'
          onClick={::this.onClickStepForward}>
          Step forward >
        </button>
        <button className='btn btn-default'
          onClick={::this.onClickReset}>
          Reset
        </button>
      </div>
    );
  }
}

export default connect()(AnimationContainer);
