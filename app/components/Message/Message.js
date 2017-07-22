import React from 'react';

export const Message = ({ messageData, handleToneClick }) => {

  console.log(handleToneClick);
  const messageClass = messageData.from === '+18178732313' ? 'send' : 'receive';

  return (
    <div className='message-wrapper'>
      <div className={messageClass}
           onClick={(e) => handleToneClick()}>
        <p>{messageData.body}</p>
      </div>
    </div>
  );
}
