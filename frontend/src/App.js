import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from "react-router-dom";
import "./app.css"; // Asegúrate de que este archivo exista o remueve la línea

// Importa los componentes de lista desde la carpeta 'components'
import ListaAutores from "./components/ListaAutores";
import ListaLibros from "./components/ListaLibros";
import ListaUsuarios from "./components/ListaUsuarios";
import ListaEditoriales from "./components/ListaEditoriales";
import ListaPrestamos from "./components/ListaPrestamos";
import Login from "./components/Login";

// ==== Layout ====

function Layout({ children, onLogout }) {
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

          <div className="sidebar-section-title">Sesión</div>
          <button onClick={onLogout} className="sidebar-link-logout">Cerrar Sesión</button>

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
            <div className="stat-value"></div>
          </div>
        </div>
        <div className="card stat-card">
          <div className="card-content">
            <div className="stat-label">Préstamos activos</div>
            <div className="stat-value"></div>
          </div>
        </div>
        <div className="card stat-card">
          <div className="card-content">
            <div className="stat-label">Usuarios activos</div>
            <div className="stat-value"></div>
          </div>
        </div>
        <div className="card stat-card">
          <div className="card-content">
            <div className="stat-label">Autores</div>
            <div className="stat-value"></div>
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

// ==== App principal ====

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('user'));

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      {isAuthenticated ? (
        <Layout onLogout={handleLogout}>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/usuarios" element={<ListaUsuarios />} />
            <Route path="/autores" element={<ListaAutores />} />
            <Route path="/editoriales" element={<ListaEditoriales />} />
            <Route path="/libros" element={<ListaLibros />} />
            <Route path="/prestamos" element={<ListaPrestamos />} />
            {/* Redirige cualquier ruta no encontrada al dashboard */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          {/* Si no está autenticado, solo muestra el login */}
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          {/* Redirige cualquier otra ruta al login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}
