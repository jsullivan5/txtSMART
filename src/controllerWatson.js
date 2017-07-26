var credentials = require('../credentials.js');
var credentials = require('../credentials.js');

function getTone(req, res) {
  var requestBody = req.params.content;
  console.log(requestBody);
  var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

  var tone_analyzer = new ToneAnalyzerV3({
    username: credentials.watsonCred.username,
    password: credentials.watsonCred.password,
    version_date: '2017-07-01'
  });

  var params = {
    text: requestBody,
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

function getToneServer(text, res) {
  console.log(text );
  var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

  var tone_analyzer = new ToneAnalyzerV3({
    username: credentials.watsonCred.username,
    password: credentials.watsonCred.password,
    version_date: '2017-07-01'
  });

  var params = {
    text: text.Body,
    tones: 'emotion'
  };

  tone_analyzer.tone(params, function(error, response) {
    if (error) {
      console.log('error:', error);
      res.status(500).send(error)
    }
    else {

      // console.log(JSON.stringify(response, null, 2));
      var toneArray = response.document_tone.tone_categories[0].tones

      console.log(toneArray);

      var tones = toneArray.sort(function(a, b) {  (b.score * 100) - (a.score * 100)})
        .map(function(tone) {
          return (tone.tone_name + " : " + ((tone.score * 100).toFixed(2)) + "%")
        })

      res.status(200).send(`
        <Response>
          <Message>
            ${tones[0].toString()}
            ${tones[1].toString()}
            ${tones[2].toString()}
            ${tones[3].toString()}
            ${tones[4].toString()}
          </Message>
        </Response>`)
    }
  });
}

module.exports = {
  getTone: getTone,
  getToneServer: getToneServer
}
