<script>
  let name = '';
  let description = '';
</script>

<h1>Neues Genre erfassen</h1>

<form method="POST">
  <div class="mb-3">
    <label class="form-label">Name</label>
    <input class="form-control" name="name" bind:value={name} required />
  </div>

  <div class="mb-3">
    <label class="form-label">Beschreibung</label>
    <textarea class="form-control" name="description" rows="3" bind:value={description}></textarea>
  </div>

  <button type="submit" class="btn btn-primary">💾 Speichern</button>
</form>