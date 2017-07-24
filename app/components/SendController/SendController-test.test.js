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
  }


  afterEach(() => {
    expect(fetchMock.calls().unmatched).toEqual([]);
    fetchMock.restore();
  });

  it('should mount', () => {
    const wrapper = shallow(<SendController />);

    expect(wrapper.find('form').length).toBe(1);
  })

  it('should send Data on submit', () => {
    fetchMock.get('/api/send/String', {
      status: 200,
      body: response
    });

    const onChange = jest.fn();
    const wrapper = mount(<SendController onChange={onChange}/>);
    const form = wrapper.find('form')
    const input = wrapper.find('textarea')

    expect(wrapper.state('sendText')).toEqual('')

    input.simulate('change', { target: { value: 'String' } })

    expect(wrapper.state('sendText')).toEqual('String')

    form.simulate('submit')

    expect(fetchMock.called()).toEqual(true);
    expect(fetchMock.lastUrl()).toEqual('/api/send/String');
  })
})
