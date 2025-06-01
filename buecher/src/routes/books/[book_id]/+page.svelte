<script>
    export let data;
    const book = data.book;
  
    const amazonSearchUrl = `https://www.amazon.de/s?k=${encodeURIComponent(book.title + ' ' + book.author)}`;
  </script>
  
  <h1 style="color: orangered">{book.title}</h1>
  
  <ul class="list-group mb-3">
    <li class="list-group-item"><strong>Autor:</strong> {book.author}</li>
    <li class="list-group-item"><strong>Erscheinungsjahr:</strong> {book.year}</li>
    <li class="list-group-item"><strong>Genre:</strong> {book.genre}</li>
  </ul>
  
  <a href={amazonSearchUrl} class="btn btn-outline-primary" target="_blank" rel="noopener noreferrer">
    🔍 Auf Amazon suchen
  </a>
  
  <a href="/books/{book._id}/edit" class="btn btn-warning ms-2">✏️ Bearbeiten</a>
  <a href="/books" class="btn btn-secondary ms-2">🔙 Zurück zur Übersicht</a>