import React, { Component } from 'react';
import { Message } from '../Message/Message';


const MessageConsole = ({ messageList, handleToneClick, userNum }) => {

  if (userNum.length === 0) {
    return (
      <div className='message-console'>
        <h2>Input your phone number to see your texting history</h2>
        <h2>Send a text to (817)-873-2313 to begin</h2>
      </div>
    )
  }

  const messages = messageList
    .filter(message => message.to === userNum || message.from === userNum)
    .map((message, index) => {
      return <Message messageData={message}
                      key={index}
                      handleToneClick={handleToneClick} />
    })

  return (
    <div className='message-console'>
      {messages}
    </div>
  )
}

export default MessageConsole
