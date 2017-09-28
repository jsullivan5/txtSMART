/* eslint-disable */
import ReactDOM from 'react-dom';
import React from 'react';
import { StaticRouter } from 'react-router';
import { shallow, mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import App from './App';
import { LocalStorageMock } from './App-stubs';

describe('App component', () => {
  global.localStorage = new LocalStorageMock();

  afterEach(() => {
    expect(fetchMock.calls().unmatched).toEqual([]);
    fetchMock.restore();
  });

  it('should mount', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find('main').length).toBe(1);
  });

  it('should be fully integrated', () => {
    const wrapper = mount(
      <StaticRouter>
        <App />
      </StaticRouter>,
    );

    const messageNavLink = wrapper.find('nav').childAt(1);

    messageNavLink.simulate('click');
  });
});
