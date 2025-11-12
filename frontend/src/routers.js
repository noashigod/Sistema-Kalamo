// Simple Router
const Router = {
    routes: {},
    currentRoute: null,

    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());
    },

    register(path, handler) {
        this.routes[path] = handler;
    },

    handleRoute() {
        const hash = window.location.hash.slice(1) || '/';
        this.currentRoute = hash;
        
        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            const route = item.getAttribute('data-route');
            if (hash === route || (hash.startsWith(route) && route !== '/')) {
                item.classList.add('active');
            } else if (hash === '/' && route === '/') {
                item.classList.add('active');
            }
        });

        // Find and execute route handler
        const handler = this.routes[hash] || this.routes['/'];
        if (handler) {
            handler();
        }
    },

    navigate(path) {
        window.location.hash = path;
    }
};
