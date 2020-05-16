<svelte:head>
	<title>Game</title>
</svelte:head>

<style>

/* https://gridbyexample.com/examples/example17/ */

.options {
	margin-bottom:1em;
}

.box {
  background-color: honeydew;
  color: #02517c;
  border-radius: 0.6em;
  font-size: 300%;
	width: 100px;
	height: 100px;
	font-family: Arial, Helvetica, sans-serif;
	border: 2px solid #02517c;
}

/* .box:nth-child(even) {

} */

.wrapper {
		width: 400px;
		display: grid;
		grid-gap: 10px;
		grid-template-columns: repeat(4, 100px);
}
</style>

<script context="module">
	import { getGrid } from './js/grid.js';	
	
	export async function getWords(self) {
		const useFetch = self ? self.fetch : fetch;
		const resWords = await useFetch('https://random-word-api.herokuapp.com/word?number=2&swear=0');
		let randomWords = await resWords.json();
		console.info('Random words: ', randomWords);
		return randomWords;
	}
 
	export async function preload() {
		let randomWords = await getWords(this);
		const resDice = await this.fetch(`dice/classic.json`);
		let diceDefinition = await resDice.json();
		console.info('Loaded dice: ', diceDefinition);
		return {
			randomWords,
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

	export let randomWords;
	export let diceDefinition;
	export let seed = randomWords.join(' ');
	export let grid = getGrid(diceDefinition.dice, seed);

	export async function randomise() {
		const words = await getWords();
		console.log(words);
		seed = words.join(' ');
		grid = getGrid(diceDefinition.dice, seed)		
	}

</script>

<h1>Game Grid</h1>

<section class="options">
	<label>Seed: <input type="text" bind:value={seed} spellcheck="false" autocomplete="false"></label>
	<button on:click={() => grid = getGrid(diceDefinition.dice, seed) }>Update</button>
	<button on:click={() => randomise()}>Randomise</button>
</section>


<section class="wrapper" role="grid">

	{#each grid as row}

		{#each row as cell}
		<button class="box" role="gridcell">{getLetter(cell)}</button>
		{/each}
	
	{/each}

</section>
