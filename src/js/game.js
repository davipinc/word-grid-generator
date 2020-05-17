import { xmur3, sfc32, shuffleArray } from './rng.js'; 
import { getTheTime, getWords } from './api.js';
import { getDice } from './data.js';
import { words, board, seed, grid, dice, tabIndexes } from './stores.js';
import { logStateUpdates } from './log.js';

const DEFAULT_SEED = 'foobar';

export async function init () {
	logStateUpdates();
	getDice('classic').then( diceDefinition => {
		dice.set(diceDefinition.dice);
		getGameFromCurrentTime(diceDefinition.dice);
	});
}

export function reset() {
  words.set('');
  board.set({});
	grid.set([]);
	tabIndexes.set({});
}

function simplifyString(seedString) {
	return seedString.toLowerCase().replace(/\s+/g, '-');
}

export function getGrid(dice = [], seedString = DEFAULT_SEED) {
	// Create xmur3 state:
	const simplerSeedString = simplifyString(seedString);
	const seed = xmur3(simplerSeedString);

	if (!dice.length) {
		debugger;
	}

	// Output four 32-bit hashes to provide the seed for sfc32.
	const rand = sfc32(seed(), seed(), seed(), seed());

	console.info('SEED:', simplerSeedString);

	// order the dice
	const shuffledDice = shuffleArray(dice, rand());

	const classicUsingDefaultSeed = shuffledDice[0] === 'AHMORS';
	const newUsingDefaultSeed = shuffledDice[0] === 'DEILRX';

	if (simplerSeedString === DEFAULT_SEED && !classicUsingDefaultSeed && !newUsingDefaultSeed) {
		console.warn('Something is wrong with the random number seed');
	}

	// roll the dice
	const rolledDice = dice.map( dieString => {
		const sideIndex = Math.floor(rand() * ((6 - 1) + 1));
		return dieString.charAt(sideIndex);
	})

	const ROW_SIZE = 4;
	const arrayOfArrays = [];
	for (let i=0; i < rolledDice.length; i+=ROW_SIZE) {
		arrayOfArrays.push(rolledDice.slice(i,i+ROW_SIZE));
	}
	
	return arrayOfArrays;
}
	
export function getGameFromCurrentTime($dice) {
	getTheTime().then(timeDetails => {
		const timeRoundedDownTenMinutes = `${timeDetails.utc_datetime.substring(0,15)}0`;
		console.info('Game Time', timeRoundedDownTenMinutes);
		seed.set(timeRoundedDownTenMinutes);
		grid.set(getGrid($dice, timeRoundedDownTenMinutes));
	});
}

export async function getGameFromRandomWords($dice) {
	// reset();
	const words = await getWords();
	const newSeed = words.join(' ');
	seed.set(newSeed);
	grid.set(getGrid($dice, newSeed));
}
