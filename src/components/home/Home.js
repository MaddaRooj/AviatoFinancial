import React, { Component } from 'react'
import "./Home.css"


class Home extends Component {
  render() {
    return (
      <section className="home">
        {
          <div className=" d-flex flex-column align-items-center mt-5">
            <h2>Hello, Investor!</h2>
            <h4>Welcome to Aviato Financial!</h4>
          </div>
        }
      </section>
    )
  }
}

export default Home