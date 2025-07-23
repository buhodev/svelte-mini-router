<script>
  import { route } from "../../../lib";
  import { goto } from "../window.svelte";
</script>

<h1>this is my project #{$route.params.id}</h1>

<button onclick={() => goto("/projects")}>back</button>
