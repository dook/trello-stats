import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';

import configureStore from 'base/redux/configureStore';
import Root from 'base/containers/Root';

import * as serviceWorker from './serviceWorker';

const history = createBrowserHistory();
const store = configureStore(history);

ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
