import React, { Component } from 'react';
import { connect } from 'react-redux';
import Image from '../images/Image';
import PropTypes from 'prop-types';

const mapStateToProps = state => ({
  favorites: state.favorites.favorites
});

export class Favorite extends Component {
  render() {
    const favs = this.props.favorites.map(f => (
      <Image key={'f-' + f.id} url={f.url} animal={f.animal} id={f.id} fav />
    ));
    return <div className="images">{favs}</div>;
  }
}

Favorite.propTypes = {
  favorites: PropTypes.array.isRequired
};

export default connect(
  mapStateToProps,
  null
)(Favorite);
