import React, { Component } from 'react';
import 'whatwg-fetch';

class SendController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userNum: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ userNum: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { userNum } = this.state

    this.props.userPhoneNum(userNum)
    this.setState({ userNum: '' })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Your Phone Number:
          <input type='number' value={this.state.userNum}
                 onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default SendController;
