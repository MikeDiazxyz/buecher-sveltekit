<script>
  export let data;
  let genre = data.genre;
</script>

<h1>Genre bearbeiten</h1>

<form method="POST">
  <input type="hidden" name="_id" value={genre._id} />

  <div class="mb-3">
    <label for="name" class="form-label">Name</label>
    <input type="text" id="name" name="name" class="form-control" bind:value={genre.name} required />
  </div>

  <div class="mb-3">
    <label for="description" class="form-label">Beschreibung</label>
    <textarea id="description" name="description" class="form-control" rows="3">{genre.description}</textarea>
  </div>

  <button type="submit" formaction="?/update" class="btn btn-primary">💾 Speichern</button>
</form>