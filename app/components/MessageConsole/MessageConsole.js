import React, { Component } from 'react';
import { Message } from '../Message/Message';
import 'whatwg-fetch'

class MessageConsole extends Component {
  constructor() {
    super()
    this.state = {
      messageList: [],
    }
  }

  componentDidMount() {
    fetch('./api/history')
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        this.setState({messageList: responseData})
      })
      .catch(err => console.log(err))
  }

  displayMessages(messages) {
    return messages.map((message, index) => {
      return <Message messageData={message}
                      key={index}/>
    })
  }

  render() {
    const { messageList } = this.state
    const messages = this.displayMessages(messageList);

    return (
      <div className='message-console'>
        {messages}
      </div>
    )
  }
}

export default MessageConsole
