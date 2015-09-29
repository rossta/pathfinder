import React from 'react';
import ReactDOM from 'react-dom';
import {Map} from 'immutable';
import Root from 'components/Root';
import configureStore from './stores';
import createBrowserHistory from 'history/lib/createBrowserHistory';

const target = document.getElementById('root');
const store  = configureStore(Map());

const node = <Root routerHistory={createBrowserHistory()} store={store}/>;
ReactDOM.render(node, target);
