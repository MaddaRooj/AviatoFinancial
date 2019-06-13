import React, { Component } from 'react';
import { Form, Button, Container, Grid, Message, Segment, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { register } from './UserManager';
import 'semantic-ui-css/semantic.min.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "./Auth.css"

export default class Register extends Component {
  state = {
    email: '',
    username: '',
    password: '',
    firstName: '',
    lastName: ''
  }

  submit = () => {
    register(this.state)
      .then((newUser) => {
        this.props.onRegister(newUser)
        this.props.history.push('/');
      });
  }

  render() {
    return (
      <Container className="auth--container registerForm">
        <Grid>
          <Grid.Row centered>
            <Grid.Column largeScreen={6} computer={6} tablet={10} mobile={16}>
              <Segment>
                <Header style={{ fontFamily: 'Cinzel Decorative, cursive' }} as="h1" textAlign="center">
                  Register
                </Header>
                <Form className="register--form" onSubmit={this.submit}>
                  <Form.Group widths='equal'>
                    <Form.Input onChange={(e) => this.setState({ firstName: e.target.value })} fluid label='First name' placeholder='First name' />
                    <Form.Input onChange={(e) => this.setState({ lastName: e.target.value })} fluid label='Last name' placeholder='Last name' />
                  </Form.Group>
                  <Form.Field
                    control="input"
                    type="text"
                    label="Username"
                    placeholder="Enter a username"
                    onChange={(e) => this.setState({ username: e.target.value })}
                  />
                  <Form.Field
                    control="input"
                    type="email"
                    label="Email Address"
                    placeholder="Enter an email"
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                  <Form.Field
                    control="input"
                    type="password"
                    label="Password"
                    placeholder="Password"
                    onChange={(e) => this.setState({ password: e.target.value })}
                  />
                  <Form.Field control="input" type="hidden" />
                  <Button fluid content="Register" className="ui inverted violet button" />
                </Form>
                <Message className="auth--message">
                  Already registered? <Link to="/login">Log In</Link>
                </Message>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}