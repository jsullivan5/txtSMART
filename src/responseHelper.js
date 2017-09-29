function formatArray(array) {
  return array.sort((a, b) => (b.score * 100) - (a.score * 100))
    .map(tone => (`${tone.tone_name} : ${(tone.score * 100).toFixed(2)}%`));
}

function getIntroText(array) {
  const sorted = array.sort((a, b) => (b.score * 100) - (a.score * 100));

  if (sorted[0].score === 0) {
    return 'Try a longer message. ';
  }

  switch (sorted[0].tone_name) {
    case 'Joy':
      return 'You sound mostly joyful.';
    case 'Anger':
      return 'You sound mostly angry.';
    case 'Sadness':
      return 'You sound mostly sad.';
    case 'Fear':
      return 'You sound mostly afraid.';
    case 'Disgust':
      return 'You sound mostly disgusted.';
    default:
      return 'You sound: ';
  }
}

module.exports = {
  formatArray,
  getIntroText,
};
