import React       from 'react';
import BreadthFirstSearch from 'components/BreadthFirstSearch';

export default class HomeView extends React.Component {
  constructor () {
    super();
  }

  render () {
    return (
      <div className='container text-center'>
        <h1>Pathfinders in React</h1>
        <h2>Visualizing graph search</h2>
        <BreadthFirstSearch />
      </div>
    );
  }
}
