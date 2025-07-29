<script>
  let { params = {}, navigate } = $props();
</script>

<nav>
  <button onclick={() => navigate?.("/projects/1")}>Project 1</button>
  <button onclick={() => navigate?.("/projects/2")}>Project 2</button>
  <button onclick={() => navigate?.("/projects/3")}>Project 3</button>
</nav>

<h1>this is my project #{params.id || 'Unknown'}</h1>

<button onclick={() => navigate?.("/projects")}>back to projects list</button>
