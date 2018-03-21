import React from 'react'
import ReactDOM from 'react-dom'

import {main} from "../sass/main"

import MainApp from "./MainApp"

const rootElement = document.getElementById('root');

const renderApp = Component => {
  ReactDOM.render(
    <Component />,
    rootElement
  );
};

renderApp(MainApp)
