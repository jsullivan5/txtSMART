import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Message from '../Message/Message';
/* global location */
/* eslint react/no-find-dom-node: 0 */
/* eslint react/no-string-refs: 0 */
/* eslint no-mixed-operators: 0 */

// TODO: find better linter fixes

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

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState) {
    const elem = ReactDOM.findDOMNode(this.refs.scroller);
    if (elem && this.props.messageList.length >
       prevProps.messageList.length || this.props.userNum.length >
       prevProps.userNum.length) {
      elem.scrollIntoView(true);
    }
  }


  displayMessages() {
    const filterMessages = message => message.to === this.props.userNum ||
      message.from === this.props.userNum;
    // eslint-disable-next-line no-unused-vars
    const filterCommunity = message => true;
    const filterCallback = location.pathname === '/messages' ? filterMessages : filterCommunity;

    if (this.props.messageList.length) {
      return this.props.messageList.filter(filterCallback)
        .map(message => (<Message
          messageData={message}
          key={Math.random()}
          handleToneClick={this.props.handleToneClick}
          location={location.pathname}
          handleDelete={this.props.handleDelete}
        />));
    }
    return true;
  }

  render() {
    if (this.props.userNum.length === 0 || this.props.messageList.length === 0) {
      return (
        <div className="message-console">
          <p>We are either loading, or you have not logged in with your number...</p>
          <img src="https://media.giphy.com/media/7LeoaJAXokpaM/giphy.gif" id="loader-img" alt="loader" />
        </div>
      );
    }

    return (
      <div id="console-wrapper">
        <p id="reminder-txt">{"Don't forget to submit texts by starting them with #submit"}</p>
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
  messageList: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  userNum: PropTypes.string.isRequired,
  handleToneClick: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default MessageConsole;
