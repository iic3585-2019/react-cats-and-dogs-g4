import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Image from '../images/Image';
import PropTypes from 'prop-types';

const mapStateToProps = state => ({
  favorites: state.favorites.favorites
});

class Favorite extends Component {
  render() {
    const favs = this.props.favorites.map(f => (
      <Image key={'f-' + f.id} url={f.url} animal={f.animal} id={f.id} fav />
    ));
    return (
      <Fragment>
        <div className="images">
          {favs.length > 0 ? (
            favs
          ) : (
            <p>Nothing here yet. Go ahead and add a favorite.</p>
          )}
        </div>
      </Fragment>
    );
  }
}

Favorite.propTypes = {
  favorites: PropTypes.array.isRequired
};

export default connect(
  mapStateToProps,
  null
)(Favorite);
