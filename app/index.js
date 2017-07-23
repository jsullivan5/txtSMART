import React, { Component } from 'react';
import { render } from 'react-dom';
import update from 'react-addons-update';
import MessageConsole from './components/MessageConsole/MessageConsole';
import SendController from './components/SendController/SendController';
import 'whatwg-fetch';

class Root extends Component {
  constructor() {
    super()
    this.state = {
      messageList: [],
    }

    this.handleToneClick = this.handleToneClick.bind(this);
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
      msgArray[messageData.id] = newData;
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
        msgArray[messageData.id] = newData;
        this.setState({ messageList: msgArray})
      })
  }

  render() {
    const { messageList } = this.state;

    return (
      <main>
        <SendController className='send-controller'/>
        <MessageConsole messageList={messageList}
                        handleToneClick={this.handleToneClick} />

      </main>
    )
  }
}

render(<Root />, document.getElementById('main'))
