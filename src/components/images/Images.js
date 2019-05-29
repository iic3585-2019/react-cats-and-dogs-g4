import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchDogs } from '../../modules/dogs';
import { fetchCats } from '../../modules/cats';
import InfiniteScroll from 'react-infinite-scroll-component';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import Image from './Image';

const Images = ({ dogs: { dogs }, cats: { cats }, fetchDogs, fetchCats }) => {
  useEffect(() => {
    fetchDogs();
  }, [fetchDogs]);

  useEffect(() => {
    fetchCats();
  }, [fetchCats]);

  const dogImages = dogs.map((dog, index) => {
    return <Image animal="dog" key={index} url={dog} id={index} />;
  });

  const catImages = cats.map(cat => {
    return <Image animal="cat" key={cat[1]} id={cat[1]} url={cat[0]} />;
  });

  const bothImages = [];

  let aux = [];

  for (let i = 0; i < dogImages.length; i++) {
    aux.push(dogImages[i]);
    aux.push(catImages[i]);
    if (aux.length === 18) {
      bothImages.push(aux);
      aux = [];
    }
  }

  const fetchBoth = () => {
    fetchDogs();
    fetchCats();
  };

  return (
    <div className="images">
      <h1>Random dogs/cats</h1>
      <InfiniteScroll
        dataLength={dogImages.length}
        next={fetchBoth}
        hasMore={bothImages.length < 5}
        loader={<h4 key>Scroll down to load more...</h4>}
      />

      {bothImages.map((carouselImages, e) => (
        <Carousel
          key={'z' + e}
          autoPlay={10000}
          animationSpeed={5000}
          slidesPerPage={5}
          slidesPerScroll={1}
          infinite
          draggable={false}
          offset={5}
          centered
          arrows>
          {carouselImages}
        </Carousel>
      ))}
    </div>
  );
};

Images.propTypes = {
  dogs: PropTypes.object.isRequired,
  fetchDogs: PropTypes.func,
  fetchCats: PropTypes.func
};

const mapStateToProps = state => ({
  dogs: state.dogs,
  cats: state.cats
});

const mapDispatchToProps = { fetchDogs, fetchCats };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Images);
