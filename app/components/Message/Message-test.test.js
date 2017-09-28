/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Message from './Message'

import { mockDataSend, mockDataRecieve, mockDataToneView } from './MessageTestStubs'

const mockClickFunc = jest.fn()

describe('Message component', () => {
  it('should mount', () => {
    const wrapper = shallow(<Message messageData={mockDataSend}
      handleToneClick={mockClickFunc}/>)

    expect(wrapper.find('.message-wrapper').length).toBe(1)
  })

  it('should display the message', () => {
    const wrapper = shallow(<Message messageData={mockDataSend}
      handleToneClick={mockClickFunc}/>)

    expect(wrapper.contains(<p>hello</p>)).toBe(true)
  })

  it('should give a className based on what number sent the message', () => {
    const wrapper = shallow(<Message messageData={mockDataSend}
      handleToneClick={mockClickFunc}/>)

    const wrapper2 = shallow(<Message messageData={mockDataRecieve}
      handleToneClick={mockClickFunc}/>)

      expect(wrapper.find('.send').length).toBe(1)
      expect(wrapper.find('.receive').length).toBe(0)

      expect(wrapper2.find('.send').length).toBe(0)
      expect(wrapper2.find('.receive').length).toBe(1)
  })

  it('should display a tone only when toneView is true', () => {
    const wrapper = shallow(<Message messageData={mockDataSend}
      handleToneClick={mockClickFunc}/>)

    expect(wrapper.contains(<p>happy: 5</p>)).toBe(false)

    const wrapper2 = shallow(<Message messageData={mockDataToneView}
      handleToneClick={mockClickFunc}/>)

    expect(wrapper2.contains(<p>happy: 5</p>)).toBe(true)
  })

  it('should fire a function when message is clicked', () => {
    const mockClickFunc1 = jest.fn()

    const wrapper = shallow(<Message messageData={mockDataToneView}
      handleToneClick={mockClickFunc1}/>)

    const message = wrapper.find('.send')

    expect(mockClickFunc1).toHaveBeenCalledTimes(0)

    message.simulate('click')

    expect(mockClickFunc1).toHaveBeenCalledTimes(1)
  })
})
