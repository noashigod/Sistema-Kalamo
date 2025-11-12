import { Components } from "../components.js";
import { DataStore } from "../datastore.js";
import { createListPage, showSuccess } from "./common.js";

export function listarAutores() {
  createListPage(
    'Autores',
    'Gestiona los autores registrados',
    '/autores/crear',
    'autores',
    ['ID', 'Nombre', 'Fecha de Nacimiento', 'Géneros', 'Libros', 'Acciones'],
    (autor) => `
      <tr>
        <td>${autor.id}</td>
        <td>${autor.nombre}</td>
        <td>${new Date(autor.fechaNacimiento).toLocaleDateString('es-ES')}</td>
        <td>${autor.generos}</td>
        <td>${autor.libros}</td>
        <td>
          <div class="action-buttons">
            <button class="action-btn">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
              </svg>
            </button>
            <button class="action-btn action-btn-delete" onclick="Pages.deleteItem('autores', ${autor.id})">
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

export function crearAutor() {
  const content = document.getElementById('content');
  content.innerHTML = `
    ${Components.pageHeader('Crear Autor', 'Registra un nuevo autor en el sistema')}
    <div style="max-width: 800px; margin: 0 auto;">
      ${Components.card('Información del Autor', `
        <form id="form-autor" onsubmit="Pages.submitAutor(event)">
          <div id="error-container"></div>
          <div class="grid grid-cols-2 mb-2">
            ${Components.formGroup('Nombre completo *', 'nombre', 'text', 'Ej: Gabriel García Márquez')}
            ${Components.formGroup('Géneros literarios', 'generos', 'text', 'Ej: Realismo mágico, Novela')}
          </div>
          <div class="grid grid-cols-2 mb-2">
            ${Components.formGroup('Fecha de nacimiento', 'fechaNacimiento', 'date')}
            ${Components.formGroup('Fecha de fallecimiento (opcional)', 'fechaFallecimiento', 'date')}
          </div>
          ${Components.formTextarea('Biografía', 'biografia', 'Breve biografía del autor...')}
          <div class="flex gap-3 mt-3">
            <button type="submit" class="btn btn-primary">Registrar Autor</button>
            <a href="#/autores" class="btn btn-outline">Cancelar</a>
          </div>
        </form>
      `)}
    </div>
  `;
}

export function submitAutor(e) {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const generos = document.getElementById('generos').value;
  const fechaNacimiento = document.getElementById('fechaNacimiento').value;

  const errorContainer = document.getElementById('error-container');
  errorContainer.innerHTML = '';

  if (!nombre) {
    errorContainer.innerHTML = Components.alert('El nombre del autor es obligatorio');
    return;
  }
  if (DataStore.autores.find(a => a.nombre.toLowerCase() === nombre.toLowerCase())) {
    errorContainer.innerHTML = Components.alert('El autor ya existe');
    return;
  }

  DataStore.add('autores', { nombre, generos, fechaNacimiento, libros: 0 });

  showSuccess(
    'Autor creado con éxito',
    `El autor ${nombre} ha sido registrado`,
    null,
    '/autores/crear',
    '/autores'
  );
}
