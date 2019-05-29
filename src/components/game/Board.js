import React from 'react';
import { connect } from 'react-redux';
import GameImage from './GameImage';

const mapStateToProps = state => state.game;

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.shuffleArray = this.shuffleArray.bind(this);
  }

  shuffleArray(original) {
    let array = original.slice(0);
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  render() {
    const { animals, selections } = this.props;
    if (selections.length === 12) {
      return (
        <div className="images">
          {animals.map((a, i) => (
            <GameImage url={a.url} id={i} key={i} breed={a.breed} selected={selections[i]}/>
          ))}
        </div>
      );
    }

    return null;
  }
}

export default connect(
  mapStateToProps,
  null
)(Board);
