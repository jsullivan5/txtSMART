/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import Login from './Login';

describe('Login component', () => {
  it('should mount', () => {
    const wrapper = shallow(<Login />);

    expect(wrapper.find('form').length).toBe(1);
  });

  it('should send Data on submit', () => {


    const mockGetUserNum = jest.fn();
    const onChange = jest.fn();
    const wrapper = mount(<Login onChange={onChange} getUserNum={mockGetUserNum} />);
    const form = wrapper.find('form');
    const input = wrapper.find('#login');

    expect(wrapper.state('userNumLocal')).toEqual('');

    input.simulate('change', { target: { value: 'String' } });

    expect(wrapper.state('userNumLocal')).toEqual('String');

    form.simulate('submit');

    expect(mockGetUserNum).toHaveBeenCalledTimes(1);

    expect(wrapper.state('userNumLocal')).toEqual('');
  });
})
