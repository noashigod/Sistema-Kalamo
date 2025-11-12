import { Components } from "../components.js";
import { DataStore } from "../datastore.js";
import { createListPage, showSuccess } from "./common.js";

export function listarLibros() {
  createListPage(
    'Catálogo de Libros',
    'Gestiona los libros del sistema',
    '/libros/crear',
    'libros',
    ['ID', 'Título', 'Autor', 'ISBN', 'Copias', 'Estado', 'Acciones'],
    (libro) => `
      <tr>
        <td>${libro.id}</td>
        <td>${libro.titulo}</td>
        <td>${libro.autor}</td>
        <td style="font-family: monospace; font-size: 13px;">${libro.isbn}</td>
        <td>${libro.copias}</td>
        <td>${Components.badge(libro.estado, libro.estado === 'Disponible' ? 'success' : 'warning')}</td>
        <td>
          <div class="action-buttons">
            <button class="action-btn">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            </button>
            <button class="action-btn">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
              </svg>
            </button>
            <button class="action-btn action-btn-delete" onclick="Pages.deleteItem('libros', ${libro.id})">
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

export function crearLibro() {
  const categorias = ['Ficción', 'No Ficción', 'Ciencia', 'Historia', 'Filosofía', 'Poesía'];
  const content = document.getElementById('content');
  content.innerHTML = `
    ${Components.pageHeader('Crear Libro', 'Registra un nuevo libro en el catálogo')}
    <div style="max-width: 800px; margin: 0 auto;">
      ${Components.card('Información del Libro', `
        <form id="form-libro" onsubmit="Pages.submitLibro(event)">
          <div id="error-container"></div>
          <h3 class="text-primary mb-2">Datos Básicos</h3>
          <div class="grid grid-cols-2 mb-3">
            ${Components.formGroup('Título del libro *', 'titulo', 'text', 'Ej: Cien años de soledad')}
            ${Components.formGroup('ISBN *', 'isbn', 'text', 'Ej: 978-3-16-148410-0')}
          </div>
          <h3 class="text-primary mb-2">Autoría y Publicación</h3>
          <div class="grid grid-cols-2 mb-3">
            ${Components.formSelect('Autor *', 'autor', DataStore.autores.map(a => ({ value: a.nombre, label: a.nombre })))}
            ${Components.formSelect('Editorial *', 'editorial', DataStore.editoriales.map(e => ({ value: e.nombre, label: e.nombre })))}
          </div>
          <h3 class="text-primary mb-2">Información Adicional</h3>
          <div class="grid grid-cols-3 mb-3">
            ${Components.formGroup('Año de publicación', 'anio', 'number', '2024')}
            ${Components.formGroup('Copias disponibles', 'copias', 'number', '5')}
            ${Components.formSelect('Categoría', 'categoria', categorias.map(c => ({ value: c, label: c })))}
          </div>
          <div class="flex gap-3 mt-3">
            <button type="submit" class="btn btn-primary">Registrar Libro</button>
            <a href="#/libros" class="btn btn-outline">Cancelar</a>
          </div>
        </form>
      `)}
    </div>
  `;
}

export function submitLibro(e) {
  e.preventDefault();
  const titulo = document.getElementById('titulo').value;
  const isbn = document.getElementById('isbn').value;
  const autor = document.getElementById('autor').value;
  const editorial = document.getElementById('editorial').value;
  const copias = parseInt(document.getElementById('copias').value) || 0;

  const errorContainer = document.getElementById('error-container');
  errorContainer.innerHTML = '';

  if (!titulo || !isbn || !autor || !editorial) {
    errorContainer.innerHTML = Components.alert('Los campos principales son obligatorios');
    return;
  }
  if (DataStore.libros.find(l => l.isbn === isbn)) {
    errorContainer.innerHTML = Components.alert('El libro ya existe');
    return;
  }

  DataStore.add('libros', { titulo, isbn, autor, copias, estado: 'Disponible' });

  showSuccess(
    'Libro registrado exitosamente',
    `El libro "${titulo}" ha sido registrado`,
    null,
    '/libros/crear',
    '/libros'
  );
}
