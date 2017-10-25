/* global localStorage */
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import 'whatwg-fetch';
import MessageConsole from '../MessageConsole/MessageConsole';
import Header from '../Header/Header';
import socket from '../../assets/sockets';
import NewMessage from '../../AppHelpers/NewMessage';
import { containsSubmit, replaceSubmit } from '../../AppHelpers/ClientHelpers';
import Home from '../Home/Home';
import { getHistory, getTone, deleteMessage } from './fetchHelper';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
      submittedTexts: [],
      userNumGlobal: '',
    };

    socket.on('message', (data) => {
      const newMsg = new NewMessage(data);
      this.acceptIncomingText(newMsg);
    });

    this.handleToneClick = this.handleToneClick.bind(this);
    this.getUserNum = this.getUserNum.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const storage = JSON.parse(localStorage.getItem('submitted')) || {};
    getHistory(this, storage);
  }

  getUserNum(number) {
    this.setState({ userNumGlobal: `+1${number}` });
  }

  updateIndivMsg(bool, messageKey, messageData, messages, obj) {
    const newData = Object.assign({}, messageData, obj, { toneView: bool });
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
      return;
    }

    getTone(this, messageBody, messageKey, messageData, messages);
  }

  acceptIncomingText(message) {
    const currentState = this.state.messageList;
    const newMsgObj = Object.assign({}, message, { id: currentState.length + 1 });
    const newState = Array.from(currentState);

    if (containsSubmit(message.body)) {
      const cleanedMessage = replaceSubmit(message);
      const newSubmits = Array.from(this.state.submittedTexts);

      newSubmits.push(cleanedMessage);
      this.setState({ submittedTexts: newSubmits });
      localStorage.setItem('submitted', JSON.stringify(newSubmits));
    }

    newState.push(newMsgObj);
    this.setState({ messageList: newState });
  }

  handleDelete(messageData) {
    const filterDeleted = Array.from(this.state.messageList)
      .filter(message => message.smsId !== messageData.smsId);

    deleteMessage(messageData);

    this.setState({ messageList: filterDeleted });
  }

  render() {
    const { messageList, userNumGlobal, submittedTexts } = this.state;

    return (
      <main>
        <Header getUserNum={this.getUserNum} />
        <section>
          <Route exact path="/" component={Home} />
          <Route
            path="/messages"
            render={() =>
              (<MessageConsole
                messageList={messageList}
                handleToneClick={this.handleToneClick}
                userNum={userNumGlobal}
                handleDelete={this.handleDelete}
              />)}
          />
          <Route
            path="/community"
            render={() =>
              (<MessageConsole
                messageList={submittedTexts}
                handleToneClick={this.handleToneClick}
                userNum="+"
                handleDelete={this.handleDelete}
              />)}
          />
        </section>
      </main>
    );
  }
}

export default App;
