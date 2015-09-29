import React                from 'react';
import ReactDOM             from 'react-dom';
import Root                 from 'components/Root';
import configureStore       from './stores';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import initialState         from './stores/initial-state';

const target = document.getElementById('root');
const store  = configureStore(initialState);

const node = <Root routerHistory={createBrowserHistory()} store={store}/>;
ReactDOM.render(node, target);
