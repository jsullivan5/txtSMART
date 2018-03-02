const config = {
  port: process.env.PORT || 3000,
  watsonUrl: process.env.WATSON_URL || null,
  watsonUserName: process.env.WATSON_USERNAME || null,
  watsonPassword: process.env.WATSON_PASSWORD || null,
  twilioSID: process.env.TWILIO_SID_LIVE || null,
  twilioToken: process.env.TWILIO_TOKEN_LIVE || null,
};

module.exports = config;
