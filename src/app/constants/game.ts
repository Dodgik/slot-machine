export enum GameState {
  READY = 0,
  WIN,
  LOSS
}

export const GAME_STATE_TYPES = [
  GameState.READY,
  GameState.WIN,
  GameState.LOSS
];

export const GAME_STATE_TITLES = {
  [GameState.READY]: 'Ready',
  [GameState.WIN]: 'Win',
  [GameState.LOSS]: 'Loss'
};

export const GAME_STATE_LOCATION_HASH = {
  [GameState.READY]: '#',
  [GameState.WIN]: '#win',
  [GameState.LOSS]: '#loss'
};
