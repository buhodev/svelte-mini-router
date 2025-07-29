# Context Router

A Svelte router that uses [runed Context](https://runed.dev/docs/utilities/context) instead of browser URL/history API. This allows each component instance to have its own isolated router state.

## Key Features

- **Isolated Routing**: Each component instance has its own router state
- **No Browser Dependencies**: Doesn't rely on browser URL or history API
- **Type-Safe Navigation**: Full TypeScript support with autocompletion
- **Context-Based**: Uses runed Context for improved type safety and ergonomics

## Usage

### Basic Setup

```svelte
<!-- apps/my-app/window.svelte -->
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
  <code>{routerState.path}</code>
  <p>Each {name} window has its own isolated router!</p>
  
  <nav>
    <button onclick={() => goto("/")}>Home</button>
    <button onclick={() => goto("/dashboard")}>Dashboard</button>
    <button onclick={() => goto("/settings")}>Settings</button>
  </nav>

  <!-- ContextRouter manages the routing for this component instance -->
  <ContextRouter {routes} initialPath="/" />
</main>
```

### Multiple Windows

When you open multiple instances of the same app, each will have its own router:

```svelte
<!-- This will work independently for each window -->
<Window title="My App 1">
  <MyApp name="App 1" />
</Window>

<Window title="My App 2">
  <MyApp name="App 2" />
</Window>
```

### Route Parameters

```svelte
<script module>
  import UserProfile from "./routes/user-profile.svelte";
  import { create_goto, create_routes } from "../../lib/context-router";

  export const routes = create_routes([
    {
      path: "/user/:id",
      component: UserProfile,
    },
  ]);

  export const goto = create_goto(routes);
</script>

<!-- TypeScript will provide autocompletion for the id parameter -->
<button onclick={() => goto("/user/123", { id: "123" })}>
  View User 123
</button>
```

## API Reference

### `ContextRouter`

The main router component.

**Props:**
- `routes`: Array of route definitions
- `fallback`: Optional fallback component for unmatched routes
- `initialPath`: Initial path to navigate to (default: "/")

### `create_goto(routes)`

Creates a type-safe navigation function.

### `create_routes(routes)`

Creates a type-safe routes array.

### `getRouterState()`

Gets the router state for the current component context using runed Context.

### `createInitialState()`

Creates the initial router state (usually not needed directly).

### `routerContext`

The runed Context instance used for router state management.
