export const containsSubmit = (string) => {
  if (string.toLowerCase().indexOf('#submit') !== -1) {
    return true;
  }
  return false;
};

export const replaceSubmit = (message) => {
  const newBody = message.body.replace(/#submit/i, '');
  return Object.assign(message, { body: newBody });
};
