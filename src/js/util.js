
export function getLetter(letter) {
  if (letter === 'Q') {
    return 'Qu';
  }
  return letter;
}

export function row(location) {
  if (typeof location !== 'string') {
    console.error('Expected a string', location);
    throw new Error('Weird location');
  }
  if (!location) {return -1;}
  return parseInt(location.split(':')[0], 10);
}

export function col(location) {
  if (typeof location !== 'string') {
    console.error('Expected a string', location);
    throw new Error('Weird location');
  }
  if (!location) {return -1;}
  return parseInt(location.split(':')[1], 10);
}