<svelte:head>
	<title>Game</title>
</svelte:head>

<style>

/* https://gridbyexample.com/examples/example17/ */

.options {
	margin-bottom:1em;
}

.seed {
	width: 35%;
}
.button {
  border-radius: 0.3em;
  height: 7vmax;
	font-family: Arial, Helvetica, sans-serif;
	border: 1% solid #02517c;
	-moz-user-select: -moz-none;
	-khtml-user-select: none;
	-webkit-user-select: none;
	-ms-user-select: none;
	user-select: none;	
}

.cell {
  background-color: honeydew;
  font-size: 6vmax;
	color: #02517c;
}

.chosen {
	background-color: black;
	color: white;
}

.button:hover {
	opacity: 0.8;
}
/* 
.button:focus {
	background-color: #02517c;
	color: honeydew;
} */

.button {
	font-size: 4vmax;
}
.add {
	background-color: #4caf50;
	color: white;
}

.cancel {
	background-color: #f44336;
	color: white;
}


/* .cell:nth-child(even) {

} */



.wrapper {
	width: 90%;
	display: grid;
	grid-gap: 1%;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr 1fr;
}

.action {
  grid-row: 5; 
}

.action-left {
  grid-column: 1/3; 
}

.action-right {
  grid-column: 3/5; 
}

.words {
	margin-top: 1vmax;
}

textarea {
	width: 100%;
	margin-top: 1em;
	height: 10vmax
}

</style>

<script context="module">
	import { getGrid } from './js/grid.js';	
	
	export async function getWords(self) {
		const resWords = await fetch('https://random-word-api.herokuapp.com/word?number=1&swear=0');
		let randomWords = await resWords.json();
		console.info('Random words: ', randomWords);
		return randomWords;
	}
 
	export async function preload() {
		const resDice = await this.fetch(`dice/classic.json`);
		let diceDefinition = await resDice.json();
		console.info('Loaded dice: ', diceDefinition);
		return {
			diceDefinition
		}	
	}
</script>

<script>
	import { words, board } from './js/stores.js';
	import { reset } from './js/board.js';
	import { getLetter } from './js/util.js';

	words.subscribe(value => {
		console.info('Updated words:', value);
	});
	
	board.subscribe(value => {
		console.info('Updated board:', value);
	});

	import { writable, derived } from 'svelte/store';

	export let randomWords = [];
	export let diceDefinition;
	export let seed = randomWords.join(' ');

	export let grid = getGrid(diceDefinition.dice, seed);

	function seedKeyDown(event) {
		if (event.code ==='Enter') {
			event.preventDefault();
		}

		update();
	}

	function cellKeyDown(event) {
		console.log(event.code);
	}

	export function clearWord() {
		board.set({});
	}


	function getCurrentWord() {
		return Object.keys($board).map( key => $board[key].letter ).join('');
	}

	function addWord() {
		const currentWord = getCurrentWord();
		const SPACER = ', ';
		if (!currentWord){
			return;
		}

		words.update(contents => {
			const alreadyLogged = contents === currentWord || contents.indexOf(SPACER + currentWord) >= 0;
		
			if (alreadyLogged) {
				console.info('Already found', currentWord);
				return;
			}

			return contents + (contents.length ? SPACER : '') + currentWord.toUpperCase();
		});


		clearWord();
	}

	function updateLocation(location, value) {
		board.update(board => {
			if (!value) {
				delete board[location];
			} else {
				board[location] = value;
			}
			return board;
		});
	}

	async function randomise() {
		reset();
		const words = await getWords();
		console.log(words);
		seed = words.join(' ');
		grid = getGrid(diceDefinition.dice, seed)		
	}

	function update() {
		grid = getGrid(diceDefinition.dice, seed);
	}

	function row(location) {
		if (!location) {return -1;}
		return parseInt(location.split(':')[0], 10);
	}

	function col(location) {
		if (!location) {return -1;}
		return parseInt(location.split(':')[1], 10);
	}

	function getMap() {
		return Object.keys($board).filter( key => $board[key] !== undefined)		
	}

	export function toggleLetter(event) {
		const element = event.srcElement;
		const letter = element.innerText;
		const location = element.dataset.location;
		const elementsSelected = getMap().length;
		const cellAlreadyLit = !!$board[location];
		
		// apply rules
		if (elementsSelected > 0) {
			const lastElementIndex = elementsSelected-1;
			const lastElementLocation = getMap().filter( key => $board[key].index === lastElementIndex)[0];
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

		console.log($board);
	}

	import { onMount } from 'svelte';

	async function getTheTime() {
		const res = await fetch(`https://worldtimeapi.org/api/timezone/Europe/London`);
		const timeDetails = await res.json();
		return timeDetails;
	}
	
	function getGameFromCurrentTime() {
		getTheTime().then(timeDetails => {
			const timeRoundedDownTenMinutes = `${timeDetails.utc_datetime.substring(0,15)}0`;
			console.info('Game Time', timeRoundedDownTenMinutes);
			seed = timeRoundedDownTenMinutes;
			update();
		});
	}

	onMount(async () => {
		reset();
		getGameFromCurrentTime();
	});
	
</script>

<section class="options">
	<label>Seed: <input type="text" class="seed" bind:value={seed} spellcheck="false" autocomplete="false" on:keydown={event => seedKeyDown(event)}></label>
	<button on:click={getGameFromCurrentTime}>Current</button>
	<button on:click={randomise}>Random</button>
</section>

<section class="wrapper">

	{#each grid as row, rowIndex}

		{#each row as cell, cellIndex}
		<button 
			class="button cell {$board[rowIndex + ':' + cellIndex] ? 'chosen' : '' }"
			data-location="{rowIndex + ':' + cellIndex}"
			role="button"
			aria-label="{getLetter(cell).toLowerCase()}"
			on:click={value => toggleLetter(value)}
			on:keydown={event => cellKeyDown(event)}>
			{getLetter(cell)}
		</button>
		{/each}
	
	{/each}

	<button class="button action action-left cancel" role="button" aria-label="Cancel word" on:click={clearWord}>Cancel</button>
	<button class="button action action-right add" role="button" aria-label="Add word" on:click={addWord}>Add</button>

</section>


<section class="words">
	<textarea aria-label="Your word list" bind:value={$words} placeholder="Your words" autocompete="false"></textarea>
</section>

<!-- <input value={JSON.stringify($board['0:0'])}>
<input value={JSON.stringify($board)}> -->