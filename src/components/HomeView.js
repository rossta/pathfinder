import React       from 'react';
import AnimationContainer from 'components/AnimationContainer';

// We define mapStateToProps where we'd normally use the @connect
// decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html

export default class HomeView extends React.Component {
  constructor () {
    super();
  }

  render () {
    return (
      <div className='container text-center'>
        <h1>Pathfinders in React</h1>
        <h2>Visualizing graph search</h2>
        <AnimationContainer {...this.props} />
      </div>
    );
  }
}
