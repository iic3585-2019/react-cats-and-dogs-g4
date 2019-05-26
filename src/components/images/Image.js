import React from 'react';
import { addFavorite, removeFavorite } from '../../modules/favorites';
import { connect } from 'react-redux';

class Image extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fav: this.props.fav ? true : false,
    }
    this._clickImage = this._clickImage.bind(this);
  }
  
  _clickImage(){
    const {animal, url, id} = this.props;
    if(!this.state.fav){
      this.props.addFavorite(url, animal, id);
      this.setState({ fav: true });
    } else {
      this.props.removeFavorite(id);
      this.setState({ fav: false });
    }
  }

  render(){
    
    const {animal, url} = this.props;
    if(!this.state.fav) {
      return <span className="img-container"><img className={animal+" image"} src={url} alt={(animal === "dog") ? "A beautiful dog" : "A cute cat"} onClick={this._clickImage} /></span>;
    } else {
      return (
        <div className="img-container">
          <div className="fav">♥</div>
          <img className={animal+" image"} src={url} alt={(animal === "dog") ? "A beautiful dog" : "A cute cat"} onClick={this._clickImage} />
        </div>);
    }
    
  }

  componentDidUpdate(prevProps) {
    if(prevProps.favorites.length !== this.props.favorites.length){
      const fav = this.props.favorites.filter(f => f.id === this.props.id).length > 0 ? true : false;
      if(fav){
        this.setState({ fav: true});
      } else {
        this.setState({ fav: false});
      }
    }
  }
  
};

const mapStateToProps = state => ({
  favorites: state.favorites.favorites,
});
const mapDispatchToProps = { addFavorite, removeFavorite };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Image);
