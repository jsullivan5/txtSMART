import React, { Component } from 'react';
import 'whatwg-fetch';

class SendController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userNumLocal: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ userNumLocal: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { userNumLocal } = this.state

    this.props.getUserNum(userNumLocal)
    this.setState({ userNumLocal: '' })
  }

  render() {
    const placeholderText = 'Area code first. No spaces'
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Your Phone Number:
          <input type='number' value={this.state.userNum}
                 onChange={this.handleChange}
                 placeholder={placeholderText}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default SendController;
