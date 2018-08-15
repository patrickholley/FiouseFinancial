import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import RouterWrapper from './RouterWrapper';
import reducers from './reducers';
import watcherSaga from './actions/watcherSaga';

/* eslint-disable react/prefer-stateless-function */
export default class App extends React.Component {
  render() {
    console.disableYellowBox = true;

    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(reducers, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(watcherSaga);

    return (
      <Provider store={store}>
        <RouterWrapper />
      </Provider>
    );
  }
}
