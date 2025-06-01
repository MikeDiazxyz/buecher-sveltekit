import { getAllGenres } from '$lib/index.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  return {
    genres: await getAllGenres()
  };
}