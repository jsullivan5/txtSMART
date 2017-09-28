class newMessage {
  constructor(data) {
    this.from = data.From;
    this.to = data.To;
    this.body = data.Body;
    this.tone = [];
    this.toneView = false;
    this.smsId = data.SmsMessageSid;
  }
}

export default newMessage;
