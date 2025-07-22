import About from "./routes/about.svelte";
import Home from "./routes/home.svelte";
import { create_goto, create_routes, Router } from "./lib/index";

// Define routes
export const routes = create_routes([
  { path: "/", component: Home },
  { path: "/about", component: About },
]);

// Create type-safe navigation
export const goto = create_goto(routes);
