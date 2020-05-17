import { writable, derived } from 'svelte/store';

export const words = writable('');
export const board = writable({});
export const tabIndexes = writable({});
export const grid = writable([]);
export const dice = writable([]);
export const seed = writable('');

// export const greeting = derived(
// 	name,
// 	$name => `Hello ${$name}!`
// );