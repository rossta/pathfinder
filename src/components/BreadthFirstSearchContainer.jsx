import React       from 'react';

export default class BreadthFirstSearchContainer extends React.Component {
  static propTypes = {
    dispatch : React.PropTypes.func,
    counter  : React.PropTypes.number,
    animating: React.PropTypes.bool
  }

  constructor () {
    super();
  }

  // normally you'd import an action creator, but I don't want to create
  // a file that you're just going to delete anyways!
  onClickButton () {
    if (this.props.animating) {
      this.props.dispatch({ type : 'STOP_ANIMATION' });
    } else {
      this.props.dispatch({ type : 'START_ANIMATION' });
    }
  }

  buttonText () {
    return this.props.animating ? 'Pause' : 'Start';
  }

  render () {
    return (
      <button className='btn btn-default'
        onClick={::this.onClickButton}>
        {this.buttonText()}
      </button>
    );
  }
}

