// import { update } from './board.js';

export function seedKeyDown(event) {
  if (event.code ==='Enter') {
    event.preventDefault();
  }

  // TODO: restore update();
}

export function cellKeyDown(event) {
  console.log(event.code);
}