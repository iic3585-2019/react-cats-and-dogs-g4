import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchDogs } from '../../modules/dogs';
import { fetchCats } from '../../modules/cats';
import InfiniteScroll from 'react-infinite-scroll-component';

const Images = ({ dogs: { dogs, loading }, cats: {cats}, fetchDogs, fetchCats }) => {

  useEffect(() => {
    fetchDogs();
  }, [fetchDogs]);

  useEffect(() => {
    fetchCats();
  }, [fetchCats]);

  const dogImages = dogs.map((dog, index) => {
    return <img className="dog" key={index} src={dog} alt="A beautiful dog" />;
  });

  const catImages = cats.map(cat => {
    return <img className="cat" key={cat[1]} src={cat[0]} alt="A cute cat" />;
  });
  

  const bothImages = []
  for (let i = 0; i < dogImages.length; i++) {
    bothImages.push(dogImages[i]);
    bothImages.push(catImages[i]);
  }
  
  const fetchBoth = () => {
    fetchDogs();
    fetchCats();
  }

  return (
    <div className="images">
      <h1>Random dogs/cats</h1>
      <InfiniteScroll
        dataLength={dogImages.length}
        next={fetchBoth}
        hasMore={true}
        loader={<h4 key>Loading...</h4>}
      />
      {bothImages}
    </div>
  );
};

Images.propTypes = {
  dogs: PropTypes.object.isRequired,
  fetchDogs: PropTypes.func,
  fecthCats: PropTypes.func,
};

const mapStateToProps = state => ({
  dogs: state.dogs,
  cats: state.cats,
});

const mapDispatchToProps = { fetchDogs, fetchCats };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Images);
