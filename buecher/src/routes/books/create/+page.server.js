import { addBook, getAllGenres } from '$lib/index.js';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const genres = await getAllGenres();
  return { genres };
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const title = formData.get('title')?.trim();
    const author = formData.get('author')?.trim();
    const year = parseInt(formData.get('year'), 10);
    const genre = formData.get('genre')?.trim();

    // Validierung
    if (!title || !author || isNaN(year) || !genre) {
      return {
        error: 'Alle Felder müssen korrekt ausgefüllt sein.'
      };
    }

    // Buch speichern
    await addBook({ title, author, year, genre });

    // Weiterleitung zur Bücherliste
    throw redirect(303, '/books');
  }
};