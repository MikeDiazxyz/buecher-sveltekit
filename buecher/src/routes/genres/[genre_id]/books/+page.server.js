import { getGenreById, getAllBooks } from '$lib/index.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const genre = await getGenreById(params.genre_id);
  const allBooks = await getAllBooks();


  const books = allBooks.filter(book => book.genre === genre.name);

  return { genre, books };
}