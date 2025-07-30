<script lang="ts">
  let { navigate = null } = $props();
</script>

<h1>Projects</h1>

<nav>
  <button onclick={() => navigate?.("/projects/1")}>Project 1</button>
  <button onclick={() => navigate?.("/projects/2")}>Project 2</button>
  <button onclick={() => navigate?.("/projects/3")}>Project 3</button>
</nav>
