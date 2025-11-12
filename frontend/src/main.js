// src/main.js
// Punto de entrada de la aplicación.
// Carga y ejecuta la configuración de rutas y páginas.
// Asegúrate de importar este archivo desde tu index.html con:
// <script type="module" src="/src/main.js"></script>

import "./components.js";   // si definen Components
import "./datastore.js";    // si define DataStore
import "./router.js";       // Router.register / Router.init
import "./pages/index.js";  // expone window.Pages y exporta Pages
import "./App.js";          // registra rutas y hace Router.init() en DOMContentLoaded
