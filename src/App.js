import React, { Component } from "react"
import Navbar from "./components/nav/Navbar"
import ApplicationViews from "./components/ApplicationViews"
import "bootstrap/dist/css/bootstrap.min.css"

class App extends Component {
  render() {
      return (
          <React.Fragment>
              <Navbar />
              <ApplicationViews />
          </React.Fragment>
      )
  }
}

export default App
