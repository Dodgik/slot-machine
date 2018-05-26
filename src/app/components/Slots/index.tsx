import * as React from 'react';
import * as style from './style.css';
import Button from '@material-ui/core/Button';
import { Slot } from 'app/components/Slot';
import GameDialog from 'app/components/GameDialog';
import Grid from '@material-ui/core/Grid';


export interface SlotsProps {
  game?: any;
  getGame?: any;
  spinNumber?: number;
}

export interface SlotsState {
  openDialog: boolean;
}

export class Slots extends React.Component<SlotsProps, SlotsState> {
  public static defaultProps: Partial<SlotsProps> = {
    spinNumber: 3
  };

  constructor(props?: SlotsProps, context?: any) {
    super(props, context);    
    this.state = {
      openDialog: false,
    };
  }

  private handleClickPlayButton = () => {
    this.props.getGame();
  }

  private handleStopSlot = () => {
    if (!this.state.openDialog) {
      this.setState({ openDialog: true });
    }
  }
  private handleCloseDialog = () => {
    this.setState({ openDialog: false });
  }

  render() {
    const { result, session, isWin } = this.props.game;
    console.warn('Slots->render=', result, ' openDialog=', this.state.openDialog);
    return (
      <div>
        <Grid container wrap="nowrap" justify="center" direction="column" alignItems="center" spacing={24}>
          <Grid item className={style.slotMachineWrap} >
            <div className={style.slotMachine}>
              {result.map((res, i) => <Slot spins={this.props.spinNumber} digit={res} key={i} session={session} onStop={this.handleStopSlot} /> )}
            </div>
          </Grid>
          <Grid item className={style.actionWrap} >
            <Button variant="raised" className={style.playButton} onClick={this.handleClickPlayButton}>PLAY</Button>
          </Grid>
        </Grid>
        <GameDialog
          open={this.state.openDialog}
          onClose={this.handleCloseDialog}
          title={isWin ? "WINNER!!!" : "YOU LOSE :("}
          buttonTitle={isWin ? "PLAY AGAIN" : "TRY AGAIN"}
        />
      </div>
    );
  }
}


export default Slots;
