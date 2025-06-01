<script>
  import { goto } from '$app/navigation';
  export let data;
  let genres = data.genres;

  let search = '';
  let sortField = 'name';
  let sortDirection = 'asc';

  // Gefilterte und sortierte Genres
  $: filteredGenres = genres
    .filter(genre =>
      genre.name.toLowerCase().includes(search.toLowerCase()) ||
      (genre.description && genre.description.toLowerCase().includes(search.toLowerCase()))
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

  async function deleteGenre(id) {
    const confirmed = confirm('Willst du dieses Genre wirklich löschen?');
    if (!confirmed) return;

    const response = await fetch('/genres/delete', {
      method: 'POST',
      body: JSON.stringify({ _id: id }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      // Entferne Genre direkt aus der Liste (kein Reload nötig)
      genres = genres.filter((g) => g._id !== id);
    } else {
      alert('Löschen fehlgeschlagen');
    }
  }
</script>

<h1 style="color: orangered">Genres</h1>
<a href="/genres/create" class="btn btn-outline-primary mb-3">📝 Neues Genre erfassen</a>

<input
  type="text"
  placeholder="Suche Genres nach Name oder Beschreibung..."
  bind:value={search}
  class="form-control mb-3"
  style="max-width: 400px;"
/>

<table class="table table-striped">
  <thead>
    <tr>
      <th style="cursor:pointer" on:click={() => toggleSort('name')}>
        Name {sortField === 'name' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
      </th>
      <th style="cursor:pointer" on:click={() => toggleSort('description')}>
        Beschreibung {sortField === 'description' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
      </th>
      <th>Aktionen</th>
    </tr>
  </thead>
  <tbody>
    {#each filteredGenres as genre}
      <tr>
        <td data-label="Name"><strong>{genre.name}</strong></td>
        <td data-label="Beschreibung">{genre.description}</td>
        <td data-label="Aktionen">
          <a href={`/genres/${genre._id}`} class="me-2">✏️ Bearbeiten</a>
          <a href={`/genres/${genre._id}/books`} class="me-2">📚 Alle Bücher dieses Genres</a>
          <button class="btn btn-sm btn-outline-danger" on:click={() => deleteGenre(genre._id)}>🗑️ Löschen</button>
        </td>
      </tr>
    {/each}
    {#if filteredGenres.length === 0}
      <tr>
        <td colspan="3">Keine Genres gefunden.</td>
      </tr>
    {/if}
  </tbody>
</table>