import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ messageData, handleToneClick, handleDelete }) => {
  const messageClassName = messageData.from === '+18178732313' ? 'send' : 'receive';
  let toneBtnTxt = 'Get Tone';
  let toneData;

  if (messageData.toneView === true) {
    toneData = messageData.tone.map(oneTone => (
      <p key={oneTone.score}>
        {oneTone.tone_name}: {oneTone.score}
      </p>
    ));

    toneBtnTxt = 'Hide Tone';
  }

  const communityClass = location.pathname === '/community' ? 'community' : '';

  return (
    <div className="message-wrapper">
      <div className={`${messageClassName} ${communityClass}`}>
        <p>{messageData.body}</p>
        {toneData || null}
        <button onClick={() => handleToneClick(messageData, location.pathname)}>
          {toneBtnTxt}
        </button>
        { location.pathname === '/messages' ?
          <button onClick={() => handleDelete(messageData)}>Delete</button> :
          null }
      </div>
    </div>
  );
};

Message.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleToneClick: PropTypes.func.isRequired,
  messageData: PropTypes.shape({
    body: PropTypes.string,
    from: PropTypes.string,
    smsId: PropTypes.string,
    tone: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.string,
    ]),
    toneView: PropTypes.bool,
  }).isRequired,
};

export default Message;
