<script>
    import { Router } from "./lib/index";
    import { goto, routes } from "./router";
</script>

<nav>
    <button onclick={() => goto("/")}>Home</button>
    <button onclick={() => goto("/about")}>About</button>
</nav>

<Router {routes} />
