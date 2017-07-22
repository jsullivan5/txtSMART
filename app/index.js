import React, { Component } from 'react';
import { render } from 'react-dom';
import MessageConsole from './components/MessageConsole/MessageConsole'

class Root extends Component {
  constructor() {
    super()
    this.state = {
      messageList: [],
    }

    this.handleToneClick = this.handleToneClick.bind(this);
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

  handleToneClick() {
    console.log('working')
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
