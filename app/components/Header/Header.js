import React from 'react';
import { NavLink } from 'react-router-dom';
import SendController from '../SendController/SendController';

const Header = ({ getUserNum, history }) => {
  console.log(history);

  history.listen()
  return (
    <header>
      <div>
        <h1>txt<span>SMART</span></h1>
        <p className='tag-line'>Say the right (or <span>wrong</span>) thing</p>
      </div>
      <nav>
        <NavLink exact to='/'
          activeClassName='selected'>
          Home
        </NavLink>
        <NavLink to='/messages'
          activeClassName='selected'>
          Messages
        </NavLink>
        <NavLink to='/community'
          activeClassName='selected'>
          Texts From Last Night
        </NavLink>
      </nav>
      <SendController className='send-controller'
                      getUserNum={getUserNum}/>
    </header>
  );
}

export default Header;
