import React from 'react';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from '../../modules/counter';

import Images from '../images/Images';


const Home = () => (
  <div>
    <img className="logo" src="logo.png"></img>
    <Images />
  </div>
);

export default Home;
