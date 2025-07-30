import { Context } from "runed";

export type Route = {
  path: string;
  component: import("svelte").Component;
  props?: Record<string, unknown>;
};

export type RouteState = {
  route: Route | null;
  params: Record<string, string>;
  path: string;
};

type ExtractPaths<T extends readonly Route[]> = T[number]["path"];

type ExtractParams<T extends string> =
  T extends `${infer _Start}:${infer Param}/${infer Rest}`
    ? { [K in Param]: string } & ExtractParams<`/${Rest}`>
    : T extends `${infer _Start}:${infer Param}`
      ? { [K in Param]: string }
      : {};

type HasParams<T extends string> = T extends `${string}:${string}`
  ? true
  : false;

/**
 * Creates the initial router state
 * @returns Initial RouteState with null route, empty params, and empty path
 */
export function createInitialState(): RouteState {
  return {
    route: null,
    params: {},
    path: "",
  };
}

/**
 * Context for router state management
 */
export const routerContext = new Context<RouteState>("router");

/**
 * Context for navigation function management
 */
export const navigationContext = new Context<(path: string) => void>("navigation");

/**
 * Gets the router state from context
 * @returns Current RouteState from context or initial state if not set
 */
export function getRouterState(): RouteState {
  return routerContext.getOr(createInitialState());
}

/**
 * Creates a type-safe routes array
 * @param routes - Array of route definitions
 * @returns The same routes array with proper TypeScript inference
 */
export function create_routes<const T extends readonly Route[]>(routes: T) {
  return routes;
}

/**
 * Creates a type-safe navigation function
 * @param routes - Array of route definitions
 * @returns Function that navigates to a route and returns the new RouteState
 */
export function create_goto<T extends readonly Route[]>(routes: T) {
  return <P extends ExtractPaths<T>>(
    path: P,
    ...args: HasParams<P> extends true
      ? ExtractParams<P> extends Record<string, never>
        ? [params?: never]
        : [params: ExtractParams<P>]
      : [params?: never]
  ) => {
    const params = args[0];
    const final_path = params ? interpolate_path(path, params) : path;
    
    const route = findMatchingRoute(routes, final_path);
    
    if (route) {
      const { params: route_params } = match_route(route.path, final_path);
      const newState: RouteState = {
        route: route,
        params: route_params,
        path: final_path,
      };
      return newState;
    } else {
      const newState: RouteState = {
        route: null,
        params: {},
        path: final_path,
      };
      return newState;
    }
  };
}

/**
 * Creates a function that generates path strings from route patterns and parameters
 * @param _routes - Array of route definitions (unused but required for type inference)
 * @returns Function that interpolates parameters into route patterns
 */
export function create_resolver<T extends readonly Route[]>(_routes: T) {
  return <P extends ExtractPaths<T>>(
    path: P,
    ...args: HasParams<P> extends true
      ? ExtractParams<P> extends Record<string, never>
        ? [params?: never]
        : [params: ExtractParams<P>]
      : [params?: never]
  ) => {
    const params = args[0];
    return params ? interpolate_path(path, params) : path;
  };
}

/**
 * Interpolates parameters into a route pattern
 * @param path - Route pattern with dynamic segments (e.g., "/users/:id")
 * @param params - Object containing parameter values
 * @returns Path with parameters interpolated
 * @throws Error if a required parameter is missing
 */
function interpolate_path(
  path: string,
  params: Record<string, string>,
): string {
  return path.replace(/:([^/]+)/g, (_, param_name) => {
    const value = params[param_name];
    if (value === undefined) {
      throw new Error(`Missing parameter: ${param_name}`);
    }
    return value;
  });
}

/**
 * Matches a route path pattern against the current path
 * @param pattern - Route pattern (e.g., '/users/:id')
 * @param path - Current path (e.g., '/users/123')
 * @returns Match result and extracted parameters
 */
function match_route(pattern: string, path: string): { match: boolean; params: Record<string, string> } {
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
      params[pattern_part.slice(1)] = path_part;
    } else if (pattern_part !== path_part) {
      return { match: false, params: {} };
    }
  }

  return { match: true, params };
}

/**
 * Finds a matching route for the given path
 * @param routes - Array of routes to search through
 * @param path - The path to match
 * @returns The matching route or null
 */
function findMatchingRoute(routes: readonly Route[], path: string): Route | null {
  for (const route of routes) {
    const { match } = match_route(route.path, path);
    if (match) {
      return route;
    }
  }
  return null;
}
