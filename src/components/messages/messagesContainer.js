import React, { Component } from "react";
import MessageList from "./messageList";
import MessageInput from "./input";
// import MessageEditModal from "./messageEditForm"
import "./messages.css";

export default class MessagesContainer extends Component {
  render () {
    return (
      <section className="messagesSection">
        <h1 className="chatHeader">Nutshell Chat</h1>

        {/* <MessageEditModal header={"Edit Task?"} toggleModal={this.state.modalShow} handleClickYes={this.handleClickedEdit} handleClickNo={this.handleClickedNo}/> */ }

        <div className="messageContainer">
          <MessageList { ...this.props } user={ this.props.user } messages={ this.props.messages } />
        </div>
        <div className="messageInput">
          <MessageInput { ...this.props } user={ this.props.user } addMessage={ this.props.addMessage } />
        </div>
      </section>
    );
  }
}