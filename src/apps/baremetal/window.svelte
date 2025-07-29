<script module>
  import Home from "./routes/home.svelte";
  import Settings from "./routes/settings.svelte";
  import Projects from "./routes/projects.svelte";
  import Project from "./routes/project.svelte";
  import { create_goto, create_routes, ContextRouter } from "../../lib/context-router";

  export const routes = create_routes([
    {
      path: "/",
      component: Home,
    },
    {
      path: "/projects/:id",
      component: Project,
    },
    {
      path: "/projects",
      component: Projects,
    },
    {
      path: "/settings",
      component: Settings,
    },
  ]);

  export const goto = create_goto(routes);
</script>

<script lang="ts">
  let { name } = $props();
  
  let navigate: ((path: string) => void) | null = null;
</script>

<main>
  <strong>{name} app</strong>
  <code>Current path will be shown by ContextRouter</code>
  <nav>
    <button onclick={() => navigate?.("/")}>Home</button>
    <button onclick={() => navigate?.("/projects")}>Projects</button>
    <button onclick={() => navigate?.("/settings")}>Settings</button>
  </nav>

  <ContextRouter routes={[...routes]} initialPath="/" windowId={name} onNavigate={(nav: (path: string) => void) => navigate = nav} />
</main>

<style>
  main {
    border: 1px solid black;
    background-color: #ccc;
    padding: 1rem;
  }
</style>
