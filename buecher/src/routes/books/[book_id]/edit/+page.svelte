<script>
  export let data;
  let book = data.book;
  let genres = data.genres;

  let { _id, title, author, year, genre } = book;

  let error = null;
</script>

<h1>Buch bearbeiten</h1>

<form method="POST">
  <input type="hidden" name="_id" value={_id} />

  <div class="mb-3">
    <label class="form-label">Titel</label>
    <input class="form-control" name="title" bind:value={title} required />
  </div>

  <div class="mb-3">
    <label class="form-label">Autor</label>
    <input class="form-control" name="author" bind:value={author} required />
  </div>

  <div class="mb-3">
    <label class="form-label">Erscheinungsjahr</label>
    <input type="number" class="form-control" name="year" bind:value={year} required />
  </div>

  <div class="mb-3">
    <label class="form-label">Genre</label>
    <select class="form-select" name="genre" bind:value={genre} required>
      <option value="" disabled selected>Bitte wählen</option>
      {#each genres as g}
        <option value={g.name}>{g.name}</option>
      {/each}
    </select>
  </div>

  <button type="submit" class="btn btn-success me-2">💾 Speichern</button>
  <a href="/books" class="btn btn-secondary">↩️ Zurück</a>
</form>

{#if error}
  <div class="alert alert-danger mt-3">
    Fehler: {error}
  </div>
{/if}