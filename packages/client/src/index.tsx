import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Movies from './components/Movies';
import App from './components/App';

ReactDOM.render(
  <App>
    <Movies />
  </App>,
  document.getElementById('app')
);
