<script>
  import WindowBaremetal from "./apps/baremetal/window.svelte";
  import WindowClusters from "./apps/clusters/window.svelte";
</script>

<main>
  <WindowBaremetal name="Baremetal" />
  
  <WindowClusters name="Clusters #1" />
  <WindowClusters name="Clusters #2" />
  <WindowClusters name="Clusters #3" />
</main>

<style>
  main {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
  }
</style>
