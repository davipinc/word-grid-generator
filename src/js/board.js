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

export function updateLocation(newLoc, value) {
  board.update(board => {
    if (value === undefined || value === null) {
      delete board[newLoc];
    } else {
      board[newLoc] = value;
    }
    return board;
  });

  tabIndexes.update(tabIndexMap => {
    console.log('tabIndexMap', tabIndexMap);

    const HIDDEN = -1;

    // set everything to invisible to keyboard and ARIA (via -1 setting aria-hidden rule in HTML)
    for (let r = 0; r < maxRows; r += 1) {
      for (let c = 0; c < maxCols; c += 1) {
        tabIndexMap[getLocation(r,c)] = HIDDEN;
      }  
    }
    
    const tabIndexArray = [
      getLocation( row(newLoc),  col(newLoc)), // SELECTED
      getLocation( row(newLoc)-1, col(newLoc)-1), // NORTHWEST
      getLocation( row(newLoc)-1,  col(newLoc)), // NORTH
      getLocation( row(newLoc)-1, col(newLoc)+1), // NORTHEAST
      getLocation( row(newLoc), col(newLoc)+1), // EAST
      getLocation( row(newLoc)+1, col(newLoc)+1), // SOUTHEAST
      getLocation( row(newLoc)+1, col(newLoc)), // SOUTH
      getLocation( row(newLoc)+1, col(newLoc)-1), // SOUTHWEST
      getLocation( row(newLoc), col(newLoc)-1) // WEST
    ].filter( item => item !== '');

    tabIndexMap['action:cancel'] = 1;
    tabIndexMap['action:add'] = 2;

    const BUTTON_MAX_INDEX = 3;
    tabIndexArray.forEach((loc, i) => {
      if (board[loc] && newLoc !== loc) {
        // don't show currently selected (except the last letter)
        tabIndexMap[loc] = HIDDEN;
      } else {
        // show all valid placements, and the buttons
        tabIndexMap[loc] = i + BUTTON_MAX_INDEX;
      }
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
  const loc = element.dataset.location;
  const elementsSelected = getMap($board).length;
  const cellAlreadyLit = !!$board[loc];
  
  // apply rules
  if (elementsSelected > 0) {
    const lastElementIndex = elementsSelected-1;
    const lastElementLocation = getMap($board).filter( key => $board[key].index === lastElementIndex)[0];
    const withinOneRow = row(lastElementLocation) === row(loc) || row(lastElementLocation) === row(loc) + 1 || row(lastElementLocation) === row(loc) - 1;
    const withinOneCol = col(lastElementLocation) === col(loc) || col(lastElementLocation) === col(loc) + 1 || col(lastElementLocation) === col(loc) - 1;

    if (!withinOneRow || !withinOneCol) {
      console.warn('Not a valid move', lastElementLocation, loc);
      return;
    }

    if (cellAlreadyLit && $board[loc].index !== lastElementIndex) {
      console.warn('Can only remove the last chosen letter');
      return;
    }
  }

  if (cellAlreadyLit){
    updateLocation(loc, null);
  } else {
    updateLocation(loc, { letter, index: elementsSelected });
  }
}