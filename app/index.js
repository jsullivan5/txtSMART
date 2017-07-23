import React, { Component } from 'react';
import { render } from 'react-dom';
import update from 'react-addons-update';
import MessageConsole from './components/MessageConsole/MessageConsole'
import 'whatwg-fetch'

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

    fetch(`/api/tone/${messageBody}`, {
      method: 'POST'
    })
      .then(response => response.json())
      .then(responseData => {
        // console.log(responseData.document_tone.tone_categories[0].tones);
        const tones = responseData.document_tone.tone_categories[0].tones
        // console.log(messageData.id);
        // console.log(messageData);
        const newData = Object.assign({}, messageData, {tone: tones}, {toneView: true})
        // console.log('newData', newData);
        const msgArray = Array.from(this.state.messageList);
        console.log('messageArray',msgArray);
        msgArray[messageData.id] = newData;
        this.setState({ messageList: msgArray})
        // const newMsgArray = update(msgArray, { messageData.id: {$set: newData}})
        // console.console.log(newMsgArray);;
        // this.setState({messageList: newMsgArray})


      })
  }

  render() {
    const { messageList } = this.state;

    return (
      <main>
        <MessageConsole messageList={messageList}
                        handleToneClick={this.handleToneClick} />
      </main>
    )
  }
}

render(<Root />, document.getElementById('main'))
