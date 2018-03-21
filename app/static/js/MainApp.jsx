import React from "react"

import Sidebar from "./common/Sidebar"
import Footer from "./common/Footer"


export default class MainApp extends React.Component {
  render () {
    return (
      <div className="wrapper">
        <Sidebar/>
        <div id="content">
          <Footer/>
        </div>
      </div>
    )
  }
}
