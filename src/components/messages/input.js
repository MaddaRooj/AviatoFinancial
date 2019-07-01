import React, { Component } from "react";
import { Form, Input, InputGroup, Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import { restElement } from "@babel/types";

export default class MessageInput extends Component {
  // Set initial state
  state = {
    body: "",
    userName: "",
    userId: "",
    dateTime: ""
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  constructNewMessage = evt => {
    let today = new Date();
    let formatTime = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      today.getHours(),
      today.getMinutes(),
      today.getSeconds()
    );

    let formattedTime = formatTime.toLocaleString("en-US", { hour12: true });

    const newMessage = {
      body: this.state.body,
      userName: this.props.user.username,
      userId: this.props.user.id,
      dateTime: formattedTime
    };
    this.props.addMessage(newMessage);
  };

  render () {
    return (
      <React.Fragment>
        <Form className="inputDiv">
          <InputGroup className="chatInput">
            <Input
              type="text"
              ref="body"
              id="body"
              required
              placeholder="Enter your message and push submit"
              onChange={ this.handleFieldChange }
            />
          </InputGroup>
          <Button
            className="btn btn-outline-primary submitMess"
            size="sm"
            onClick={ this.constructNewMessage }
          >
            Submit
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}