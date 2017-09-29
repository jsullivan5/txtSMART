/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import MessageConsole from './MessageConsole';
import { mockMsgList, mockUserNum, mockLocation, mockEmptyUserNum, mockEmptyList } from './MessageConsoleStubs'

describe.only('MessageConsole component', () => {
  const expectedContent = <p>We are either loading, or you havn&#39;t logged in with your number...</p>;

  it('should mount', () => {
    const wrapper = shallow(<MessageConsole
      messageList={mockMsgList}
      userNum={mockUserNum} />);

    expect(wrapper.find('.message-console').length).toBe(1);
  })

  it('should display cards when given cards', () => {
    const mockFunc = jest.fn();
    const wrapper = mount(<MessageConsole
      messageList={mockMsgList} handleToneClick={mockFunc} userNum={mockUserNum} />);

    expect(wrapper.find('.message-wrapper').length).toBe(2);
  })
  it('should display cards based on location', () => {
    const wrapper = mount(<MessageConsole
      messageList={mockMsgList}
      userNum={mockUserNum}
      location={mockLocation} />);
    expect(wrapper.find('.message-wrapper').length).toBe(1);
  })
  it('should render a loader when userNum is empty', () => {
    const wrapper = shallow(<MessageConsole
      messageList={mockMsgList}
      userNum={mockEmptyUserNum} />);

    expect(wrapper.contains(expectedContent)).toBe(true);
  })
  it('should render a loader when messageList is empty', () => {
    const wrapper = shallow(<MessageConsole
      messageList={mockEmptyList}
      userNum={mockUserNum} />);

    expect(wrapper.contains(expectedContent)).toBe(true);
  })

})
