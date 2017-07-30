class newMessage {
  constructor(data) {
    this.from = 'anonymous'
    this.to = 'anonymous'
    this.body = data.Body,
    this.tone = [],
    this.toneView = false
    this.smsId = data.SmsMessageSid
  }
}

export default newMessage;
