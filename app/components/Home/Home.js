import React from 'react';

const Home = () => {
  return (
    <article className='home-page'>
      <h2>Welcome to txtSMART!</h2>
      <p>Texting can be hard.  "What did he mean by that?" "What is she trying to say"</p>
      <h4>Fortunately, we've got your back.</h4>
      <p>Text us anytime at <span className='inline-number'>(817)-873-2313</span> to get your message content analyzed by Watson.</p>
      <h4>You know, the machine that won Jeopardy..</h4>
      <p>To get started</p>
      <ul>
        <li>Send us a text at <span className='inline-number'>(817)-873-2313</span></li>
        <li>Login with your phone number to see your text history.  Area code first.  No spaces.</li>
        <li>Click on a message to reload the analysis</li>
        <li>Stop saying the wrong things when texting.  Or say the wrong things the right way!</li>
      </ul>
      <h3>Check Out our text from last night section to see how everyone else is using the app.</h3>
      <h2>Submit your best texts by resending your messsage with <span className='submit-cue'>#submit</span> to get added to the Hall of Fame</h2>
    </article>
  );
}

export default Home;
