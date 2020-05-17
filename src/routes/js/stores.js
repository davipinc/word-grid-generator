import { writable, derived } from 'svelte/store';

export const words = writable('');

// export const greeting = derived(
// 	name,
// 	$name => `Hello ${$name}!`
// );