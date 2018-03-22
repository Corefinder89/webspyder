import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from './redux/reducers';

import thunk from 'redux-thunk';

import actions from "./redux/actions"

import {main} from "../sass/main"
import MainApp from "./MainApp"


const rootElement = document.getElementById('root');

const store = createStore(combineReducers(reducer), compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

store.dispatch(actions.selectField("desktop"))

const renderApp = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    rootElement
  );
};

renderApp(MainApp)
