import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Message from '../Message/Message';
/* eslint react/no-find-dom-node: 0 */
/* eslint react/no-string-refs: 0 */

class MessageConsole extends Component {
  componentDidMount() {
    const elem = ReactDOM.findDOMNode(this.refs.scroller);
    if (elem) {
      elem.scrollIntoView(true);
    }
  }

  componentWillReceiveProps(nextProps) {
    const elem = ReactDOM.findDOMNode(this.refs.scroller);
    if (elem && this.props.messageList.length < nextProps.messageList.length) {
      elem.scrollIntoView(true);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const elem = ReactDOM.findDOMNode(this.refs.scroller);

    if (elem && this.props.messageList.length > prevProps.messageList.length || this.props.userNum.length > prevProps.userNum.length) {
      elem.scrollIntoView(true);
    }
  }

  displayMessages() {
    const filterMessages = message => message.to === this.props.userNum ||
      message.from === this.props.userNum;
    const filterCommunity = message => true;
    const filterCallback = location.pathname === '/messages' ? filterMessages : filterCommunity;

    if (this.props.messageList.length) {
      return this.props.messageList.filter(filterCallback)
        .map((message, index) => (<Message
          messageData={message}
          key={index}
          handleToneClick={this.props.handleToneClick}
          location={location.pathname}
          handleDelete={this.props.handleDelete}
        />));
    }
  }

  render() {
    console.log(this.props.messageList);
    if (this.props.userNum.length === 0 || this.props.messageList.length === 0) {
      return (
        <div className="message-console">
          <p>We are either loading, or you haven't logged in with your number...</p>
          <img src="https://media.giphy.com/media/7LeoaJAXokpaM/giphy.gif" id="loader-img" />
        </div>
      );
    }

    return (
      <div id="console-wrapper">
        <p id="reminder-txt">Don't forget to submit texts by starting them with #submit </p>
        <div className="message-console">
          {this.displayMessages()}
          <div ref="scroller" />
        </div>
      </div>
    );
  }
}

/* eslint react/forbid-prop-types: 0 */
MessageConsole.propTypes = {
  messageList: PropTypes.array.isRequired,
};
export default MessageConsole;
