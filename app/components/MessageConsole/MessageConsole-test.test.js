import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import MessageConsole from './MessageConsole';
import { mockMsgList } from './MessageConsoleStubs'

describe('MessageConsole component', () => {
  it('should mount', () => {
    const wrapper = shallow(<MessageConsole
      messageList={mockMsgList} />);

    expect(wrapper.find('.message-console').length).toBe(1);
  })

  it('should display cards when given cards', () => {
    const mockFunc = jest.fn();
    const wrapper = mount(<MessageConsole
      messageList={mockMsgList} handleToneClick={mockFunc} />);

    expect(wrapper.find('.message-wrapper').length).toBe(2);
  })
})
