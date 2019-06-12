import React, { Component } from 'react';
import { Form, Button, Container, Grid, Segment, Header, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { login } from './UserManager';
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
      <Container className="auth--container">
        <Grid className="loginForm">
          <Grid.Row centered>
            <Grid.Column largeScreen={6} computer={6} tablet={10} mobile={16}>
              <Segment>
                <Header style={{fontFamily: 'Cinzel Decorative, cursive', fontSize: '3rem', color: '#A79344'}} as="h1" textAlign="center">
                  Welcome Investor!
                </Header>
                <Form className="loginForm" onSubmit={this.submit}>
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
                  <Button fluid content="Log in" className="ui inverted violet button" />
                </Form>
                <Message className="auth--message">
                  Not registered yet? <Link to="/register">Sign Up</Link>
                </Message>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}