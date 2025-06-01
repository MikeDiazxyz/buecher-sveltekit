import { json } from '@sveltejs/kit';
import { deleteGenre } from '$lib/index.js';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  try {
    const { _id } = await request.json();

    if (!_id) {
      return json({ error: 'Kein Genre-ID übergeben' }, { status: 400 });
    }

    await deleteGenre(_id);
    return json({ success: true });
  } catch (error) {
    console.error('Fehler beim Löschen des Genres:', error);
    return json({ error: 'Interner Serverfehler' }, { status: 500 });
  }
}