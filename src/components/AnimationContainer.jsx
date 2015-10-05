import React from 'react';
import {Map, List} from 'immutable';
import { connect } from 'react-redux';
import {
  stepAnimationForward,
  stepAnimationBack,
  resetAnimation,
  startAnimation,
  pauseAnimation,
  printGrid } from '../action-creators';

import times from 'lodash/utility/times';

const mapStateToProps = (state) => ({
  animation: state.get('animation'),
  grid: state.get('grid'),
  visited: state.get('visited')
});

export class AnimationContainer extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    children: React.PropTypes.element,
    animation: React.PropTypes.instanceOf(Map),
    grid: React.PropTypes.instanceOf(List),
    visited: React.PropTypes.instanceOf(List)
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

  onClickStepBack () {
    return this.stepBack();
  }

  onClickReset () {
    return this.reset();
  }

  onClickPrintGrid () {
    return this.props.dispatch(printGrid());
  }

  onChangeSlider (e) {
    const value = e.target.valueAsNumber;
    const diff = value - this.props.visited.count();
    let stepFunction;

    if (diff === 0) { return false; }

    if (diff > 0) {
      stepFunction = this.stepForward;
    } else {
      stepFunction = this.stepBack;
    }
    times(Math.abs(diff), stepFunction.bind(this));
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

  stepBack () {
    return this.props.dispatch(stepAnimationBack());
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
    const maxSteps = this.props.grid.count();
    const currentStep = this.props.visited.count();
    return (
      <div className="animation">
        {this.props.children}
        <button className='btn btn-default'
          onClick={::this.onClickStepBack}>
          &lt;
        </button>
        {::this.renderAnimateButton()}
        <button className='btn btn-default'
          onClick={::this.onClickReset}>
          Reset
        </button>
        <button className='btn btn-default'
          onClick={::this.onClickStepForward}>
          &gt;
        </button>
        <br />
        <input type="range"
          className="range-input"
          onChange={::this.onChangeSlider}
          value={currentStep}
          min="0"
          max={maxSteps}
          step="1" />
        {currentStep}
        <br />
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
