import { getGenreById, updateGenre } from '$lib/index.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const genre = await getGenreById(params.genre_id);
  return { genre };
}

/** @type {import('./$types').Actions} */
export const actions = {
  update: async ({ request }) => {
    const formData = await request.formData();

    const genre = {
      _id: formData.get('_id'),
      name: formData.get('name'),
      description: formData.get('description')
    };

    await updateGenre(genre);
    return { success: true };
  }
};