<style>
	h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>Word grid generator</title>
</svelte:head>

<h1>Word grid</h1>

<figure>
	<img alt='1980s Dictionary' src='dictionary.jpg'>
	<figcaption>Old school word game</figcaption>
</figure>

<p><a href="game">Start a new game</a> or adjust <a href="settings">settings</a></p>
