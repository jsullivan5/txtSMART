import React, { Component } from 'react';
import { Message } from '../Message/Message';


const MessageConsole = ({ messageList, handleToneClick, userNum, history }) => {
  console.log(this);
  if (userNum.length === 0) {
    return (
      <div className='message-console'>
        <h2>
          txtSMART is an application that lets you know how the content of your text messages may come accross to others.
        </h2>
        <h2>Check the tone of your message by sending a text to (817)-873-2313</h2>
        <h2>Input your phone number to see your texting history</h2>
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

  // const communityTexts =

  return (
    <div className='message-console'>
      {messages}
    </div>
  )
}

export default MessageConsole
