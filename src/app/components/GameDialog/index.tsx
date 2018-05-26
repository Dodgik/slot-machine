import * as React from 'react';
import * as style from './style.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';


export interface GameDialogProps {
  title: string;
  buttonTitle: string;
  open: boolean;
  onClose?: any;
}

export class GameDialog extends React.Component<GameDialogProps> {
  public static defaultProps: Partial<GameDialogProps> = {
    open: true,
  };
  
  render() {
    const { open, onClose, title, buttonTitle } = this.props;
    return (
      <Dialog
        open={open}
        onClose={onClose}
        classes={{ root: style.visible }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogActions classes={{ root: style.center }}>
          <Button variant="outlined" onClick={onClose}>{buttonTitle}</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default GameDialog;
