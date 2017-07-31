import React, { Component } from 'react';
import { render } from 'react-dom';
import MessageConsole from '../MessageConsole/MessageConsole';
import Header from '../Header/Header';
import 'whatwg-fetch';
import socket from '../../assets/sockets.js';
import newMessage from '../../AppHelpers/NewMessage.js';
import { containsSubmit, replaceSubmit } from '../../AppHelpers/ClientHelpers.js';
import Home from '../Home/Home';
import { Route } from 'react-router-dom';


class App extends Component {
  constructor() {
    super()
    this.state = {
      messageList: [],
      submittedTexts: [],
      userNumGlobal: ''
    }

    socket.on('message', (data) => {
      const newMsg = new newMessage(data);
      this.acceptIncomingText(newMsg);
    });

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
      .catch(err => console.log(err));
  }

  updateIndivMsg(bool, messageKey, messageData, messages, obj) {
    const newData = Object.assign({}, messageData, obj , {toneView: bool});
    const msgArray = Array.from(messages);
    const newIndex = msgArray.indexOf(messageData);
    msgArray[newIndex] = newData;
    this.setState({ [messageKey]: msgArray });
  }


  handleToneClick(messageData, path) {
    const messages = path === '/messages' ? this.state.messageList : this.state.submittedTexts;
    const messageKey = path === '/messages' ? 'messageList' : 'submittedTexts';
    const messageBody = encodeURIComponent(messageData.body);

    if (messageData.toneView === true) {
      this.updateIndivMsg(false, messageKey, messageData, messages, null);
      return
    }

    fetch(`/api/tone/${messageBody}`, {
      method: 'POST'
    })
      .then(response => response.json())
      .then(responseData => {
        const tones = { tone: responseData.document_tone.tone_categories[0].tones };
        this.updateIndivMsg(true, messageKey, messageData, messages, tones);
      });
  }

  acceptIncomingText(message) {
    const currentState = this.state.messageList;
    const newMsgObj = Object.assign({}, message, { id: currentState.length + 1 });
    const newState = Array.from(currentState);

    if(containsSubmit(message.body)) {
      const cleanedMessage = replaceSubmit(message);
      const newSubmits = Array.from(this.state.submittedTexts);

      newSubmits.push(cleanedMessage);
      this.setState({submittedTexts: newSubmits});
      localStorage.setItem('submitted', JSON.stringify(newSubmits));
    }

    newState.push(newMsgObj);
    this.setState({messageList: newState});
  }

  getUserNum(number) {
    this.setState({ userNumGlobal: '+1' + number });
  }

  render() {
    const { messageList, userNumGlobal, submittedTexts } = this.state;

    return (
      <main>
        <Header getUserNum={this.getUserNum} />
        <section>
          <Route exact path={'/'} component={Home} />
          <Route path="/messages" render={ ({ location }) =>
            <MessageConsole messageList={messageList}
                            handleToneClick={this.handleToneClick}
                            userNum={userNumGlobal} /> } />
          <Route path="/community" render={({ location }) =>
              <MessageConsole messageList={submittedTexts}
                              handleToneClick={this.handleToneClick}
                              userNum={'+'} /> } />
        </section>
      </main>
    );
  }
}

export default App;
