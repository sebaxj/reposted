import React from 'react';
import { Provider } from 'react-redux';
import Router from './components/Router';
import store from './redux/store';

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
