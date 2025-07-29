<script lang="ts">
    import { onMount } from "svelte";
    import { create_goto, routerContext, navigationContext } from "./context-router.js";
    import { URLManager } from "./url-manager.js";

    /**
     * Component props
     * @type {{ routes: readonly import('./context-router.js').Route[], fallback?: import('svelte').Component | null, initialPath?: string, onNavigate?: (navigate: (path: string) => void) => void, windowId?: string }}
     */
    let { routes = [], fallback = null, initialPath = "/", onNavigate = null, windowId = null } = $props();

    /**
     * Current route state
     */
    let route_state = $state<import('./context-router.js').RouteState>({ route: null, params: {}, path: "" });

    const goto = create_goto(routes);
    
    const handleNavigation = (path: string) => {
        update_route(path);
        
        // Update URL if windowId is provided
        if (windowId) {
            URLManager.getInstance().updateWindowPath(windowId, path);
        }
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
                const newState: import('./context-router.js').RouteState = {
                    route: route_item,
                    params: route_params,
                    path: path,
                };
                route_state = newState;
                return;
            }
        }

        const newState: import('./context-router.js').RouteState = {
            route: null,
            params: {},
            path: path,
        };
        route_state = newState;
    }



    onMount(() => {
        // Get initial path from URL manager if windowId is provided, otherwise use initialPath
        const urlManager = URLManager.getInstance();
        const path = windowId ? urlManager.getWindowPath(windowId) : initialPath;
        
        update_route(path);
        
        navigationContext.set(handleNavigation);
        
        if (onNavigate) {
            onNavigate(handleNavigation);
        }
        
        // Subscribe to URL changes if windowId is provided
        if (windowId) {
            const unsubscribe = urlManager.subscribe((states) => {
                const windowState = states.find(state => state.id === windowId.toLowerCase());
                if (windowState && windowState.path !== route_state.path) {
                    update_route(windowState.path);
                }
            });
            
            // Cleanup subscription on component destroy
            return unsubscribe;
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
