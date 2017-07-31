import React, { Component } from 'react';
import App from './components/App/App';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

render(
  <BrowserRouter history={history}>
    <App />
  </BrowserRouter>
  , document.getElementById('main')
);
