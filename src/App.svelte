<script>
  import WindowBaremetal from "./apps/baremetal/window.svelte";
  import WindowClusters from "./apps/clusters/window.svelte";
  import URLDisplay from "./URLDisplay.svelte";
</script>

<main>
  <WindowBaremetal name="baremetal" />
  
  <WindowClusters name="clusters-1" />
  <WindowClusters name="clusters-2" />
  <WindowClusters name="clusters-3" />
</main>

<URLDisplay />

<style>
  main {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
  }
</style>
