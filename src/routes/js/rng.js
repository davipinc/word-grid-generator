// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript

function xmur3(str) {
  for(var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353),
      h = h << 13 | h >>> 19;
  return function() {
      h = Math.imul(h ^ h >>> 16, 2246822507);
      h = Math.imul(h ^ h >>> 13, 3266489909);
      return (h ^= h >>> 16) >>> 0;
  }
}

// Output one 32-bit hash to provide the seed for mulberry32.
// const rand = mulberry32(seed());
function mulberry32(a) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}
  
function sfc32(a, b, c, d) {
  return function() {
    a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0; 
    var t = (a + b) | 0;
    a = b ^ b >>> 9;
    b = c + (c << 3) | 0;
    c = (c << 21 | c >>> 11);
    d = d + 1 | 0;
    t = t + d | 0;
    c = c + t | 0;
    return (t >>> 0) / 4294967296;
  }
}

// https://stackoverflow.com/a/12646864
function shuffleArray(sourceArray, randomNumber) {
  const array = sourceArray.slice(0);
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(randomNumber * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array.reverse();
}

module.exports = {
  xmur3,
  mulberry32,
  sfc32,
  shuffleArray
} 