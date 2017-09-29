import React, { Component } from 'react';
import 'whatwg-fetch';
import PropTypes from 'prop-types';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userNumLocal: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ userNumLocal: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { userNumLocal } = this.state;

    this.props.getUserNum(userNumLocal);
    this.setState({ userNumLocal: '' });
  }

  render() {
    const placeholderText = 'Area code first. No spaces';

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="login">
          Login with your phone #:
        </label>
        <input
          type="number"
          id="login"
          value={this.state.userNumLocal}
          onChange={this.handleChange}
          placeholder={placeholderText}
        />
        <input
          type="submit"
          value="Login"
          id="login-submit"
        />
      </form>
    );
  }
}

Login.propTypes = {
  getUserNum: PropTypes.func.isRequired,
};

export default Login;
