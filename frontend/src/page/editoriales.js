import { Components } from "../components.js";
import { DataStore } from "../datastore.js";
import { createListPage, showSuccess } from "./common.js";

export function listarEditoriales() {
  createListPage(
    'Editoriales',
    'Gestiona las editoriales registradas',
    '/editoriales/crear',
    'editoriales',
    ['ID', 'Nombre', 'País', 'Libros', 'Acciones'],
    (editorial) => `
      <tr>
        <td>${editorial.id}</td>
        <td>${editorial.nombre}</td>
        <td>${editorial.pais}</td>
        <td>${editorial.libros}</td>
        <td>
          <div class="action-buttons">
            <button class="action-btn">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
              </svg>
            </button>
            <button class="action-btn action-btn-delete" onclick="Pages.deleteItem('editoriales', ${editorial.id})">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        </td>
      </tr>
    `
  );
}

export function crearEditorial() {
  const paises = ['Argentina', 'Chile', 'Colombia', 'España', 'México', 'Perú', 'Estados Unidos', 'Reino Unido'];
  const content = document.getElementById('content');
  content.innerHTML = `
    ${Components.pageHeader('Crear Editorial', 'Registra una nueva editorial en el sistema')}
    <div style="max-width: 600px; margin: 0 auto;">
      ${Components.card('Información de la Editorial', `
        <form id="form-editorial" onsubmit="Pages.submitEditorial(event)">
          <div id="error-container"></div>
          ${Components.formGroup('Nombre de la editorial', 'nombre', 'text', 'Ej: Editorial Planeta')}
          ${Components.formSelect('País de origen', 'pais', paises.map(p => ({ value: p, label: p })))}
          <div class="flex gap-3 mt-3">
            <button type="submit" class="btn btn-primary">Registrar Editorial</button>
            <a href="#/editoriales" class="btn btn-outline">Cancelar</a>
          </div>
        </form>
      `)}
    </div>
  `;
}

export function submitEditorial(e) {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const pais = document.getElementById('pais').value;

  const errorContainer = document.getElementById('error-container');
  errorContainer.innerHTML = '';

  if (!nombre || !pais) {
    errorContainer.innerHTML = Components.alert('Todos los campos son obligatorios');
    return;
  }
  if (DataStore.editoriales.find(ed => ed.nombre.toLowerCase() === nombre.toLowerCase())) {
    errorContainer.innerHTML = Components.alert('Editorial ya existe');
    return;
  }

  DataStore.add('editoriales', { nombre, pais, libros: 0 });

  showSuccess(
    'Editorial registrada exitosamente',
    `La editorial ${nombre} ha sido registrada`,
    null,
    '/editoriales/crear',
    '/editoriales'
  );
}
