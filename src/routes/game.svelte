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

<h1>Game Grid</h1>

<div class="wrapper" role="grid">
	<button class="box" role="gridcell">A</button>
	<button class="box" role="gridcell">A</button>
	<button class="box" role="gridcell">A</button>
	<button class="box" role="gridcell">A</button>
	<button class="box" role="gridcell">A</button>

	<button class="box" role="gridcell">A</button>
	<button class="box" role="gridcell">A</button>
	<button class="box" role="gridcell">A</button>
	<button class="box" role="gridcell">A</button>
	<button class="box" role="gridcell">A</button>

	<button class="box" role="gridcell">A</button>
	<button class="box" role="gridcell">A</button>
	<button class="box" role="gridcell">A</button>
	<button class="box" role="gridcell">A</button>
	<button class="box" role="gridcell">A</button>

	<button class="box" role="gridcell">A</button>
	<button class="box" role="gridcell">A</button>
	<button class="box" role="gridcell">A</button>
	<button class="box" role="gridcell">A</button>
	<button class="box" role="gridcell">A</button>

	<button class="box" role="gridcell">A</button>
	<button class="box" role="gridcell">A</button>
	<button class="box" role="gridcell">A</button>
	<button class="box" role="gridcell">A</button>
	<button class="box" role="gridcell">A</button>
</div>
