import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Favorite } from './Favorite';
import Image from '../images/Image';

configure({ adapter: new Adapter() });

describe('<Favorite />', () => {
  let wrapper;
  let favorites = [];

  beforeEach(() => {
    wrapper = shallow(<Favorite favorites={favorites} />);
  });

  it('should render no Image if there are no favorites', () => {
    favorites = [];

    wrapper.setProps({
      favorites
    });

    expect(wrapper.find(Image)).toHaveLength(0);
  });

  it('should render three Image components if there are three favorites', () => {
    favorites = [
      {
        id: 1,
        animal: 'dog',
        url: 'some-url'
      },
      {
        id: 2,
        animal: 'cat',
        url: 'some-url'
      },
      {
        id: 3,
        animal: 'dog',
        url: 'some-url'
      }
    ];

    wrapper.setProps({
      favorites
    });

    expect(wrapper.find(Image)).toHaveLength(3);
  });
});
