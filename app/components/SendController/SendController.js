import React, { Component } from 'react';

class SendController extends Component {
  constructor() {
    super()
    this.state = {
      sendText: ''
    }
  }

  handleChange(event) {
    this.setState({sendText: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form>
        <label>
          Send Txt:
          <textarea
                    onChange={(event) => this.handleChange(event)} />
        </label>
        <input type='submit' value='Submit' />
      </form>
    );
  }
}

export default SendController;
