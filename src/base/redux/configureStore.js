import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';

import { env } from 'config';
import rootSaga from './rootSaga';
import rootReducer from './rootReducer';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = !env.PRODUCTION ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

export default (history, initialState) => {
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history)
  ];

  if (!env.PRODUCTION) {
    const { createLogger } = require('redux-logger');
    const loggerMiddleware = createLogger({
      level: 'info',
      collapsed: true
    });
    middlewares.push(loggerMiddleware);
  }

  const store = createStore(
    rootReducer(history),
    initialState,
    composeEnhancers(...middlewares.map((m) => applyMiddleware(m)))
  );

  sagaMiddleware.run(rootSaga);

  return store;
};
