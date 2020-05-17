
export function getLetter(letter) {
  if (letter === 'Q') {
    return 'Qu';
  }
  return letter;
}

export function row(location) {
  if (!location) {return -1;}
  return parseInt(location.split(':')[0], 10);
}

export function col(location) {
  if (!location) {return -1;}
  return parseInt(location.split(':')[1], 10);
}