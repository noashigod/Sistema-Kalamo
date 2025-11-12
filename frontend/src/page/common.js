// Funciones reutilizables de Pages
import { Components } from "../components.js";
import { DataStore } from "../datastore.js";
import { Router } from "../router.js";

export function createListPage(title, subtitle, createRoute, collection, headers, rowMapper) {
  const content = document.getElementById('content');
  const searchId = `search-${collection}`;

  const renderTable = (searchTerm = '') => {
    const filtered = DataStore[collection].filter(item =>
      JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
    );

    const tableContent = Components.table(
      headers,
      filtered.map(rowMapper)
    );

    document.getElementById('table-container').innerHTML = tableContent;
  };

  content.innerHTML = `
    ${Components.pageHeader(
      title,
      subtitle,
      `<a href="#${createRoute}" class="btn btn-primary">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Nuevo
      </a>`
    )}

    ${Components.card(
      \`Lista de ${title}\`,
      `<div id="table-container"></div>`,
      Components.searchBox(\`Pages.handleSearch('${collection}', '${searchId}')\`, \`Buscar ${title.toLowerCase()}...\`)
    )}
  `;

  renderTable();
  // Guarda el renderer para el buscador
  window[`render_${collection}`] = renderTable;
}

export function handleSearch(collection) {
  const searchTerm = event.target.value; // usa el evento del input
  const fn = window[`render_${collection}`];
  if (typeof fn === 'function') fn(searchTerm);
}

export function showSuccess(title, subtitle, details, createRoute, listRoute) {
  const content = document.getElementById('content');
  content.innerHTML = Components.successScreen(
    title,
    subtitle,
    details,
    `Router.navigate('${createRoute}')`,
    `Router.navigate('${listRoute}')`
  );
}

export function deleteItem(collection, id) {
  if (confirm('¿Está seguro de que desea eliminar este elemento?')) {
    DataStore.remove(collection, id);
    Router.handleRoute();
  }
}
