import { addGenre } from '$lib/index.js';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const genre = {
      name: data.get('name'),
      description: data.get('description')
    };

    await addGenre(genre);

    throw redirect(303, '/genres');
  }
};