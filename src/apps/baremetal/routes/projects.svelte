<script>
  import { goto } from "../window.svelte";
</script>

<h1>Projects</h1>

<nav>
  <button onclick={() => goto("/projects/:id", { id: "1" })}>Project 1</button>
  <button onclick={() => goto("/projects/:id", { id: "2" })}>Project 2</button>
  <button onclick={() => goto("/projects/:id", { id: "3" })}>Project 3</button>
</nav>
