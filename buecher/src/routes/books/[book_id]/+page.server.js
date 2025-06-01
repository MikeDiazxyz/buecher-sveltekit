import { getBookById, updateBook, deleteBook, getAllGenres } from '$lib/index.js';

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
  update: async ({ request }) => {
    const formData = await request.formData();

    const book = {
      _id: formData.get('_id'),
      title: formData.get('title'),
      author: formData.get('author'),
      year: parseInt(formData.get('year')),
      genre: formData.get('genre')
    };

    await updateBook(book);
    return { success: true };
  },

  delete: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('_id');

    await deleteBook(id);
    return { success: true };
  }
};