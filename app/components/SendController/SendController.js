import React, { Component } from 'react';
import 'whatwg-fetch';

class SendController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendText: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ sendText: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { sendText } = this.state

    fetch(`/api/send/${sendText}`)
      .then(response => response.json())
      .then(data => {
        this.props.handleSend(data)
      })

    this.setState({ sendText: '' })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Send Txt:
          <textarea value={this.state.sendText} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default SendController;
