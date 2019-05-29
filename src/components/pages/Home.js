import React, { Fragment } from 'react';

import Images from '../images/Images';
import Favorite from '../layout/Favorite';

const Home = () => (
  <Fragment>
    <h1>Home</h1>

    <Favorite />

    <Images />
  </Fragment>
);

export default Home;
