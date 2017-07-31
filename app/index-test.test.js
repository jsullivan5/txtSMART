import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import Root from './index';

describe('root component', () => {
  it('should mount', () => {
    const wrapper = shallow(<StaticRouter>
      <Root /><)
    console.log(wrapper.debug());
  })
})
