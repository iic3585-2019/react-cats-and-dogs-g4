import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchDogs } from '../../modules/dogs';
import InfiniteScroll from 'react-infinite-scroll-component';

const Images = ({ dogs: { dogs, loading }, fetchDogs }) => {
  useEffect(() => {
    fetchDogs();
  }, [fetchDogs]);

  const dogImages = dogs.map((dog, index) => {
    return <img key={index} src={dog} alt="A beautiful dog" />;
  });

  return (
    <div className="images">
      <h1>Random dogs</h1>
      <InfiniteScroll
        dataLength={dogImages.length}
        next={fetchDogs}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      />
      {dogImages}
    </div>
  );
};

Images.propTypes = {
  dogs: PropTypes.object.isRequired,
  fetchDogs: PropTypes.func
};

const mapStateToProps = state => ({
  dogs: state.dogs
});

const mapDispatchToProps = { fetchDogs };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Images);
