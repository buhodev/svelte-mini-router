<script module>
  import Home from "./routes/home.svelte";
  import Dashboard from "./routes/dashboard.svelte";
  import Settings from "./routes/settings.svelte";
  import { create_goto, create_routes, ContextRouter } from "../../lib/context-router";

  // Define routes
  export const routes = create_routes([
    {
      path: "/",
      component: Home,
    },
    {
      path: "/dashboard",
      component: Dashboard,
    },
    {
      path: "/settings",
      component: Settings,
    },
  ]);

  // Create type-safe navigation
  export const goto = create_goto(routes);
</script>

<script>
  import { getRouterState } from "../../lib/context-router";

  let { name } = $props();
  
  // Get the router state for this component instance
  const routerState = getRouterState();
</script>

<main>
  <strong>{name}</strong>
  <code>Current path: {routerState.path}</code>
  <p>Each {name} window has its own isolated router using runed Context!</p>
  
  <nav>
    <button onclick={() => goto("/")}>Home</button>
    <button onclick={() => goto("/dashboard")}>Dashboard</button>
    <button onclick={() => goto("/settings")}>Settings</button>
  </nav>

  <!-- ContextRouter manages the routing for this component instance -->
  <ContextRouter routes={[...routes]} initialPath="/" />
</main>

<style>
  main {
    border: 1px solid #333;
    background-color: #f5f5f5;
    padding: 1rem;
    border-radius: 8px;
  }
  
  nav {
    margin: 1rem 0;
  }
  
  button {
    margin-right: 0.5rem;
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: white;
    cursor: pointer;
  }
  
  button:hover {
    background: #eee;
  }
  
  code {
    background: #e0e0e0;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-family: monospace;
  }
</style> 