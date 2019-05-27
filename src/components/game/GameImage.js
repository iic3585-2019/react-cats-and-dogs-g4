import React from 'react';

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
    if(!selected) {
      this.setState({selected: true});
    } else {
      this.setState({selected: false});
    }
  }

  render() {
    const {url, breed} = this.props;
    <img className="image game" src={url} onClick={this._clickImage} />
  }
}