<script module>
  import Home from "./routes/home.svelte";
  import Settings from "./routes/settings.svelte";
  import Projects from "./routes/projects.svelte";
  import Project from "./routes/project.svelte";
  import { create_goto, create_routes, Router } from "../../lib/index";

  // Define routes
  export const routes = create_routes([
    {
      path: "/",
      component: Home,
    },
    {
      path: "/projects",
      component: Projects,
    },
    {
      path: "/projects/:id",
      component: Project,
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
  <strong>{name} app</strong>
  <code>{$route.path}</code>
  <p>user can open only 1 {name} app at a time</p>
  <nav>
    <button onclick={() => goto("/")}>Home</button>
    <button onclick={() => goto("/projects")}>Projects</button>
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
