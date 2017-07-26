import React, { Component } from 'react';
import { Message } from '../Message/Message';


const MessageConsole = ({ messageList, handleToneClick, userNum }) => {

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
