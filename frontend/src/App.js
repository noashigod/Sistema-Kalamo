import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Dashboard() {
  return (
    <div style={{ padding: 16 }}>
      <h1>Dashboard</h1>
      <p>Si ves esto, React está funcionando ✅</p>

      <nav style={{ display: "flex", gap: 12, marginTop: 8 }}>
        <Link to="/usuarios">Usuarios</Link>
        <Link to="/autores">Autores</Link>
        <Link to="/editoriales">Editoriales</Link>
        <Link to="/libros">Libros</Link>
        <Link to="/prestamos">Préstamos</Link>
      </nav>
    </div>
  );
}

function Placeholder({ title }) {
  return (
    <div style={{ padding: 16 }}>
      <h1>{title}</h1>
      <p>Página placeholder</p>
      <Link to="/">← Volver al dashboard</Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/usuarios" element={<Placeholder title="Usuarios" />} />
        <Route path="/usuarios/crear" element={<Placeholder title="Crear Usuario" />} />

        <Route path="/autores" element={<Placeholder title="Autores" />} />
        <Route path="/autores/crear" element={<Placeholder title="Crear Autor" />} />

        <Route path="/editoriales" element={<Placeholder title="Editoriales" />} />
        <Route path="/editoriales/crear" element={<Placeholder title="Crear Editorial" />} />

        <Route path="/libros" element={<Placeholder title="Catálogo de Libros" />} />
        <Route path="/libros/crear" element={<Placeholder title="Crear Libro" />} />

        <Route path="/prestamos" element={<Placeholder title="Préstamos" />} />
        <Route path="/prestamos/crear" element={<Placeholder title="Crear Préstamo" />} />
      </Routes>
    </BrowserRouter>
  );
}
