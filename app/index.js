import React, { Component } from 'react';
import { render } from 'react-dom';
import update from 'react-addons-update';
import MessageConsole from './components/MessageConsole/MessageConsole';
import Header from './components/Header/Header';
import 'whatwg-fetch';
import socket from './assets/sockets.js';
import newMessage from './AppHelpers/NewMessage.js'
import { containsSubmit, replaceSubmit } from './AppHelpers/ClientHelpers.js'
import AnalyzeDashBoard from './components/AnalyzeDashBoard/AnalyzeDashBoard'
import { BrowserRouter, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

history.listen(() => {
  console.log('OK')
})

class Root extends Component {
  constructor() {
    super()
    this.state = {
      messageList: [],
      submittedTexts: [],
      userNumGlobal: ''
    }

    socket.on('message', (data) => {
      const newMsg = new newMessage(data)
      this.handleSend(newMsg)
    })

    this.handleToneClick = this.handleToneClick.bind(this);
    this.getUserNum = this.getUserNum.bind(this);
  }

  componentDidMount() {
    const storage = JSON.parse(localStorage.getItem('submitted'));

    fetch('/api/history')
      .then(response => response.json())
      .then(responseData => {
        this.setState({ messageList: responseData.reverse(), submittedTexts: storage })
      })
      .catch(err => console.log(err))
  }

  handleToneClick(messageData, path) {
    console.log(path);
    const messages = path === '/messages' ? this.state.messageList : this.state.submittedTexts
    const messageKey = path === '/messages' ? 'messageList' : 'submittedTexts'
    const messageBody = encodeURIComponent(messageData.body)

    console.log(messages);

    if (messageData.toneView === true) {
      const newData = Object.assign({}, messageData, {toneView: false});
      const msgArray = Array.from(messages);
      const newIndex = msgArray.indexOf(messageData)
      msgArray[newIndex] = newData;
      this.setState({ messageKey: msgArray})
      return
    }

    fetch(`/api/tone/${messageBody}`, {
      method: 'POST'
    })
      .then(response => response.json())
      .then(responseData => {
        const tones = responseData.document_tone.tone_categories[0].tones
        const newData = Object.assign({}, messageData, {tone: tones}, {toneView: true})
        const msgArray = Array.from(messages);
        const newIndex = msgArray.indexOf(messageData)
        msgArray[newIndex] = newData;
        this.setState({ [messageKey]: msgArray})
      })
  }

  handleSend(message) {
    const currentState = this.state.messageList;
    const newMsgObj = Object.assign({}, message, { id: currentState.length + 1 })
    const newState = Array.from(currentState)

    if(containsSubmit(message.body)) {
      const cleanedMessage = replaceSubmit(message)
      const newSubmits = Array.from(this.state.submittedTexts)

      newSubmits.push(cleanedMessage)
      this.setState({submittedTexts: newSubmits})
      localStorage.setItem('submitted', JSON.stringify(newSubmits))
    }

    newState.push(newMsgObj)
    this.setState({messageList: newState})
  }

  getUserNum(number) {
    this.setState({ userNumGlobal: '+1' + number })
  }



  render() {
    const { messageList, userNumGlobal, submittedTexts } = this.state;

    return (
      <main>
        <Header getUserNum={this.getUserNum}
                history={history}/>

        <section>
          <Route exact path="/messages" render={ ({ location }) =>
            <MessageConsole messageList={messageList}
                        handleToneClick={this.handleToneClick}
                        userNum={userNumGlobal}
                        history={history} />} />
          <Route exact path="/community" render={({ location }) =>
              <MessageConsole messageList={submittedTexts}
                        handleToneClick={this.handleToneClick}
                        userNum={'+'}
                        history={history} />} />
        </section>
      </main>
    )
  }
}

render(
  <BrowserRouter history={history}>
    <Root />
  </BrowserRouter>
  , document.getElementById('main'))
