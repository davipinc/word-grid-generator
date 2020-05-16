<svelte:head>
	<title>Game</title>
</svelte:head>

<style>

/* https://gridbyexample.com/examples/example17/ */

.options {
	margin-bottom:1em;
}

.box {
  background-color: #444;
  color: #fff;
  border-radius: 5px;
  padding: 20px;
  font-size: 150%;
}

.box:nth-child(even) {
  background-color: #ccc;
  color: #000;
}

.wrapper {
		width: 400px;
		display: grid;
		grid-gap: 10px;
		grid-template-columns: repeat(4, 100px);
}
</style>

<script context="module">
	import { getGrid } from './js/grid.js';	
	export async function preload() {
		const resWords = await this.fetch('https://random-word-api.herokuapp.com/word?number=2&swear=0');
		let randomWords = await resWords.json();
		const resDice = await this.fetch(`dice/classic.json`);
		let diceDefinition = await resDice.json();
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

</script>

<h1>Game Grid</h1>

<section class="options">
	<label>Seed: <input type="text" bind:value={seed} spellcheck="false" autocomplete="false"></label>
	<button on:click={() => grid = getGrid(diceDefinition.dice, seed) }>Update</button>

</section>


<section class="wrapper" role="grid">

	{#each grid as row}

		{#each row as cell}
		<button class="box" role="gridcell">{getLetter(cell)}</button>
		{/each}
	
	{/each}

</section>
