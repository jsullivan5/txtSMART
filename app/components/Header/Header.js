import React from 'react';
import SendController from '../SendController/SendController';

const Header = ({ getUserNum }) => {
  return (
    <header>
      <h1>txt<span>SMART</span></h1>
      <nav>
        <button>Home</button>
        <button>How To</button>
      </nav>
      <SendController className='send-controller'
                      getUserNum={getUserNum}/>
    </header>
  );
}

export default Header;
