import { Components } from "../components.js";
import { DataStore } from "../datastore.js";
import { createListPage, showSuccess } from "./common.js";

export function listarUsuarios() {
  createListPage(
    'Usuarios',
    'Gestiona los usuarios del sistema',
    '/usuarios/crear',
    'usuarios',
    ['ID', 'Nombre', 'Email', 'Rol', 'Estado', 'Acciones'],
    (usuario) => `
      <tr>
        <td>${usuario.id}</td>
        <td>${usuario.nombre}</td>
        <td>${usuario.email}</td>
        <td>${Components.badge(usuario.rol, usuario.rol === 'Bibliotecario' ? 'success' : 'secondary')}</td>
        <td>${Components.badge(usuario.estado, usuario.estado === 'Activo' ? 'success' : 'secondary')}</td>
        <td>
          <div class="action-buttons">
            <button class="action-btn">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
              </svg>
            </button>
            <button class="action-btn action-btn-delete" onclick="Pages.deleteItem('usuarios', ${usuario.id})">
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

export function crearUsuario() {
  const content = document.getElementById('content');
  content.innerHTML = `
    ${Components.pageHeader('Crear Usuario', 'Registra un nuevo usuario en el sistema')}
    <div style="max-width: 600px; margin: 0 auto;">
      ${Components.card('Información del Usuario', `
        <form id="form-usuario" onsubmit="Pages.submitUsuario(event)">
          <div id="error-container"></div>
          ${Components.formGroup('Nombre completo', 'nombre', 'text', 'Ej: Juan Pérez')}
          ${Components.formGroup('Correo electrónico', 'email', 'email', 'ejemplo@correo.com')}
          ${Components.formGroup('Contraseña', 'password', 'password', 'Mínimo 6 caracteres')}
          ${Components.formSelect('Rol', 'rol', [
            { value: 'Usuario', label: 'Usuario' },
            { value: 'Bibliotecario', label: 'Bibliotecario' }
          ])}
          <div class="flex gap-3 mt-3">
            <button type="submit" class="btn btn-primary">Registrar Usuario</button>
            <a href="#/usuarios" class="btn btn-outline">Cancelar</a>
          </div>
        </form>
      `)}
    </div>
  `;
}

export function submitUsuario(e) {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const rol = document.getElementById('rol').value;

  const errorContainer = document.getElementById('error-container');
  errorContainer.innerHTML = '';

  if (!nombre || !email || !password || !rol) {
    errorContainer.innerHTML = Components.alert('Todos los campos son obligatorios');
    return;
  }
  if (password.length < 6) {
    errorContainer.innerHTML = Components.alert('Contraseña insegura. Debe tener al menos 6 caracteres');
    return;
  }
  if (DataStore.usuarios.find(u => u.email === email)) {
    errorContainer.innerHTML = Components.alert('El correo ya está registrado');
    return;
  }

  DataStore.add('usuarios', { nombre, email, rol, estado: 'Activo' });

  showSuccess(
    'Usuario creado satisfactoriamente',
    `El usuario ${nombre} ha sido registrado`,
    null,
    '/usuarios/crear',
    '/usuarios'
  );
}
