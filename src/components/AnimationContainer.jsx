import React from 'react';
import { connect } from 'react-redux';
import { stepAnimationForward, resetAnimation, startAnimation, pauseAnimation, printGrid } from '../action-creators';

const mapStateToProps = (state) => ({
  animation: state.get('animation')
});

export class AnimationContainer extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    children: React.PropTypes.element
  }

  constructor () {
    super();
  }

  onClickStart () {
    return this.start();
  }

  onClickPause () {
    return this.pause();
  }

  onClickStepForward () {
    return this.stepForward();
  }

  onClickReset () {
    return this.reset();
  }

  onClickPrintGrid () {
    return this.props.dispatch(printGrid());
  }

  start() {
    return this.props.dispatch(startAnimation());
  }

  pause () {
    return this.props.dispatch(pauseAnimation());
  }

  reset () {
    return this.props.dispatch(resetAnimation());
  }

  stepForward () {
    return this.props.dispatch(stepAnimationForward());
  }

  isAnimating () {
    return !!this.props.animation.get('breadthFirstSearch');
  }

  componentDidMount () {
    console.log('componentDidMount AnimationContainer');
  }

  renderAnimateButton () {
    if (this.isAnimating()) {
      return (<button
        className='btn btn-default'
        onClick={::this.onClickPause}>
        Pause
      </button>);
    } else {
      return (<button
        className='btn btn-default'
        onClick={::this.onClickStart}>
        Start
      </button>);
    }
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
        <button className='btn btn-default'
          onClick={::this.onClickPrintGrid}>
          Print Grid
        </button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(AnimationContainer);
