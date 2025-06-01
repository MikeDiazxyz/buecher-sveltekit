import { getBookById, updateBook, getAllGenres } from '$lib/index.js';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const book = await getBookById(params.book_id);
  const genres = await getAllGenres();

  return {
    book: {
      ...book,
      _id: book._id.toString()
    },
    genres
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

    const updatedBook = {
      _id: formData.get('_id'),
      title: formData.get('title')?.trim(),
      author: formData.get('author')?.trim(),
      year: parseInt(formData.get('year'), 10),
      genre: formData.get('genre')?.trim()
    };

    // Validierung
    if (!updatedBook.title || !updatedBook.author || isNaN(updatedBook.year) || !updatedBook.genre) {
      return { error: 'Alle Felder müssen korrekt ausgefüllt sein.' };
    }

    await updateBook(updatedBook);

    // Nach erfolgreicher Bearbeitung zurück zur Detailansicht
    throw redirect(303, `/books/${updatedBook._id}`);
  }
};