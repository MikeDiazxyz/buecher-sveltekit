import { getAllBooks, deleteBook } from '$lib/index.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const books = await getAllBooks();
  return { books };
}

/** @type {import('./$types').Actions} */
export const actions = {
  delete: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('_id');

    if (!id) {
      return { success: false, error: 'ID fehlt' };
    }

    await deleteBook(id);

    return {
      success: true,
      redirect: '/books'
    };
  }
};