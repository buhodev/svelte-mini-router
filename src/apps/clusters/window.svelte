<script module>
  import Home from "./routes/home.svelte";
  import Dashboard from "./routes/dashboard.svelte";
  import Settings from "./routes/settings.svelte";
  import { create_goto, create_routes, Router } from "../../lib/index";

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
  import { route } from "../../lib/index";

  let { name } = $props();
</script>

<main>
  <strong>{name}</strong>
  <code>{$route.path}</code>
  <p>user can open only any amount of {name} apps at a time</p>
  <nav>
    <button onclick={() => goto("/")}>Home</button>
    <button onclick={() => goto("/dashboard")}>Dashboard</button>
    <button onclick={() => goto("/settings")}>Settings</button>
  </nav>

  <Router {routes} />
</main>

<style>
  main {
    border: 1px solid black;
    background-color: #ccc;
    padding: 1rem;
  }
</style>
