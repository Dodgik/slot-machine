import { observable } from 'mobx';

export class GameModel {
  readonly session: number;
  @observable public result: number[];
  @observable public isWin: boolean;

  constructor(result: number[], isWin: boolean = false) {
    this.session = GameModel.generateSession();
    this.result = result;
    this.isWin = isWin;
  }
  
  static generateSession() {
    return new Date().getTime();
  }
}

export default GameModel;
