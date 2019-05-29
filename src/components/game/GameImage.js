import React from 'react';
import { connect } from 'react-redux';
import { selectImage } from '../../modules/game';

const mapDispatchToProps = { selectImage };
const mapStateToProps = state => state.game;

class GameImage extends React.Component {
  constructor(props) {
    super(props);
    this._clickImage = this._clickImage.bind(this);
  }

  _clickImage() {
    const { id, selectImage, playing, selected } = this.props;
    if (playing) {
      selectImage(id, !selected);
    }
  }

  render() {
    const { url, breed, breedSelected, submittedAnswer, selected } = this.props;
    return (
      <img
        className="image game"
        alt=""
        data-answer={breed === breedSelected && submittedAnswer}
        data-done={submittedAnswer}
        data-selected={selected}
        src={url}
        onClick={this._clickImage}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameImage);
