<svelte:head>
	<title>Game</title>
</svelte:head>

<style>

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

<script>
	import { onMount } from 'svelte';

	import { words, board, grid, dice, seed, tabIndexes } from '../js/stores.js';
	import { seedKeyDown, cellKeyDown } from '../js/key.js';
	import { init, reset, getGameFromCurrentTime, getGameFromRandomWords } from '../js/game.js';
	import { clearWord, addWord, updateLocation, toggleLetter, getCurrentWord, BUTTON_MAX_INDEX } from '../js/board.js';
	import { getLetter } from '../js/util.js';

	onMount(init);
	
</script>

<section class="options">
	<label>Seed: <input type="text" class="seed" bind:value={$seed} spellcheck="false" autocomplete="false" on:keydown={event => seedKeyDown(event, $dice, $seed)}></label>
	<button on:click={() => getGameFromCurrentTime($dice)} aria-label="Reset the board: use the currently active board">Current</button>
	<button on:click={() => getGameFromRandomWords($dice)} aria-label="Reset the board: create a random board">Random</button>
</section>

<section class="wrapper">

	{#each $grid as row, rowIndex}

		{#each row as cell, cellIndex}
		<button 
			class="button cell {$board[rowIndex + ':' + cellIndex] ? 'chosen' : '' }"
			data-location="{rowIndex + ':' + cellIndex}"
			role="button"
			tabindex="{$tabIndexes[rowIndex + ':' + cellIndex] || 0}"
			aria-label="{
					'Letter ' + getLetter(cell).toLowerCase() + ' ' + 
					($board[rowIndex + ':' + cellIndex] && $tabIndexes[rowIndex + ':' + cellIndex] === BUTTON_MAX_INDEX ? '(last letter selected)' : '') + '. ' + 
					(getCurrentWord($board).length <= 1 ? '' : 
							' Letters are ' + getCurrentWord($board).split('').join('. ') + '. Word is ' + getCurrentWord($board).toLowerCase()
					)
			}"
			aria-hidden="{$tabIndexes[rowIndex + ':' + cellIndex] === -1}"
			on:click={event => toggleLetter(event, $board)}
			on:keydown={event => cellKeyDown(event)}>
			{getLetter(cell)}
		</button>
		{/each}
	
	{/each}

	<button class="button action action-left cancel" tabindex="{$tabIndexes['action:cancel'] || 0}}" role="button" aria-label="Cancel word" on:click={clearWord}>Cancel</button>
	<button class="button action action-right add" tabindex="{$tabIndexes['action:add'] || 0}}" role="button" aria-label="Add word" on:click={() => addWord($board)}>Add</button>

</section>

<section class="words">
	<textarea aria-label="Your word list" bind:value={$words} placeholder="Your words" autocompete="false"></textarea>
</section>