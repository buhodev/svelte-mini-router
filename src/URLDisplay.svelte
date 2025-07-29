<script lang="ts">
  import { URLManager, type WindowState } from "./lib/context-router";
  import { onMount } from "svelte";
  
  let currentURL = window.location.href;
  let windowStates: WindowState[] = [];
  
  onMount(() => {
    const urlManager = URLManager.getInstance();
    
    const unsubscribe = urlManager.subscribe((states) => {
      windowStates = states;
      currentURL = window.location.href;
    });
    
    // Initial load
    windowStates = urlManager.getAllWindowStates();
    
    return unsubscribe;
  });
</script>

<div style="position: fixed; bottom: 10px; right: 10px; background: #f0f0f0; padding: 10px; border-radius: 5px; font-family: monospace; font-size: 12px; max-width: 400px; z-index: 1000;">
  <strong>Current URL:</strong><br>
  <code>{currentURL}</code>
  
  <br><br>
  <strong>Window States:</strong><br>
  {#each windowStates as state}
    <div><code>{state.id}: {state.path}</code></div>
  {/each}
</div> 