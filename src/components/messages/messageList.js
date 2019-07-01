import React, { Component } from "react";
import { withRouter } from "react-router";
import MessageItem from "./messageItem";

class MessageList extends Component {
  render () {
    return (
      <section className="messages">
        <div>
          { this.props.messages.map(item => {
            return (
              <MessageItem
                activeUser={ this.props.activeUser }
                key={ item.id }
                message={ item }
                { ...this.props }
                deleteMessage={ this.props.deleteMessage }
              />
            );
          }) }
        </div>
      </section>
    );
  }
}

export default withRouter(MessageList);