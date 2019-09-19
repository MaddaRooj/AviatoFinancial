import React, { Component } from "react";
import { Button } from 'semantic-ui-react';
// import {FaAviato} from 'react-icons/fa'
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'semantic-ui-css/semantic.min.css'

export default class Home extends Component {
  render() {
    return (
      <section className="home">
        <div className="homeDiv mb-5">
          <h2
            className="d-flex justify-content-center"
            style={{ fontFamily: "Nanum Myeongjo, serif", fontSize: "3rem" }}
          >
            Hello, {this.props.user.firstName}!
          </h2>
          <h4
            className="d-flex justify-content-center"
            style={{ fontFamily: "Nanum Myeongjo, serif", fontSize: "2.5rem" }}
          >
            Welcome to Aviato Financial, your personal financial advisor!
          </h4>
        </div>
        <div className="d-flex flex-row justify-content-center">
        <div className="homeBottom d-flex flex-row justify-content-around mt-5 pt-5">
          {/* <div className="d-flex flex-column pl-3" >
            <h2>Chat with a community of Investors!</h2>
            <h4>Have questions about investing, budgeting or finances in general?</h4>
            <h4>Engage with and learn from other investors.</h4>
            <h4>We will do our best to keep the trolls from bludgeoning you to death. </h4>
          </div> */}
          {/* <div style={{borderRight: '1px solid lightgrey'}}></div> */}
          <div className="d-flex align-items-center flex-column pl-3">
            <h2>Know the past to plan for the future.</h2>
            <h4>Create budgets to track your spending habits.</h4>
            <h4>Plan out your fiscal month by analyzing past spending.</h4>
            <Button content="Get Started!" className="ui inverted blue button mt-5" onClick={()=>this.props.history.push('./budgets')} />
          </div>
          {/* <div style={{borderRight: '1px solid lightgrey'}}></div> */}
          {/* <div className="d-flex flex-column pl-3 pr-3">
            <h2>Explore Up to Date Stock Info</h2>
            <h4>Coming in version 2.0</h4>
            <h4>Get up to date market conditions for stocks you own.</h4>
          </div> */}
        </div>
        </div>
      </section>
    );
  }
}
