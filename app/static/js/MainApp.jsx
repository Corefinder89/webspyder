import React from "react"

import { connect } from "react-redux"

import {
  HashRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Sidebar from "./common/Sidebar"
import Header from "./common/Header"
import Footer from "./common/Footer"

import Analyse from "./pages/Analyse"

import Spinner from "./components/Spinner"


@connect((state) => state)
export default class MainApp extends React.Component {
  render () {
    const spinner = this.props.spinner.showSpinner ? (
      <Spinner/>
    ) : null
    return (
      <div className="wrapper">
        {spinner}
        <Sidebar/>
        <div id="content">
          <Header/>
            <div id="main-content">
              <HashRouter>
                <Switch>
                  <Route path="/desktop" component={Analyse}/>
                  <Route path="/mobile" component={Analyse}/>
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
