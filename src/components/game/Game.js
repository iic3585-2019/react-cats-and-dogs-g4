import React from 'react';
import { startGame, endGame, getBreeds, fetchBreedImage } from '../../modules/game';
import { connect } from 'react-redux';

import SelectBreed from './SelectBreed';
import SelectAnimal from './SelectAnimal';
import Board from './Board';
import Results from './Results';

import Button from '@material-ui/core/Button';

const mapStateToProps = state => ( state.game );

const mapDispatchToProps = { startGame, endGame, getBreeds, fetchBreedImage };

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.props.getBreeds();
    this.start = this.start.bind(this);
  }

  start(){
    this.props.startGame(this.props.breedSelected);
    const {animalSelected, breedSelected, animals} = this.props;
    if(animals.length === 0){
      this.props.fetchBreedImage(animalSelected, breedSelected);

      const extras = this.props.breeds[animalSelected+'s']
      .filter(a => a.id !== breedSelected);
      
      for (let i = 0; i < 11; i++) {
        const n = Math.floor(Math.random() * extras.length);
        const breed = extras.splice(n, 1)[0];      
        this.props.fetchBreedImage(animalSelected, breed.id);
      }
    }
    
  }

  render(){
    return (
      <div className="game-container">
        <SelectAnimal />
        <br />
        <SelectBreed />
        <br />
        <Button
          className ="button"
          variant="contained"
          color="primary"
          onClick={this.start}
          disabled = {this.props.playing}>
          Start
        </Button>
        <br />
        <Button
          className ="button"
          variant="contained"
          color="secondary"
          onClick={this.props.endGame}
          disabled = {!this.props.playing}>
          Done
        </Button>
        <br />
        <Board />
        <Results />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Game);