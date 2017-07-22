var credentials = require('../credentials.js');
var credentials = require('../credentials.js');

function getTone(req, res) {
  var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

  var tone_analyzer = new ToneAnalyzerV3({
    username: credentials.watsonCred.username,
    password: credentials.watsonCred.password,
    version_date: '2017-07-01'
  });

  var params = {
    text: 'You son of a bitch!',
    tones: 'emotion'
  };

  tone_analyzer.tone(params, function(error, response) {
    if (error) {
      console.log('error:', error);
      res.status(500).send(error)
    }
    else {
      console.log(JSON.stringify(response, null, 2));
      res.status(200).send(response)
    }
  });
}

module.exports = {
  getTone: getTone
}
