import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'components/Root';
import configureStore from './stores';
// import createBrowserHistory from 'history/lib/createBrowserHistory';

import initialState from './stores/initial-state';
import { resetAnimation } from './actions';

const target = document.getElementById('root');
const store  = configureStore(initialState());

store.dispatch(resetAnimation('BFSAnimation'));
store.dispatch(resetAnimation('BFSStepper'));

// const node = <Root routerHistory={createBrowserHistory()} store={store}/>;
const node = <Root store={store}/>;
ReactDOM.render(node, target);
