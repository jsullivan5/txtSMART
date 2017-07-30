import React, { Component } from 'react';
import { Message } from '../Message/Message';
import ReactDOM from 'react-dom';

class MessageConsole extends Component {
  // ({ messageList, handleToneClick, userNum, history }) =>
  constructor(props){
    super(props)
  }

  componentDidMount() {
    const elem = ReactDOM.findDOMNode(this.refs.scroller);
    if (elem) {
      elem.scrollIntoView(true);
    }
  }

  componentWillReceiveProps(nextProps) {
    const elem = ReactDOM.findDOMNode(this.refs.scroller);
    console.log('receive props',elem);
    if (elem) {
      console.log('in the if');
      elem.scrollIntoView(true);
    }
  }

  displayMessages() {
    const filterMessages = (message) => message.to === this.props.userNum ||
                                      message.from === this.props.userNum;
    const filterCommunity = (message) => true;

    return this.props.messageList.filter(location.pathname === '/messages' ? filterMessages : filterCommunity)
      .map((message, index) => {
        return <Message messageData={message}
                        key={index}
                        handleToneClick={this.props.handleToneClick}
                        location={location.pathname}/>
      });
  }

  render() {
    if (this.props.userNum.length === 0) {
      return (
        <div className='message-console'>
          <h2>
            txtSMART is an application that lets you know how the content of your text messages may come accross to others.
          </h2>
          <h2>Check the tone of your message by sending a text to (817)-873-2313</h2>
          <h2>Input your phone number to see your texting history</h2>
          <div ref='scroller'></div>

        </div>
      )
    }

    return (
      <div className='message-console'>
        {this.displayMessages(this.props.messageList)}
        <div ref='scroller'></div>
      </div>
    )
  }


}

export default MessageConsole
