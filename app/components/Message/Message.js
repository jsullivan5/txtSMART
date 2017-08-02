import React from 'react';

const Message = ({ messageData, handleToneClick, handleDelete }) => {
  const messageClassName = messageData.from === '+18178732313' ? 'send' : 'receive';
  let toneBtnTxt = 'Get Tone'
  let toneData;

  if (messageData.toneView === true) {
    toneData = messageData.tone.map((oneTone, index) => {
      return (
        <p key={index}>
          {oneTone.tone_name}: {oneTone.score}
        </p>
      );
    });

    toneBtnTxt = 'Hide Tone'
  }



  return (
    <div className='message-wrapper'>
      <div className={messageClassName}>
        <p>{messageData.body}</p>
        {toneData || null}
        <button onClick={(e) => handleToneClick(messageData, location.pathname)}>
          {toneBtnTxt}
        </button>
        { location.pathname === '/messages' ?
          <button onClick={(e) => handleDelete(messageData)}>Delete</button> :
          null }
      </div>
    </div>
  );
}

export default Message;
