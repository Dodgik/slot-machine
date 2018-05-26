import * as React from 'react';
import * as style from './style.css';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import Grid from '@material-ui/core/Grid';
import { Header } from 'app/components/Header';
import { Chance } from 'app/components/Chance';
import { Slots } from 'app/components/Slots';
import { GameStore } from 'app/stores';
import {
  STORE_GAME,
  STORE_ROUTER,
} from 'app/constants';

export interface GameAppProps extends RouteComponentProps<any> {

}

export interface GameAppState {

}

@inject(STORE_GAME, STORE_ROUTER)
@observer
export class GameApp extends React.Component<GameAppProps, GameAppState> {  
  render() {
    const gameStore = this.props[STORE_GAME] as GameStore;
    
    return (
      <div className={style.normal}>
        <Header />
        <Grid container wrap="nowrap" spacing={16} justify="center">
          <Grid item >
            <Chance chance={gameStore.chance} setChance={gameStore.setChance} />
          </Grid>
        </Grid>
        <Grid container wrap="nowrap" spacing={16} justify="center">
          <Grid item >
            <Slots game={gameStore.game} getGame={gameStore.getGame} spinNumber={gameStore.spinNumber} />
          </Grid>
        </Grid>
      </div>
    );
  }
}
