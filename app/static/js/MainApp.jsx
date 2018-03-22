import React from "react"

import {
  HashRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Sidebar from "./common/Sidebar"
import Header from "./common/Header"
import Footer from "./common/Footer"

import Analyze from "./pages/Analyze"


export default class MainApp extends React.Component {
  render () {
    return (
      <div className="wrapper">
        <Sidebar/>
        <div id="content">
          <Header/>
            <div id="main-content">
              <HashRouter>
                <Switch>
                  <Route path="/desktop" component={Analyze}/>
                  <Route path="/mobile" component={Analyze}/>
                  <Redirect from="/" to="/desktop" />
                </Switch>
              </HashRouter>
            </div>
          <Footer/>
        </div>
      </div>
    )
  }
}
