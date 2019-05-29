import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const mapStateToProps = state => ( state.game );

class Results extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      open: true,
    };
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({open: false});
  }

  componentDidUpdate(prevProps) {
    if(prevProps.submittedAnswer && !this.props.submittedAnswer && this.props.playing){
      console.log("change");
      this.setState({open: true});
    }
  };

  render() {
    const {selections, animals, breedSelected, submittedAnswer, playing} = this.props;
    const {open} = this.state;
    let title = 'Success!';
    let content = 'You did it!';
    if(submittedAnswer){
      for (let i = 0; i < selections.length; i++) {
        if((selections[i] === true && animals[i].breed !== breedSelected) || 
        (animals[i].breed === breedSelected && selections[i] === false)){
          title = 'Fail';
          content = 'The correct answer was the one(s) with the red border. You must only choice the correct anwsers.';
          break;
        }
      }
    }
    return (
      <Dialog
        open={!playing && submittedAnswer && open}
        onClose={this.handleClose}
      >
        <div>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{content}</DialogContentText>
          </DialogContent>
        </div>
      </Dialog>
    );
  }
}

export default connect(
  mapStateToProps,
  null)(Results);