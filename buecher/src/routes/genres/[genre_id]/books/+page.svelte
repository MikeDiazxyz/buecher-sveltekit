<script>
  export let data;
  let genre = data.genre;
  let books = data.books;

  let search = '';
  let sortField = 'title';
  let sortDirection = 'asc';

  $: filteredBooks = books
    .filter(book =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const aField = a[sortField]?.toString().toLowerCase() || '';
      const bField = b[sortField]?.toString().toLowerCase() || '';

      if (aField < bField) return sortDirection === 'asc' ? -1 : 1;
      if (aField > bField) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  function toggleSort(field) {
    if (sortField === field) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      sortField = field;
      sortDirection = 'asc';
    }
  }
</script>

<h1>Bücher im Genre: {genre.name}</h1>
<p>{genre.description}</p>

<input
  type="text"
  placeholder="Suche Titel oder Autor..."
  bind:value={search}
  class="form-control mb-3"
  style="max-width: 400px;"
/>

<table class="table table-striped">
  <thead>
    <tr>
      <th style="cursor:pointer" on:click={() => toggleSort('title')}>
        Titel {sortField === 'title' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
      </th>
      <th style="cursor:pointer" on:click={() => toggleSort('author')}>
        Autor {sortField === 'author' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
      </th>
      <th style="cursor:pointer" on:click={() => toggleSort('year')}>
        Jahr {sortField === 'year' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
      </th>
    </tr>
  </thead>
  <tbody>
    {#each filteredBooks as book}
      <tr>
        <td><a href={`/books/${book._id}`}>{book.title}</a></td>
        <td>{book.author}</td>
        <td>{book.year}</td>
      </tr>
    {/each}
    {#if filteredBooks.length === 0}
      <tr>
        <td colspan="3">Keine Bücher gefunden.</td>
      </tr>
    {/if}
  </tbody>
</table>