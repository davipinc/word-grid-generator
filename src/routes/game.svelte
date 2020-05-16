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

	function getLetter(letter) {
		if (letter === 'Q') {
			return 'Qu';
		}
		return letter;
	}
	export async function preload() {
		const res = await this.fetch(`dice/classic.json`);
		const diceDefinition = await res.json();
		const grid = getGrid(diceDefinition.dice);
		return {
			grid,
			getLetter
		}
	}	
</script>

<script>
	export let grid;
	export let getLetter;
</script>

<h1>Game Grid</h1>

<section class="options">
	<label>Seed: <input type="text" value="apple"></label>
</section>

<section class="wrapper" role="grid">

	{#each grid as row}

		{#each row as cell}
		<button class="box" role="gridcell">{getLetter(cell)}</button>
		{/each}
	
	{/each}

</section>
