import React from "react"

import Sidebar from "./common/Sidebar"
import Header from "./common/Header"
import Footer from "./common/Footer"


export default class MainApp extends React.Component {
  render () {
    return (
      <div className="wrapper">
        <Sidebar/>
        <div id="content">
          <Header/>
            <div id="main-content">
            </div>
          <Footer/>
        </div>
      </div>
    )
  }
}
