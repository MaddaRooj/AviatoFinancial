import React, { Component } from 'react'
import "./Home.css"


class Home extends Component {
  render() {
    return (
      <section className="home">
        {
          <div className="homeDiv d-flex flex-column align-items-center mt-5">
            <h2 style={{fontFamily: 'Nanum Myeongjo, serif', fontSize: "3rem"}}>Hello, {this.props.user.firstName}!</h2>
            <h4 style={{fontFamily: 'Nanum Myeongjo, serif', fontSize: "2.5rem"}}>Welcome to Aviato Financial, your personal financial advisor!</h4>
          </div>
        }
      </section>
    )
  }
}

export default Home