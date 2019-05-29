import React from 'react';
import { connect } from 'react-redux';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { selectAnimal, selectBreed } from '../../modules/game';

const mapDispatchToProps = { selectAnimal, selectBreed };
const mapStateToProps = state => state.game;

class SelectAnimal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'dog'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ selected: event.target.value });
    this.props.selectAnimal(event.target.value);
    this.props.selectBreed('random');
  }

  render() {
    const { selected } = this.state;

    return (
      <FormControl disabled={this.props.playing}>
        <FormLabel>Animal</FormLabel>
        <RadioGroup name="animal" value={selected} onChange={this.handleChange}>
          <FormControlLabel value="dog" control={<Radio />} label="Dog" />
          <FormControlLabel value="cat" control={<Radio />} label="Cat" />
        </RadioGroup>
      </FormControl>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectAnimal);
