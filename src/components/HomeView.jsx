import React       from 'react';
import AnimationContainer from 'components/AnimationContainer';
import Grid from 'components/Grid';

export default class HomeView extends React.Component {
  constructor () {
    super();
  }

  render () {
    return (
      <div className='container text-center'>
        <h1>Pathfinders in React</h1>
        <h2>Visualizing graph search</h2>
        <AnimationContainer {...this.props}>
          <Grid />
        </AnimationContainer>
      </div>
    );
  }
}
