<script>
  import WindowBaremetal from "./apps/baremetal/window.svelte";
  // import WindowClusters from "./apps/clusters/window.svelte";
</script>

<main>
  <WindowBaremetal name="Baremetal" />
  <!-- 
    <WindowClusters name="Clusters #1" />
    <WindowClusters name="Clusters #2" />
  -->
</main>

<style>
  main {
    display: flex;
    gap: 1rem;
  }
</style>
