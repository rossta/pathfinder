import React from 'react';
import { Link } from 'react-router';

export default class HomeView extends React.Component {
  static propTypes = {
    children: React.PropTypes.element
  }

  constructor () {
    super();
  }

  render () {
    return (
      <div className='container text-center'>
        <h1>Pathfinders in React</h1>

        <div className='sidebar'>
          <ul>
            <li><Link to="/">1. Breadth first search</Link></li>
            <li><Link to="/path-reconstruction">2. Path reconstruction</Link></li>
            <li><Link to="/dijkstras-algorithm">3. Dijkstra</Link></li>
          </ul>
        </div>

        <div className='article'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
