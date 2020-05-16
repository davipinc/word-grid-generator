<svelte:head>
	<title>Game</title>
</svelte:head>

<style>

/* https://gridbyexample.com/examples/example17/ */

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
		width: 500px;
		display: grid;
		grid-gap: 10px;
		grid-template-columns: repeat(5, 100px);
}
</style>

<script context="module">
	import { getGrid } from './js/grid.js';

	export async function preload() {
		const res = await this.fetch(`dice/classic.json`);
		const diceDefinition = await res.json();
		const grid = getGrid(diceDefinition.dice);
		return {
			grid
		}
	}	
</script>

<script>
	export let grid;
</script>

<h1>Game Grid</h1>

<label>Seed: <input type="text" value="apple"></label>

<div class="wrapper" role="grid">

	{#each grid as row}

		{#each row as cell}
		<button class="box" role="gridcell">{cell}</button>
		{/each}
	
	{/each}

</div>
