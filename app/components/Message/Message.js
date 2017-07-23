import React from 'react';

export const Message = ({ messageData, handleToneClick }) => {

  // if (messageData.toneView === true) {
  //
  // }

  const messageClass = messageData.from === '+18178732313' ? 'send' : 'receive';

  return (
    <div className='message-wrapper'>
      <div className={messageClass}
           onClick={(e) => handleToneClick(messageData)}>
        <p>{messageData.body}</p>
      </div>
    </div>
  );
}
