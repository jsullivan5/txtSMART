import React, { Component } from 'react';
import { Message } from '../Message/Message';
import 'whatwg-fetch'

const MessageConsole = ({ messageList, handleToneClick }) => {

  const messages = messageList.map((message, index) => {
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
