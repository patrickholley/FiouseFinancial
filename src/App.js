import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import RouterWrapper from './RouterWrapper';
import reducers from './reducers';

export default class App extends React.Component {
  render() {
    console.disableYellowBox = true;

    const store = createStore(reducers);

    return (
      <Provider store={store}>
        <RouterWrapper />
      </Provider>
    );
  }
}
