import { Components } from "../components.js";
import { DataStore } from "../datastore.js";
import { showSuccess } from "./common.js";

export function listarPrestamos() {
  const { createListPage } = await import('./common.js');
  createListPage(
    'Préstamos',
    'Gestiona los préstamos de libros',
    '/prestamos/crear',
    'prestamos',
    ['ID', 'Usuario', 'Libro', 'Fecha Préstamo', 'Fecha Devolución', 'Estado', 'Acciones'],
    (prestamo) => {
      let badgeType = 'success';
      if (prestamo.estado === 'Devuelto') badgeType = 'secondary';
      if (prestamo.estado === 'Vencido') badgeType = 'warning';

      return `
        <tr>
          <td>${prestamo.id}</td>
          <td>${prestamo.usuario}</td>
          <td>${prestamo.libro}</td>
          <td>${prestamo.fechaPrestamo}</td>
          <td>${prestamo.fechaDevolucion}</td>
          <td>${Components.badge(prestamo.estado, badgeType)}</td>
          <td>
            <div class="action-buttons">
              <button class="action-btn">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </button>
              ${prestamo.estado === 'Activo' ? `
                <button class="action-btn" style="color: var(--green-700);">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </button>
              ` : ''}
            </div>
          </td>
        </tr>
      `;
    }
  );
}

export function crearPrestamo() {
  let currentStep = 1;
  let formData = { usuario: '', libro: '' };

  const render = () => {
    const content = document.getElementById('content');

    if (formData.usuario && formData.libro && currentStep === 4) {
      const fechaInicio = new Date().toLocaleDateString('es-ES');
      const fechaDevolucion = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES');

      showSuccess(
        'Préstamo registrado exitosamente',
        `El libro "${formData.libro}" ha sido prestado a ${formData.usuario}`,
        `
          <div class="info-row">
            <span class="text-gray">Fecha de préstamo:</span>
            <span>${fechaInicio}</span>
          </div>
          <div class="info-row">
            <span class="text-gray">Fecha de devolución:</span>
            <span>${fechaDevolucion}</span>
          </div>
        `,
        '/prestamos/crear',
        '/prestamos'
      );
      return;
    }

    content.innerHTML = `
      ${Components.pageHeader('Crear Préstamo', 'Registra un nuevo préstamo de libro')}
      <div style="max-width: 700px; margin: 0 auto;">
        <div class="progress-steps">
          ${[1, 2, 3].map(step => `
            <div class="step">
              <div class="step-number ${step <= currentStep ? 'active' : 'inactive'}">${step}</div>
              ${step < 3 ? `<div class="step-line ${step < currentStep ? 'active' : 'inactive'}"></div>` : ''}
            </div>
          `).join('')}
        </div>
        <div class="step-labels mb-3">
          <div class="step-label">Usuario</div>
          <div class="step-label">Libro</div>
          <div class="step-label">Confirmar</div>
        </div>

        ${Components.card(
          \`Paso ${currentStep}: ${['Seleccionar Usuario', 'Seleccionar Libro', 'Confirmar Préstamo'][currentStep - 1]}\`,
          `
            <div id="error-container"></div>
            ${currentStep === 1 ? `
              <div class="step-content-header">
                <div class="step-icon-wrapper icon-purple-bg">
                  <svg class="step-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <div>
                  <div>Selecciona el usuario</div>
                  <div class="text-gray" style="font-size: 14px;">¿Quién realizará el préstamo?</div>
                </div>
              </div>
              ${Components.formSelect('Usuario', 'usuario', DataStore.usuarios.map(u => ({ value: u.nombre, label: u.nombre })), formData.usuario)}
            ` : ''}

            ${currentStep === 2 ? `
              <div class="step-content-header">
                <div class="step-icon-wrapper icon-blue-bg">
                  <svg class="step-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                <div>
                  <div>Selecciona el libro</div>
                  <div class="text-gray" style="font-size: 14px;">¿Qué libro se va a prestar?</div>
                </div>
              </div>
              ${Components.formSelect('Libro', 'libro', DataStore.libros.filter(l => l.estado === 'Disponible').map(l => ({ value: l.titulo, label: l.titulo })), formData.libro)}
            ` : ''}

            ${currentStep === 3 ? `
              <div class="step-content-header">
                <div class="step-icon-wrapper icon-green-bg">
                  <svg class="step-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <div>Confirmar préstamo</div>
                  <div class="text-gray" style="font-size: 14px;">Revisa la información antes de confirmar</div>
                </div>
              </div>
              <div class="info-box">
                <div class="info-row"><span class="text-gray">Usuario:</span><span>${formData.usuario}</span></div>
                <div class="info-row"><span class="text-gray">Libro:</span><span>${formData.libro}</span></div>
                <div class="info-row"><span class="text-gray">Fecha de préstamo:</span><span>${new Date().toLocaleDateString('es-ES')}</span></div>
                <div class="info-row"><span class="text-gray">Fecha de devolución:</span><span>${new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES')}</span></div>
              </div>
            ` : ''}

            <div class="flex gap-3 mt-3">
              ${currentStep > 1 ? '<button class="btn btn-outline" onclick="Pages.prestamoBack()">Anterior</button>' : ''}
              ${currentStep < 3 ?
                '<button class="btn btn-primary" onclick="Pages.prestamoNext()">Siguiente</button>' :
                '<button class="btn btn-primary" onclick="Pages.prestamoSubmit()">Registrar Préstamo</button>'
              }
              <a href="#/prestamos" class="btn btn-outline">Cancelar</a>
            </div>
          `
        )}
      </div>
    `;
  };

  // Exponer handlers en window.Pages para que tus onClick sigan funcionando
  window.Pages = window.Pages || {};
  window.Pages.prestamoNext = () => {
    const errorContainer = document.getElementById('error-container');
    errorContainer.innerHTML = '';
    if (currentStep === 1) {
      const usuario = document.getElementById('usuario').value;
      if (!usuario) {
        errorContainer.innerHTML = Components.alert('Debe seleccionar un usuario');
        return;
      }
      formData.usuario = usuario;
    }
    if (currentStep === 2) {
      const libro = document.getElementById('libro').value;
      if (!libro) {
        errorContainer.innerHTML = Components.alert('Debe seleccionar un libro');
        return;
      }
      formData.libro = libro;
    }
    currentStep++;
    render();
  };

  window.Pages.prestamoBack = () => {
    currentStep--;
    render();
  };

  window.Pages.prestamoSubmit = () => {
    const fechaPrestamo = new Date().toLocaleDateString('es-ES');
    const fechaDevolucion = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES');

    DataStore.add('prestamos', {
      usuario: formData.usuario,
      libro: formData.libro,
      fechaPrestamo,
      fechaDevolucion,
      estado: 'Activo'
    });

    currentStep = 4;
    render();
  };

  render();
}
