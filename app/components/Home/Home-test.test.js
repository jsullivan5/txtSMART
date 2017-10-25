import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';

describe('Home component', () => {
  it('should mount', () => {
    const wrapper = shallow(<Home />);

    expect(wrapper.find('.home-page').length).toBe(1);
  });
});
