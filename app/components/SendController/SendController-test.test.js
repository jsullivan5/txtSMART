import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import SendController from './SendController';
import fetchMock from 'fetch-mock';

describe('Send Controller component', () => {
  const response = {
    body: 'String',
    to: '5555555',
    from: '1111111',
    tone: '',
    toneView: false
  };

  afterEach(() => {
    expect(fetchMock.calls().unmatched).toEqual([]);
    fetchMock.restore();
  });

  it('should mount', () => {
    const wrapper = shallow(<SendController />);

    expect(wrapper.find('form').length).toBe(1);
  });

  it('should send Data on submit', () => {
    fetchMock.get('/api/send/String', {
      status: 200,
      body: response
    });

    const mockGetUserNum = jest.fn();
    const onChange = jest.fn();
    const wrapper = mount(<SendController onChange={onChange} getUserNum={mockGetUserNum} />);
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
