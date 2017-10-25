import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import App from './components/App/App';

const history = createHistory();

render(
  <BrowserRouter history={history}>
    <App />
  </BrowserRouter>
  , document.getElementById('main'),
);
