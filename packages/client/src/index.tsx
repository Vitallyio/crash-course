import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Movies from './components/Movies';
import App from './components/App';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App>
      <Movies />
    </App>
  </Provider>,
  document.getElementById('app')
);
