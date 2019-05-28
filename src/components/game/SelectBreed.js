import React from 'react';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import { selectBreed } from '../../modules/game';

const mapDispatchToProps = { selectBreed };
const mapStateToProps = state => ( state.game );

class SelectBreed extends React.Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.selectBreed(event.target.value);
  }

  render() {
    if(!this.props.breeds){
      return null;
    }

    const {breedSelected} = this.props;

    return (
      <FormControl disabled = {this.props.playing}>
        <InputLabel htmlFor="breeds-selector">Breed</InputLabel>
        <Select
          className="menu-item"
          style= { { minWidth: 150, marginBottom: 20 } }
          value={breedSelected}
          onChange={this.handleChange}
          inputProps={{
            name: 'breeds',
            id: 'breeds-selector',
          }}
        >
          <MenuItem className="menu-item" key={-1} value="random"> - Random - </MenuItem>
          {
            this.props.animalSelected === "dog" ? 
            this.props.breeds.dogs.map(c => <MenuItem className="menu-item" key={c.id} value={c.id}>{c.name}</MenuItem>) : 
            this.props.breeds.cats.map(c => <MenuItem className="menu-item" key={c.id} value={c.id}>{c.name}</MenuItem>)
          }

        </Select>
      </FormControl>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(SelectBreed);

