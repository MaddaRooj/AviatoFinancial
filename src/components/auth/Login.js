import React, { Component } from 'react';
import { Form, Button, Container, Grid, Segment, Header, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { login } from './UserManager';
import {FaAviato} from "react-icons/fa"
import 'semantic-ui-css/semantic.min.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "./Auth.css"

export default class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  submit = () => {
    login(this.state.email, this.state.password)
      .then((user) => {
        this.props.onLogin(user);
        this.props.history.push('/');
      });
  }

  render() {
    return (
      <div className="login">
        <div className="d-flex flex-row justify-content-center mt-5">
          <Segment className="loginForm">
            <Header style={{ fontFamily: 'EB Garamond, serif', fontSize: '3rem', color: 'black' }} as="h1" textAlign="center">
              Welcome Investor!
                </Header>
            <Form onSubmit={this.submit}>
              <Form.Field
                control="input"
                type="email"
                label="Email Address"
                placeholder="john.doe@gmail.com"
                onChange={(e) => this.setState({ email: e.target.value })}
              />
              <Form.Field
                control="input"
                type="password"
                label="Password"
                placeholder="password"
                onChange={(e) => this.setState({ password: e.target.value })}
              />
              <Form.Field control="input" type="hidden" />
              <Button fluid content="Log in" className="ui inverted blue button" />
            </Form>
            <Message className="auth--message">
              Not registered yet? <Link to="/register">Sign Up</Link>
            </Message>
          </Segment>
        </div>
      </div>
    )
  }
}