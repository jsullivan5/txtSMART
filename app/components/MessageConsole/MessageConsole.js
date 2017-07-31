import React, { Component } from 'react';
import { Message } from '../Message/Message';
import ReactDOM from 'react-dom';

class MessageConsole extends Component {
  // ({ messageList, handleToneClick, userNum, history }) =>
  constructor(props){
    super(props)
  }

  componentDidMount() {
    const elem = ReactDOM.findDOMNode(this.refs.scroller);
    if (elem) {
      elem.scrollIntoView(true);
    }
  }

  componentWillReceiveProps(nextProps) {
    const elem = ReactDOM.findDOMNode(this.refs.scroller);
    if (elem) {
      console.log('in the if');
      elem.scrollIntoView(true);
    }
  }

  displayMessages() {
    const filterMessages = (message) => message.to === this.props.userNum ||
                                      message.from === this.props.userNum;
    const filterCommunity = (message) => true;

    return this.props.messageList.filter(location.pathname === '/messages' ? filterMessages : filterCommunity)
      .map((message, index) => {
        return <Message messageData={message}
                        key={index}
                        handleToneClick={this.props.handleToneClick}
                        location={location.pathname}/>
      });
  }

  render() {
    if (this.props.userNum.length === 0) {
      return (
        <div className='message-console'>      
          <p>Loading</p>
        </div>
      )
    }

    return (
      <div className='message-console'>
        {this.displayMessages(this.props.messageList)}
        <div ref='scroller'></div>
      </div>
    )
  }


}

export default MessageConsole
