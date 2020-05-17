import { words, board, tabIndexes } from './stores.js';
import { row, col } from './util.js';

const maxRows = 4;
const maxCols = 4;

export function clearWord() {
  tabIndexes.set({});
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

function getLocation(row, col) {
  if (row < 0 || row > maxRows-1) {return '';}
  if (col < 0 || col > maxCols-1) {return '';}
  return `${row}:${col}`;
}

export function updateLocation(location, value) {
  board.update(board => {
    if (value === undefined || value === null) {
      delete board[location];
    } else {
      board[location] = value;
    }
    return board;
  });

  tabIndexes.update(tabIndexMap => {
    console.log('tabIndexMap', tabIndexMap);
    const board = {};
    
    const tabIndexArray = [
      getLocation( row(location),  col(location)), // SELECTED
      getLocation( row(location)-1, col(location)-1), // NORTHWEST
      getLocation( row(location)-1,  col(location)), // NORTH
      getLocation( row(location)-1, col(location)+1), // NORTHEAST
      getLocation( row(location), col(location)+1), // EAST
      getLocation( row(location)+1, col(location)+1), // SOUTHEAST
      getLocation( row(location)+1, col(location)), // SOUTH
      getLocation( row(location)+1, col(location)-1), // SOUTHWEST
      getLocation( row(location), col(location)-1) // WEST
    ].filter( item => item !== '');

    tabIndexMap['action:cancel'] = 1;
    tabIndexMap['action:add'] = 2;

    const BUTTON_MAX_INDEX = 3;
    tabIndexArray.forEach((location, i) => {
      tabIndexMap[location] = i + BUTTON_MAX_INDEX;
    });
    
    return tabIndexMap;
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