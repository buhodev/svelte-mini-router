<script lang="ts">
    import { onMount } from "svelte";
    import { navigationContext, type Route, type RouteState } from "./context-router";

    /**
     * Component props
     */
    let { routes = [], fallback = null, initialPath = "/", onNavigate = null } = $props();

    /**
     * Current route state
     */
    let route_state = $state<RouteState>({ route: null, params: {}, path: "" });
    
    const handleNavigation = (path: string) => {
        update_route(path);
    };

    /**
     * Matches a route path pattern against the current path
     * @param pattern - Route pattern (e.g., '/users/:id')
     * @param path - Current path (e.g., '/users/123')
     * @returns Match result and extracted parameters
     */
    function match_route(pattern: string, path: string) {        
        const pattern_parts = pattern.split("/").filter(Boolean);
        const path_parts = path.split("/").filter(Boolean);

        if (pattern_parts.length !== path_parts.length) {
            return { match: false, params: {} };
        }

        const params: Record<string, string> = {};

        for (let i = 0; i < pattern_parts.length; i++) {
            const pattern_part = pattern_parts[i];
            const path_part = path_parts[i];

            if (pattern_part.startsWith(":")) {
                const param_name = pattern_part.slice(1);
                params[param_name] = path_part;
            } else if (pattern_part !== path_part) {
                return { match: false, params: {} };
            }
        }

        return { match: true, params };
    }

    /**
     * Updates the current route based on the given path
     * @param path - The path to navigate to
     */
    function update_route(path: string) {
        for (const route_item of routes) {
            const { match, params: route_params } = match_route(
                route_item.path,
                path,
            );

            if (match) {
                const newState: RouteState = {
                    route: route_item,
                    params: route_params,
                    path: path,
                };
                route_state = newState;
                return;
            }
        }

        const newState: RouteState = {
            route: null,
            params: {},
            path: path,
        };
        route_state = newState;
    }



    onMount(() => {
        update_route(initialPath);
        
        navigationContext.set(handleNavigation);
        
        if (onNavigate) {
            onNavigate(handleNavigation);
        }
    });
</script>

{#if route_state.route}
    <route_state.route.component 
        params={route_state.params}
        navigate={handleNavigation}
        {...(route_state.route.props || {})}
    />
{:else if fallback}
    {@render fallback({ path: route_state.path })}
{:else}
    <div>
        <h1>404 - Page Not Found</h1>
        <p>The page "{route_state.path}" could not be found.</p>
    </div>
{/if}
