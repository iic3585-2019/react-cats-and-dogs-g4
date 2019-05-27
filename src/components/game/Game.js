import React from 'react';
import { startGame, endGame, getBreeds } from '../../modules/game';
import { connect } from 'react-redux';

import SelectBreed from './SelectBreed';
import SelectAnimal from './SelectAnimal';
import Button from '@material-ui/core/Button';

const mapStateToProps = state => ( state.game );

const mapDispatchToProps = { startGame, endGame, getBreeds };

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.props.getBreeds();
    this.start = this.start.bind(this);
  }

  start(){
    this.props.startGame(this.props.breedSelected);
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
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Game);