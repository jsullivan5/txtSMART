import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Header from './Header';
import Login from '../Login/Login';

describe('Header component', () => {
  const mockGetUserNum = jest.fn();
  const wrapper = shallow(<Header getUserNum={mockGetUserNum} />);

  it('should mount', () => {
    expect(wrapper.find('header').length).toBe(1)
  });
  it('should mount Login', () => {
    expect(wrapper.find(Login).length).toBe(1);
  });
})
