import { words, board, grid } from './stores.js';
import { getGrid } from './grid.js';

export function reset() {
  words.set('');
  board.set({});
  grid.set([]);		
}
