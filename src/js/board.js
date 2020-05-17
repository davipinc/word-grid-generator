import { words, board, grid } from './stores.js';
import { getGrid } from './grid.js';
import { row, col } from './util.js';

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

export function updateLocation(location, value) {
  board.update(board => {
    if (!value) {
      delete board[location];
    } else {
      board[location] = value;
    }
    return board;
  });
}

function getMap($board) {
  return Object.keys($board).filter( key => $board[key] !== undefined)		
}

export function toggleLetter(event, $board) {
  const element = event.srcElement;
  const letter = element.innerText;
  const location = element.dataset.location;
  const elementsSelected = getMap($board).length;
  const cellAlreadyLit = !!$board[location];
  
  // apply rules
  if (elementsSelected > 0) {
    const lastElementIndex = elementsSelected-1;
    const lastElementLocation = getMap($board).filter( key => $board[key].index === lastElementIndex)[0];
    const withinOneRow = row(lastElementLocation) === row(location) || row(lastElementLocation) === row(location) + 1 || row(lastElementLocation) === row(location) - 1;
    const withinOneCol = col(lastElementLocation) === col(location) || col(lastElementLocation) === col(location) + 1 || col(lastElementLocation) === col(location) - 1;

    if (!withinOneRow || !withinOneCol) {
      console.warn('Not a valid move', lastElementLocation, location);
      return;
    }

    if (cellAlreadyLit && $board[location].index !== lastElementIndex) {
      console.warn('Can only remove the last chosen letter');
      return;
    }
  }

  if (cellAlreadyLit){
    updateLocation(location, null);
  } else {
    updateLocation(location, { letter, index: elementsSelected });
  }
}