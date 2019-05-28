import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ( state.game );

class Results extends React.Component {

  render() {
    const {selections, animals, breedSelected, check} = this.props;
    if(check){
      for (let i = 0; i < selections.length; i++) {
        if((selections[i] === true && animals[i].breed !== breedSelected) || 
        (animals[i].breed === breedSelected && selections[i] === false)){
          return <h1>Fail</h1>;
        }
      }
      return <h1>Success</h1>;
    }
    return null;
  }
}

export default connect(
  mapStateToProps,
  null)(Results);