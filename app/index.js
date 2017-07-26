import React, { Component } from 'react';
import { render } from 'react-dom';
import update from 'react-addons-update';
import MessageConsole from './components/MessageConsole/MessageConsole';
import SendController from './components/SendController/SendController';
import Header from './components/Header/Header';
import 'whatwg-fetch';
import socket from './assets/sockets.js';
import newMessage from './AppHelpers/NewMessage.js'


class Root extends Component {
  constructor() {
    super()
    this.state = {
      messageList: []
    }

    socket.on('message', (data) => {
      console.log('from webSocket',data)
      const newMsg = new newMessage(data)
      // this.setState({socketText: data})
      this.handleSend(newMsg)
    })

    this.handleToneClick = this.handleToneClick.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  componentDidMount() {
    fetch('/api/history')
      .then(response => response.json())
      .then(responseData => {
        this.setState({messageList: responseData})
      })
      .catch(err => console.log(err))
  }

  handleToneClick(messageData) {
    const messageBody = messageData.body

    if (messageData.toneView === true) {
      const newData = Object.assign({}, messageData, {toneView: false});
      const msgArray = Array.from(this.state.messageList);
      const newIndex = msgArray.indexOf(messageData)
      msgArray[newIndex] = newData;
      this.setState({ messageList: msgArray})
      return
    }

    fetch(`/api/tone/${messageBody}`, {
      method: 'POST'
    })
      .then(response => response.json())
      .then(responseData => {
        const tones = responseData.document_tone.tone_categories[0].tones
        const newData = Object.assign({}, messageData, {tone: tones}, {toneView: true})
        const msgArray = Array.from(this.state.messageList);
        const newIndex = msgArray.indexOf(messageData)
        msgArray[newIndex] = newData;
        this.setState({ messageList: msgArray})
      })
  }

  handleSend(message) {
    const currentState = this.state.messageList;
    const newMsgObj = Object.assign({}, message, { id: currentState.length + 1 })
    const newState = Array.from(currentState)
    newState.unshift(newMsgObj)
    this.setState({messageList: newState})
  }

  render() {
    const { messageList } = this.state;

    return (
      <main>
        <Header />

        <section>
          <MessageConsole messageList={messageList}
                          handleToneClick={this.handleToneClick} />
          <SendController className='send-controller'
                          handleSend={this.handleSend}/>
        </section>
      </main>
    )
  }
}

render(<Root />, document.getElementById('main'))
