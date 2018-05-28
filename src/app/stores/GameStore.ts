import { observable, action } from 'mobx';
import { GameModel } from 'app/models';

export class GameStore {
  constructor() {
    this.game = new GameModel(this.getRandomResult(), false);
  }

  @observable public game: GameModel;

  @observable public chance: number = 5;

  @observable public slotsNumber: number = 3;

  @observable public spinNumber: number = 6;
  
  @action
  setChance = (chance: number): void => {
    this.chance = chance;
  };

  @action
  setSlotsNumber = (slotsNumber: number): void => {
    this.slotsNumber = slotsNumber;
  };

  @action
  getGame = (): void => {
    this.game = this.generateGame();
  };

    
  private getRandomDigit = () => Math.floor(Math.random() * 8 + 1)

  private getRandomResult = () => Array.from({ length: this.slotsNumber }, () => this.getRandomDigit())

  private getWinResult = () => new Array(this.slotsNumber).fill(7)

  private generateGame = () => {
    const chance = Math.floor(Math.random() * 100);
    if (chance >= this.chance) {
      return new GameModel(this.getRandomResult(), false);
    } else {
      return new GameModel(this.getWinResult(), true);
    }
  }

}

export default GameStore;
