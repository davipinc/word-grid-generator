const { xmur3, sfc32, shuffleArray } = require("./rng");

const DEFAULT_SEED = 'foobar';

function getGrid(dice = [], seedString = DEFAULT_SEED) {
	// Create xmur3 state:
	const seed = xmur3(seedString);
	
	// Output four 32-bit hashes to provide the seed for sfc32.
	const rand = sfc32(seed(), seed(), seed(), seed());

	console.info('SEED:', seedString);

	// order the dice
	const shuffledDice = shuffleArray(dice, rand());

	const classicUsingDefaultSeed = shuffledDice[0] === 'AHMORS';
	const newUsingDefaultSeed = shuffledDice[0] === 'DEILRX';

	if (seedString === DEFAULT_SEED && !classicUsingDefaultSeed && !newUsingDefaultSeed) {
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
	console.log(arrayOfArrays);
	
	return arrayOfArrays;
}

module.exports = {
	getGrid
};