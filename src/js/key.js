import { getGrid } from './game.js';
import { grid } from './stores.js';

export function seedKeyDown(event, $dice, $seed) {
  if (event.code ==='Enter') {
    event.preventDefault();
  }

  grid.set(getGrid($dice, $seed));
}

export function cellKeyDown(event) {
  console.log(event.code);
}