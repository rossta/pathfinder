import React from 'react';
import { connect } from 'react-redux';
import { animate } from '../action-creators';

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
      <div className="animation">
        {this.props.children}
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
