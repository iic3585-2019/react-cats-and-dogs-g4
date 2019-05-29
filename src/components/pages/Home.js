import React from 'react';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Images from '../images/Images';
import Favorite from '../layout/Favorite';

const Home = props => (
  <div>
    <h1>Home</h1>

    <Favorite />

    <p>
      <button onClick={() => props.changePage()}>
        Go to about page via redux
      </button>
    </p>

    <Images />
  </div>
);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: () => push('/about-us')
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(Home);
