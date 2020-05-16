function getGrid(dice) {
	console.info('Loaded dice: ', dice);
	return [
		dice[0].split(''),
		dice[1].split(''),
		dice[2].split(''),
		dice[3].split(''),
		dice[4].split('')
	];
}

module.exports = {
	getGrid
};