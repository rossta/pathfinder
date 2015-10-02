import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  frontier: state.get('frontier')
});

export class BreadthFirstSearch extends React.Component {
  static propTypes = {
    children : React.PropTypes.element
  }

  constructor () {
    super();
  }

  render () {
    return (
      <div className='breadth-first-search'>
        {this.props.children}
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(BreadthFirstSearch);
