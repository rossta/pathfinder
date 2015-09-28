import { Route }   from 'react-router';
import React       from 'react';
import CoreLayout  from 'components/CoreLayout';
import HomeView    from 'components/HomeView';

export default (
  <Route component={CoreLayout}>
    <Route name='home' path='/' component={HomeView} />
  </Route>
);
