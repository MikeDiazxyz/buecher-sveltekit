<script>
  import { page } from '$app/stores';
  export let data;
  let books = data.books;

  let search = '';
  let sortKey = 'title';
  let sortAsc = true;

  $: filteredBooks = books
    .filter(b =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const valA = a[sortKey]?.toString().toLowerCase() || '';
      const valB = b[sortKey]?.toString().toLowerCase() || '';
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });

  function toggleSort(key) {
    if (sortKey === key) {
      sortAsc = !sortAsc;
    } else {
      sortKey = key;
      sortAsc = true;
    }
  }
</script>

<h1>Bücherliste</h1>

<div class="mb-3">
  <a href="/books/create" class="btn btn-primary">➕ Neues Buch erfassen</a>
</div>

<div class="mb-3">
  <input
    type="text"
    placeholder="Suche nach Titel oder Autor"
    bind:value={search}
    class="form-control"
    style="max-width: 400px;"
  />
</div>

<table class="table table-striped">
  <thead>
    <tr>
      <th style="cursor:pointer" on:click={() => toggleSort('title')}>
        Titel {sortKey === 'title' ? (sortAsc ? '▲' : '▼') : ''}
      </th>
      <th style="cursor:pointer" on:click={() => toggleSort('author')}>
        Autor {sortKey === 'author' ? (sortAsc ? '▲' : '▼') : ''}
      </th>
      <th style="cursor:pointer" on:click={() => toggleSort('year')}>
        Jahr {sortKey === 'year' ? (sortAsc ? '▲' : '▼') : ''}
      </th>
      <th>Genre</th>
      <th>Aktionen</th>
    </tr>
  </thead>
  <tbody>
    {#each filteredBooks as book}
      <tr>
        <td data-label="Titel"><a href={`/books/${book._id}`}>{book.title}</a></td>
        <td data-label="Autor">{book.author}</td>
        <td data-label="Jahr">{book.year}</td>
        <td data-label="Genre">{book.genre}</td>
        <td data-label="Aktionen">
          <a href={`/books/${book._id}`} class="me-2">✏️ Bearbeiten</a>
          <form method="POST" action="?/delete" style="display:inline;">
            <input type="hidden" name="_id" value={book._id} />
            <button
              type="submit"
              class="btn btn-sm btn-outline-danger"
              on:click|preventDefault={e => {
                if (confirm('Wirklich löschen?')) {
                  e.target.closest('form').submit();
                }
              }}
            >
              🗑️ Löschen
            </button>
          </form>
        </td>
      </tr>
    {/each}
    {#if filteredBooks.length === 0}
      <tr>
        <td colspan="5">Keine Bücher gefunden.</td>
      </tr>
    {/if}
  </tbody>
</table>

<p>{filteredBooks.length} von {books.length} Büchern angezeigt</p>