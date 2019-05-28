import React from 'react';
import { connect } from 'react-redux';
import { selectImage } from '../../modules/game';

const mapDispatchToProps = { selectImage };
const mapStateToProps = state => ( state.game );

class GameImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
    }
    this._clickImage = this._clickImage.bind(this);
  }

  _clickImage(){
    const { selected } = this.state;
    const { id, selectImage, playing } = this.props;
    if (playing){
      if(!selected) {
        this.setState({selected: true});
      } else {
        this.setState({selected: false});
      }
      selectImage(id, !selected);
    }
    
  }

  render() {
    const {url, breed, breedSelected, check} = this.props;
    const {selected} = this.state;
    return(
      <img className="image game" alt=""
        data-answer={breed === breedSelected && check}
        data-done={check}
      data-selected={selected} src={url} onClick={this._clickImage} />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(GameImage);