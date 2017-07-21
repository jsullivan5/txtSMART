import React, { Component } from 'react';
import { render } from 'react-dom';
import MessageConsole from './components/MessageConsole/MessageConsole'

class Root extends Component {
  componentDidMount() {
    // INSERT API CALL TO YOUR INTERNAL API
  }

  render() {
    return (
      <main>
        <MessageConsole />
      </main>
    )
  }
}

render(<Root />, document.getElementById('main'))
