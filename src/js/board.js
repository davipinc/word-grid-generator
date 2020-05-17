import { words, board, grid } from './stores.js';
import { getGrid } from './grid.js';

export function reset() {
  words.set('');
  board.set({});
  grid.set([]);		
}

export function update($dice, $seed) {
  grid.set(getGrid($dice, $seed));
}

export function clearWord() {
  board.set({});
}

function getCurrentWord($board) {
  return Object.keys($board).map( key => $board[key].letter ).join('');
}

export function addWord($board) {
  const currentWord = getCurrentWord($board);
  const SPACER = ', ';
  if (!currentWord){
    return;
  }

  words.update(contents => {
    const alreadyLogged = contents === currentWord || contents.indexOf(SPACER + currentWord) >= 0;
  
    if (alreadyLogged) {
      console.info('Already found', currentWord);
      return contents;
    }

    return contents + (contents.length ? SPACER : '') + currentWord.toUpperCase();
  });


  clearWord();
}