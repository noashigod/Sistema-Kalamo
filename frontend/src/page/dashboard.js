import { Components } from "../components.js";
import { DataStore } from "../datastore.js";
import { Router } from "../router.js";

export function dashboard() {
  const content = document.getElementById('content');
  content.innerHTML = `
    ${Components.pageHeader('Panel de Control', 'Bienvenido al sistema de gestión de biblioteca')}

    <!-- Quick Access Cards -->
    <div class="grid grid-cols-3 mb-3">
      <div class="card quick-card" onclick="Router.navigate('/libros/crear')">
        <div class="card-content">
          <div class="quick-card-content">
            <div class="quick-card-icon icon-blue">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            <div>Registrar nuevo libro</div>
          </div>
        </div>
      </div>
      <div class="card quick-card" onclick="Router.navigate('/prestamos/crear')">
        <div class="card-content">
          <div class="quick-card-content">
            <div class="quick-card-icon icon-green">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div>Registrar préstamo</div>
          </div>
        </div>
      </div>
      <div class="card quick-card" onclick="Router.navigate('/usuarios/crear')">
        <div class="card-content">
          <div class="quick-card-content">
            <div class="quick-card-icon icon-purple">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
              </svg>
            </div>
            <div>Agregar usuario</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Statistics -->
    <div class="grid grid-cols-4 mb-3">
      <div class="card stat-card"><div class="card-content"><div class="stat-label">Total Libros</div><div class="stat-value"></div></div></div>
      <div class="card stat-card"><div class="card-content"><div class="stat-label">Préstamos Activos</div><div class="stat-value"></div></div></div>
      <div class="card stat-card"><div class="card-content"><div class="stat-label">Usuarios Activos</div><div class="stat-value"></div></div></div>
      <div class="card stat-card"><div class="card-content"><div class="stat-label">Autores</div><div class="stat-value"></div></div></div>
    </div>

    <!-- Recent Activity -->
    <div class="grid grid-cols-2">
      ${Components.card('Últimos Préstamos', Components.table(
        ['Usuario', 'Libro', 'Fecha', 'Estado'],
        DataStore.prestamos.slice(0, 3).map(p => `
          <tr>
            <td>${p.usuario}</td>
            <td>${p.libro}</td>
            <td>${p.fechaPrestamo}</td>
            <td>${Components.badge(p.estado, p.estado === 'Activo' ? 'success' : 'secondary')}</td>
          </tr>
        `)
      ))}

      ${Components.card('Libros Más Prestados', `
        <div class="flex flex-col gap-3">
          ${DataStore.libros.slice(0, 3).map((libro, index) => `
            <div class="flex items-center gap-3">
              <div class="avatar" style="background-color: var(--secondary);">${index + 1}</div>
              <div style="flex: 1;">
                <div>${libro.titulo}</div>
                <div class="text-gray" style="font-size: 14px;">${Math.floor(Math.random() * 50) + 20} préstamos</div>
              </div>
              <svg style="width: 20px; height: 20px; color: var(--secondary);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
          `).join('')}
        </div>
      `)}
    </div>
  `;
}
