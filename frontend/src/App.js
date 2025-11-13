import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "./app.css";

// ==== Layout ====

function Layout({ children }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-logo">📚 Kalamo</div>

        <nav className="sidebar-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " sidebar-link-active" : "")
            }
          >
            Panel de control
          </NavLink>

          <div className="sidebar-section-title">Gestión</div>

          <NavLink
            to="/usuarios"
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " sidebar-link-active" : "")
            }
          >
            Usuarios
          </NavLink>
          <NavLink
            to="/autores"
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " sidebar-link-active" : "")
            }
          >
            Autores
          </NavLink>
          <NavLink
            to="/editoriales"
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " sidebar-link-active" : "")
            }
          >
            Editoriales
          </NavLink>
          <NavLink
            to="/libros"
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " sidebar-link-active" : "")
            }
          >
            Libros
          </NavLink>
          <NavLink
            to="/prestamos"
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " sidebar-link-active" : "")
            }
          >
            Préstamos
          </NavLink>
        </nav>
      </aside>

      <main className="main">
        <header className="topbar">
          <h1 className="topbar-title">Sistema de Gestión de Biblioteca</h1>
        </header>

        <div className="main-content">{children}</div>
      </main>
    </div>
  );
}

// ==== Componentes de página simples (luego puedes meter tu lógica real) ====

function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="page-header">
      <div>
        <h2 className="page-title">{title}</h2>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
      {actions && <div className="page-actions">{actions}</div>}
    </div>
  );
}

function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Panel de control"
        subtitle="Resumen general del sistema de biblioteca"
      />

      {/* Accesos rápidos */}
      <div className="grid grid-cols-3 mb-3">
        <button className="card quick-card">
          <div className="card-content quick-card-content">
            <div className="quick-card-icon icon-blue">＋</div>
            <div>Registrar nuevo libro</div>
          </div>
        </button>

        <button className="card quick-card">
          <div className="card-content quick-card-content">
            <div className="quick-card-icon icon-green">📝</div>
            <div>Registrar préstamo</div>
          </div>
        </button>

        <button className="card quick-card">
          <div className="card-content quick-card-content">
            <div className="quick-card-icon icon-purple">👤</div>
            <div>Agregar usuario</div>
          </div>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 mb-3">
        <div className="card stat-card">
          <div className="card-content">
            <div className="stat-label">Total Libros</div>
            <div className="stat-value">1,234</div>
          </div>
        </div>
        <div className="card stat-card">
          <div className="card-content">
            <div className="stat-label">Préstamos activos</div>
            <div className="stat-value">87</div>
          </div>
        </div>
        <div className="card stat-card">
          <div className="card-content">
            <div className="stat-label">Usuarios activos</div>
            <div className="stat-value">456</div>
          </div>
        </div>
        <div className="card stat-card">
          <div className="card-content">
            <div className="stat-label">Autores</div>
            <div className="stat-value">289</div>
          </div>
        </div>
      </div>

      {/* Tablas de ejemplo */}
      <div className="grid grid-cols-2">
        <div className="card">
          <div className="card-content">
            <h3 className="card-title">Últimos préstamos</h3>
            <table>
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Libro</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Juan Pérez</td>
                  <td>Cien años de soledad</td>
                  <td>01/11/2025</td>
                  <td>
                    <span className="badge badge-success">Activo</span>
                  </td>
                </tr>
                <tr>
                  <td>María López</td>
                  <td>Rayuela</td>
                  <td>30/10/2025</td>
                  <td>
                    <span className="badge badge-secondary">Devuelto</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <h3 className="card-title">Libros más prestados</h3>
            <ul className="list-simple">
              <li>Cien años de soledad</li>
              <li>1984</li>
              <li>El principito</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

function UsuariosListPage() {
  return (
    <>
      <PageHeader
        title="Usuarios"
        subtitle="Gestiona los usuarios del sistema"
        actions={<button className="btn btn-primary">Nuevo usuario</button>}
      />
      <div className="card">
        <div className="card-content">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Juan Pérez</td>
                <td>juan@example.com</td>
                <td>
                  <span className="badge badge-success">Bibliotecario</span>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Ana Gómez</td>
                <td>ana@example.com</td>
                <td>
                  <span className="badge badge-secondary">Usuario</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function SimplePage({ title, subtitle }) {
  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />
      <div className="card">
        <div className="card-content">
          <p>
            Esta es una página placeholder. Aquí puedes implementar el formulario
            o tabla real más adelante.
          </p>
        </div>
      </div>
    </>
  );
}

// ==== App principal ====

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />

          {/* Usuarios */}
          <Route
            path="/usuarios"
            element={<UsuariosListPage />}
          />
          <Route
            path="/usuarios/crear"
            element={
              <SimplePage
                title="Crear usuario"
                subtitle="Registra un nuevo usuario en el sistema"
              />
            }
          />

          {/* Autores */}
          <Route
            path="/autores"
            element={
              <SimplePage
                title="Autores"
                subtitle="Gestiona los autores registrados"
              />
            }
          />
          <Route
            path="/autores/crear"
            element={
              <SimplePage
                title="Crear autor"
                subtitle="Registra un nuevo autor"
              />
            }
          />

          {/* Editoriales */}
          <Route
            path="/editoriales"
            element={
              <SimplePage
                title="Editoriales"
                subtitle="Gestiona las editoriales"
              />
            }
          />
          <Route
            path="/editoriales/crear"
            element={
              <SimplePage
                title="Crear editorial"
                subtitle="Registra una nueva editorial"
              />
            }
          />

          {/* Libros */}
          <Route
            path="/libros"
            element={
              <SimplePage
                title="Libros"
                subtitle="Gestiona el catálogo de libros"
              />
            }
          />
          <Route
            path="/libros/crear"
            element={
              <SimplePage
                title="Crear libro"
                subtitle="Registra un nuevo libro"
              />
            }
          />

          {/* Préstamos */}
          <Route
            path="/prestamos"
            element={
              <SimplePage
                title="Préstamos"
                subtitle="Gestiona los préstamos de libros"
              />
            }
          />
          <Route
            path="/prestamos/crear"
            element={
              <SimplePage
                title="Crear préstamo"
                subtitle="Registra un nuevo préstamo"
              />
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
