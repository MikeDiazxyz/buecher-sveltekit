import { deleteBook } from '$lib/index.js';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  try {
    const formData = await request.formData();
    const id = formData.get('_id');

    if (!id) {
      return new Response('ID fehlt', { status: 400 });
    }

    await deleteBook(id);
    return new Response(null, {
      status: 303,
      headers: {
        location: '/books'
      }
    });
  } catch (error) {
    console.error('Fehler beim Löschen des Buchs:', error);
    return new Response('Interner Serverfehler', { status: 500 });
  }
}