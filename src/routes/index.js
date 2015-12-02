import { Route, IndexRoute }   from 'react-router';
import React       from 'react';
import CoreLayout  from 'components/CoreLayout';
import HomeView    from 'components/HomeView';
import BreadthFirstSearchArticle from 'components/BreadthFirstSearchArticle';

export class Placeholder1 extends React.Component {
  render() {
    return <div>Placeholder 1</div>;
  }
}

export class Placeholder2 extends React.Component {
  render() {
    return <div>Placeholder 2</div>;
  }
}

export default (
  <Route component={CoreLayout}>
    <Route name='home' path='/' component={HomeView}>
      <IndexRoute component={BreadthFirstSearchArticle} />
      <Route path="path-reconstruction" component={Placeholder1} />
      <Route path="dijkstras-algorithm" component={Placeholder2} />
    </Route>
  </Route>
);
