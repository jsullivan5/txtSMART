/* global fetch */
/* eslint no-console: 0 */

export const getHistory = (component, localStorage) => {
  fetch('/api/history')
    .then(response => response.json())
    .then((responseData) => {
      component.setState({ messageList: responseData.reverse(), submittedTexts: localStorage });
    })
    .catch(err => console.log(err));
};

export const getTone = (component, messageBody, messageKey, messageData, messages) => {
  fetch(`/api/tone/${messageBody}`, { method: 'POST' })
    .then(response => response.json())
    .then((responseData) => {
      const tones = { tone: responseData.document_tone.tone_categories[0].tones };

      component.updateIndivMsg(true, messageKey, messageData, messages, tones);
    });
};

export const deleteMessage = (messageData) => {
  fetch(`/api/delete/${messageData.smsId}`, { method: 'DELETE' })
    .then(response => response.json())
    .then(responseData => console.log(responseData))
    .catch(error => console.log(error));
};
