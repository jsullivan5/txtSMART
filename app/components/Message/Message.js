import React from 'react';

const Message = ({ messageData, handleToneClick }) => {
  const messageClassName = messageData.from === '+18178732313' ? 'send' : 'receive';
  let toneData;

  if (messageData.toneView === true) {
    toneData = messageData.tone.map((oneTone, index) => {
      return (
        <p key={index}>
          {oneTone.tone_name}: {oneTone.score}
        </p>
      );
    });
  }

  return (
    <div className='message-wrapper'>
      <div className={messageClassName}
           onClick={(e) => handleToneClick(messageData, location.pathname)}>
        <p>{messageData.body}</p>
        {toneData || null}
      </div>
    </div>
  );
}

export default Message;
