export const containsSubmit = (string) => {
  return string.toLowerCase().indexOf('#submit') !== -1 ? true : false
}

export const replaceSubmit = (message) => {
 const newBody = message.body.replace(/#submit/i, '');
 return Object.assign(message, {body: newBody})
}
