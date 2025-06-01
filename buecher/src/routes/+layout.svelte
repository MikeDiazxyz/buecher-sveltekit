<script>
  import "./styles.css";
  import { page } from '$app/stores';
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom mb-4">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">📚 Bücherverwaltung</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavDropdown"
      aria-controls="navbarNavDropdown"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a href="/books" class="nav-link" class:active={$page.url.pathname.startsWith('/books')}>
            Bücher
          </a>
        </li>
        <li class="nav-item">
          <a href="/genres" class="nav-link" class:active={$page.url.pathname.startsWith('/genres')}>
            Genres
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<div class="container mt-4">
  <slot />
</div>

<style>
  .nav-link.active {
    color: orangered !important;
    font-weight: bold;
  }
</style>