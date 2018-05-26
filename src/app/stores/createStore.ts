import { History } from 'history';
import { GameStore } from './GameStore';
import { RouterStore } from './RouterStore';
import { STORE_GAME, STORE_ROUTER } from 'app/constants';

export function createStores(history: History) {
  const gameStore = new GameStore();
  const routerStore = new RouterStore(history);
  return {
    [STORE_GAME]: gameStore,
    [STORE_ROUTER]: routerStore
  };
}
