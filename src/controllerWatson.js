/* eslint global-require: 0 */
const config = require('./util/config');
const helpers = require('./responseHelper.js');

function getTone(req, res) {
  const requestBody = req.params.content;
  const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

  const toneAnalyzer = new ToneAnalyzerV3({
    username: config.watsonUserName,
    password: config.watsonPassword,
    version_date: '2017-07-01',
  });

  const params = {
    text: requestBody,
    tones: 'emotion',
  };

  toneAnalyzer.tone(params, (error, response) => {
    if (error) {
      console.log('error:', error);
      res.status(500).send(error);
    } else {
      console.log(JSON.stringify(response, null, 2));
      res.status(200).send(response);
    }
  });
}

function getToneServer(text, res) {
  const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

  const toneAnalyzer = new ToneAnalyzerV3({
    username: config.watsonUserName,
    password: config.watsonPassword,
    version_date: '2017-07-01',
  });

  const params = {
    text: text.Body,
    tones: 'emotion',
  };

  toneAnalyzer.tone(params, (error, response) => {
    if (error) {
      console.log('error:', error);
      res.status(500).send(error);
    } else {
      // console.log(JSON.stringify(response, null, 2));
      const toneArray = response.document_tone.tone_categories[0].tones;

      console.log(toneArray);

      const introText = helpers.getIntroText(toneArray);
      const tones = helpers.formatArray(toneArray);

      res.status(200).send(`
        <Response>
          <Message>
          ${introText.toString()}

          ${tones[0].toString()}
          ${tones[1].toString()}
          ${tones[2].toString()}
          ${tones[3].toString()}
          ${tones[4].toString()}

          For more insights, go to http://example.com
          </Message>
        </Response>`);
    }
  });
}

module.exports = {
  getTone,
  getToneServer,
};
