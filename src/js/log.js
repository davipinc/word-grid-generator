import { words, board, grid, dice, seed } from '../js/stores.js'; 

export function logStateUpdates() {
  words.subscribe(value => {
    console.info('Updated words:', value);
  });

  board.subscribe(value => {
    console.info('Updated board:', value);
  });

  grid.subscribe(value => {
    console.info('Updated grid:', value);
  });

  dice.subscribe(value => {
    console.info('Updated dice:', value);
  });

  seed.subscribe(value => {
    console.info('Updated seed:', value);
  });
}