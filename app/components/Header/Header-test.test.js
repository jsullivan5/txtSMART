import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Header from './Header'
import SendController from '../SendController/SendController'

describe('Header component', () => {
  const mockGetUserNum = jest.fn();
  const wrapper = shallow(<Header getUserNum={mockGetUserNum} />);
  
  it('should mount', () => {
    expect(wrapper.find('header').length).toBe(1)
  });
  it('should mount SendController', () => {
    expect(wrapper.find(SendController).length).toBe(1);
  });
})
