import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { resultsSeen } from '../../modules/game';

const mapStateToProps = state => state.game;
const mapDispatchToProps = { resultsSeen };

class Results extends React.Component {


  render() {
    const {
      selections,
      animals,
      breedSelected,
      showResults,
      resultsSeen,
    } = this.props;
    let title = 'Success!';
    let content = 'You did it!';
    if (showResults) {
      for (let i = 0; i < selections.length; i++) {
        if (
          (selections[i] === true && animals[i].breed !== breedSelected) ||
          (animals[i].breed === breedSelected && selections[i] === false)
        ) {
          title = 'Fail';
          content =
            'The correct answer was the one(s) with the red border. You must only choice the correct answers.';
          break;
        }
      }
    }
    return (
      <Dialog
        open={showResults}
        onClose={resultsSeen}>
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
  mapDispatchToProps,
)(Results);
