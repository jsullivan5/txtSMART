import React from 'react';

export const Message = ({ messageData, handleToneClick }) => {
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

  const messageClass = messageData.from === '+18178732313' ? 'send' : 'receive';

  return (
    <div className='message-wrapper'>
      <div className={messageClass}
           onClick={(e) => handleToneClick(messageData, location.pathname)}>
        <p>{messageData.body}</p>
        {toneData || null}
      </div>
    </div>
  );
}
