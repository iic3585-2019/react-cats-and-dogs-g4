import React from 'react';
import {
  startGame,
  endGame,
  getBreeds,
  fetchBreedImage,
  selectBreed,
  resetAnimals
} from '../../modules/game';
import { connect } from 'react-redux';

import SelectBreed from './SelectBreed';
import SelectAnimal from './SelectAnimal';
import Board from './Board';
import Results from './Results';

import Button from '@material-ui/core/Button';

const mapStateToProps = state => state.game;

const mapDispatchToProps = {
  startGame,
  endGame,
  getBreeds,
  fetchBreedImage,
  selectBreed,
  resetAnimals
};

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.props.getBreeds();
    this.start = this.start.bind(this);
  }

  async start() {
    this.props.startGame();
    const { animalSelected, breeds, breedSelected } = this.props;
    const selBreeds = breeds[animalSelected + 's'];
    let currentBreed = breedSelected;
    if (breedSelected === 'random') {
      const r = Math.floor(Math.random() * selBreeds.length);
      await this.props.selectBreed(selBreeds[r].id);
      currentBreed = selBreeds[r].id;
    }

    this.props.resetAnimals();

    this.props.fetchBreedImage(animalSelected, currentBreed);

    const extras = selBreeds.filter(a => a.id !== currentBreed);

    for (let i = 0; i < 11; i++) {
      const n = Math.floor(Math.random() * extras.length);
      const breed = extras.splice(n, 1)[0];
      this.props.fetchBreedImage(animalSelected, breed.id);
    }
  }

  render() {
    const { playing, endGame, breedsLoaded } = this.props;
    return (
      <div className="game-container">
        <SelectAnimal />
        <br />
        <SelectBreed />
        <br />
        <Button
          className="button"
          variant="contained"
          color="primary"
          onClick={this.start}
          disabled={playing || !breedsLoaded}>
          Start
        </Button>
        <br />
        <Button
          className="button"
          variant="contained"
          color="secondary"
          onClick={endGame}
          disabled={!playing}>
          Done
        </Button>
        <br />
        {playing ? (
          <h1>Which of these images contains the breed selected ?</h1>
        ) : null}
        <Board />
        <Results />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
