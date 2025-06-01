<script>
  export let data;
  export let form;

  let title = '';
  let author = '';
  let year = '';
  let genre = '';

  let genres = data.genres;
</script>

<h1 style="color: orangered">📘 Neues Buch erfassen</h1>

{#if form?.error}
  <div class="alert alert-danger mt-3">{form.error}</div>
{/if}

<form method="POST">
  <div class="mb-3">
    <label class="form-label">Titel</label>
    <input
      class="form-control"
      name="title"
      bind:value={title}
      required
    />
  </div>

  <div class="mb-3">
    <label class="form-label">Autor</label>
    <input
      class="form-control"
      name="author"
      bind:value={author}
      required
    />
  </div>

  <div class="mb-3">
    <label class="form-label">Erscheinungsjahr</label>
    <input
      type="number"
      class="form-control"
      name="year"
      bind:value={year}
      required
    />
  </div>

  <div class="mb-3">
    <label class="form-label">Genre</label>
    <select
      class="form-control"
      name="genre"
      bind:value={genre}
      required
    >
      <option value="">Genre wählen</option>
      {#each genres as g}
        <option value={g.name}>{g.name}</option>
      {/each}
    </select>
  </div>

  <button type="submit" class="btn btn-primary">💾 Speichern</button>
</form>