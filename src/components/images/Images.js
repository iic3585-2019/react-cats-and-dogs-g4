import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchDogs } from '../../modules/dogs';
import { fetchCats } from '../../modules/cats';
import InfiniteScroll from 'react-infinite-scroll-component';
import Image from './Image';
import Slider from 'react-slick';

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

  let carouselImages = [];

  for (let i = 0; i < dogImages.length; i++) {
    carouselImages.push(dogImages[i]);
    carouselImages.push(catImages[i]);
    if (carouselImages.length === 18) {
      bothImages.push(carouselImages);
      carouselImages = [];
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

      {bothImages.map((sliderImages, i) => (
        <Slider
          infinite
          accesibility="false"
          autoplay
          swipeToSlide
          variableWidth
          key={i}>
          {sliderImages}
        </Slider>
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
