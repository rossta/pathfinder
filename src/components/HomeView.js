import React       from 'react';
import { connect } from 'react-redux';
import BreadthFirstSearchContainer from 'components/BreadthFirstSearchContainer';

// We define mapStateToProps where we'd normally use the @connect
// decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  animating: state.getIn(['animate', 'animating'])
});

export class HomeView extends React.Component {
  static propTypes = {
    dispatch : React.PropTypes.func,
    animating: React.PropTypes.bool
  }

  constructor () {
    super();
  }

  render () {
    return (
      <div className='container text-center'>
        <h1>Pathfinders in React</h1>
        <h2>Visualizing graph search</h2>
        <BreadthFirstSearchContainer {...this.props} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(HomeView);
