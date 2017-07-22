import React from 'react';

export const Message = ({ messageData }) => {
  const messageClass = messageData.from === '+18178732313' ? 'send' : 'receive';

  return (
    <div className='message-wrapper'>
      <div className={messageClass}>
        <p>{messageData.body}</p>
      </div>
    </div>
  );
}
