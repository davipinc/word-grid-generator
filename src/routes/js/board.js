import { words, board } from './stores.js';

export function reset() {
  words.set('');
  board.set({});		
}