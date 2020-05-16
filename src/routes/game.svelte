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
}

.cell {
  background-color: honeydew;
  font-size: 6vmax;
	color: #02517c;
}

.button:hover {
	background-color: #246588;
	color:white;
}

.button:focus {
	background-color: #02517c;
	color: honeydew;
}

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

.buttons {
	margin-top: 0.5em;
}

.wrapper {
	width: 90%;
	display: grid;
	grid-gap: 1%;
	grid-template-columns: repeat(4, 25%);
}

.currentWord {
	font-size:2vmax;
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

	function getLetter(letter) {
		if (letter === 'Q') {
			return 'Qu';
		}
		return letter;
	}

	export let randomWords = [];
	export let diceDefinition;
	export let seed = randomWords.join(' ');
	export let currentWord = '';

	export let grid = getGrid(diceDefinition.dice, seed);

	function onKeyDown(event) {
		if (event.code ==='Enter') {
			event.preventDefault();
		}

		update();
	}

	export function clearWord() {
		currentWord = '';
	}

	let allWords = '';

	export function addWord() {
		if (!currentWord){
			return;
		}
		allWords = currentWord + '\n' + allWords;
		clearWord();
	}

	export async function randomise() {
		const words = await getWords();
		console.log(words);
		seed = words.join(' ');
		grid = getGrid(diceDefinition.dice, seed)		
	}

	export function update() {
		grid = getGrid(diceDefinition.dice, seed);
	}

	export function addLetterToCurrentWord(event) {
		const letter = event.srcElement.innerText;
		currentWord += letter.toLowerCase();
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
		getGameFromCurrentTime();
	});	
	
</script>

<section class="options">
	<label>Seed: <input type="text" class="seed" bind:value={seed} spellcheck="false" autocomplete="false" on:keydown={event => onKeyDown(event)}></label>
	<!-- <button on:click={update}>Update</button> -->
	<button on:click={getGameFromCurrentTime}>Current</button>
	<button on:click={randomise}>Random</button>
</section>

<section class="wrapper">

	{#each grid as row}

		{#each row as cell}
		<button class="button cell" role="button" aria-label="{getLetter(cell).toLowerCase()}" on:click={value => addLetterToCurrentWord(value)}>
			{getLetter(cell)}
		</button>
		{/each}
	
	{/each}

</section>

<section class="buttons">
	<button class="button cancel" role="button" aria-label="Cancel word" on:click={clearWord}>Cancel</button>
	<button class="button add" role="button" aria-label="Add word" on:click={addWord}>Add</button>
</section>

<section class="words">
	<input type="text" class="currentWord" bind:value={currentWord} spellcheck="false" autocomplete="false" placeholder="">
	<br>
	<textarea aria-label="Your word list" bind:value={allWords} placeholder="Your words"></textarea>
</section>