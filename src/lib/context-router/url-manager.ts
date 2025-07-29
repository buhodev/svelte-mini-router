/**
 * URL Manager for synchronizing window states with the browser URL
 * Enables sharing links that restore the exact state of all windows
 */

export interface WindowState {
  id: string;
  path: string;
}

export class URLManager {
  private static instance: URLManager;
  private windowStates = new Map<string, string>();
  private listeners: ((states: WindowState[]) => void)[] = [];

  private constructor() {
    this.loadFromURL();
    window.addEventListener('popstate', () => this.loadFromURL());
  }

  static getInstance(): URLManager {
    if (!URLManager.instance) {
      URLManager.instance = new URLManager();
    }
    return URLManager.instance;
  }

  /**
   * Updates the path for a specific window
   */
  updateWindowPath(windowId: string, path: string): void {
    // Normalize window ID to lowercase to prevent case sensitivity issues
    const normalizedId = windowId.toLowerCase();
    this.windowStates.set(normalizedId, path);
    this.updateURL();
    this.notifyListeners();
  }

  /**
   * Gets the current path for a specific window
   */
  getWindowPath(windowId: string): string {
    // Normalize window ID to lowercase to prevent case sensitivity issues
    const normalizedId = windowId.toLowerCase();
    return this.windowStates.get(normalizedId) || '/';
  }

  /**
   * Gets all window states
   */
  getAllWindowStates(): WindowState[] {
    return Array.from(this.windowStates.entries()).map(([id, path]) => ({
      id,
      path
    }));
  }

  /**
   * Subscribes to URL changes
   */
  subscribe(listener: (states: WindowState[]) => void): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  /**
   * Updates the browser URL with current window states
   */
  private updateURL(): void {
    const url = new URL(window.location.href);
    
    // Create a more readable format: /baremetal:/projects/2/clusters-1:/clusters-2:/settings
    const pathSegments = [];
    
    for (const [windowId, path] of this.windowStates) {
      // Replace / with _ to make it more readable
      const readablePath = path.replace(/\//g, '_');
      pathSegments.push(`${windowId}:${readablePath}`);
    }
    
    const readableState = pathSegments.join('/');
    url.pathname = `/${readableState}`;
    url.search = '';
    
    // Use replaceState to avoid adding to browser history for every navigation
    window.history.replaceState(null, '', url.toString());
  }

  /**
   * Loads window states from the current URL
   */
  private loadFromURL(): void {
    const url = new URL(window.location.href);
    
    this.windowStates.clear();
    
    // Parse the readable format: /baremetal:_projects_2/clusters-1:_/clusters-2:_settings
    const pathname = url.pathname;
    if (pathname.length > 1) {
      const segments = pathname.substring(1).split('/');
      
      for (const segment of segments) {
        const colonIndex = segment.indexOf(':');
        if (colonIndex > -1) {
          const windowId = segment.substring(0, colonIndex).toLowerCase();
          const readablePath = segment.substring(colonIndex + 1);
          // Convert _ back to /
          const path = readablePath.replace(/_/g, '/');
          this.windowStates.set(windowId, path);
        }
      }
    }

    this.notifyListeners();
  }

  /**
   * Notifies all listeners of state changes
   */
  private notifyListeners(): void {
    const states = this.getAllWindowStates();
    this.listeners.forEach(listener => listener(states));
  }
} 