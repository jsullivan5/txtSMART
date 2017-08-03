# txtSmart

## Installation

  1. Clone this repo.
  2. run npm Install.
  3. Sign up for a free Twilio SMS number.
    [TwilioSignup](https://www.twilio.com)

  4. Sign up for IBM Bluemix and request to use the Watson API
    [Develop With Watson](https://www.ibm.com/watson/developer/)
  5. Create a file in the root directory called credentials.js

      a. Have it follow this template:

      //Watson credentials

      var watsonCred = {
        "url": "https://gateway.watsonplatform.net/tone-analyzer/api",
        "username": {Your Watson username},
        "password": {Your Watson password}
      }

      //Twilio Live Credentials

      var sidLive = {Your Twilio SID};

      var liveToken = {Your Twilio Auth Token};


      module.exports = {
        watsonCred: watsonCred,
        sidLive: sidLive,
        liveToken: liveToken
      }

  6. Run npm start.

## Objective

This app attempts to remove some of the ambiguity from reading and writing text messages.  A number was set up via Twilio that receives text messages from a user, sends off that data to Watson, and within seconds, the user receives a message from my application with sentiment analysis for the submitted content.

Furthermore, I created a community page where users can preface their text with '#submit' to be featured in the community page.  This was meant to gauge how people are using the app and to provide a social aspect.  Test users seemed to enjoy sending absurd and funny things to the app, and the community page provides an outlet for people to do that.

## Future Iterations

I would like to build out a database for this app to securely store user data and messages.  Given the time constraints on this project, I was unable to find the time.  That being said, future iterations will store user data and texts as they come in.  This will release me from relying on pulling the number's history on load.  

I would also like to build out a more robust community page.  This may feature categories and community upvoting.  I would also like to push this site to production.  and leave the number up for people to use.  This would only be viable with a database.  

I would also like to add sentiment and personality analytics for entire threads.  This is possible with the Watson API, just not with time constraints presently.

## Challenges

This was my first project that I had to build a back end with.  learning how to coordinate calls between the client side and API took some getting used to.  

Furthermore, parsing how to use these API's was a challenge in and of itself.  Each had a unique helper library and vast documentation to go through.  

All and all, it was a lot of fun to build and I hope you enjoy it.  
