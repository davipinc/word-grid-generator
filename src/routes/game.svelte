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

<div class="wrapper" role="grid">
	<button class="box" role="gridcell">{grid[0][0]}</button>
	<button class="box" role="gridcell">{grid[0][1]}</button>
	<button class="box" role="gridcell">{grid[0][2]}</button>
	<button class="box" role="gridcell">{grid[0][3]}</button>
	<button class="box" role="gridcell">{grid[0][4]}</button>

	<button class="box" role="gridcell">{grid[1][0]}</button>
	<button class="box" role="gridcell">{grid[1][1]}</button>
	<button class="box" role="gridcell">{grid[1][2]}</button>
	<button class="box" role="gridcell">{grid[1][3]}</button>
	<button class="box" role="gridcell">{grid[1][4]}</button>

	<button class="box" role="gridcell">{grid[2][0]}</button>
	<button class="box" role="gridcell">{grid[2][1]}</button>
	<button class="box" role="gridcell">{grid[2][2]}</button>
	<button class="box" role="gridcell">{grid[2][3]}</button>
	<button class="box" role="gridcell">{grid[2][4]}</button>

	<button class="box" role="gridcell">{grid[3][0]}</button>
	<button class="box" role="gridcell">{grid[3][1]}</button>
	<button class="box" role="gridcell">{grid[3][2]}</button>
	<button class="box" role="gridcell">{grid[3][3]}</button>
	<button class="box" role="gridcell">{grid[3][4]}</button>

	<button class="box" role="gridcell">{grid[4][0]}</button>
	<button class="box" role="gridcell">{grid[4][1]}</button>
	<button class="box" role="gridcell">{grid[4][2]}</button>
	<button class="box" role="gridcell">{grid[4][3]}</button>
	<button class="box" role="gridcell">{grid[4][4]}</button>
</div>
