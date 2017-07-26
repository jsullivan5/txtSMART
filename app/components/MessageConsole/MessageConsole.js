import React, { Component } from 'react';
import { Message } from '../Message/Message';


const MessageConsole = ({ messageList, handleToneClick }) => {

  // const userMessages = messageList.filter(message => )

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
