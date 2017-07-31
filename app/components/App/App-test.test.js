import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import App from './App';
import { StaticRouter } from 'react-router';
import fetchMock from 'fetch-mock';
import { LocalStorageMock } from './App-stubs';

// fetchMock.get('/api/send/String', {
//   status: 200,
//   body: response
// });

describe('App component', () => {

global.localStorage = new LocalStorageMock;

  afterEach(() => {
    expect(fetchMock.calls().unmatched).toEqual([]);
    fetchMock.restore();
  });

  it('should mount', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find('main').length).toBe(1);
  })

  it('should be fully integrated', () => {
    const wrapper = mount(
      <StaticRouter>
        <App />
      </StaticRouter>
    )

    const messageNavLink = wrapper.find('nav').childAt(1)

    messageNavLink.simulate('click')

    console.log(wrapper.debug());


  })
})
