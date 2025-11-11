import React, { useState } from 'react';
import CreatePrestamo from './CreatePrestamo';
import EditPrestamo from './EditPrestamo';

function AdminDashboard({ onLogout }) {
  const [showCrear, setShowCrear] = useState(false);
  const [showEditar, setShowEditar] = useState(false);

  return (
    <div>
      <h1>Hola administrador</h1>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setShowCrear(prev => !prev)}>
          {showCrear ? 'Ocultar formulario de préstamo' : 'Crear Préstamo'}
        </button>
        <button onClick={() => setShowEditar(prev => !prev)} style={{ marginLeft: '0.5rem' }}>
          {showEditar ? 'Ocultar editar préstamo' : 'Editar Préstamo'}
        </button>
        <button onClick={onLogout} style={{ marginLeft: '0.5rem' }}>Cerrar sesión</button>
      </div>
      {showCrear && <CreatePrestamo onClose={() => setShowCrear(false)} />}
      {showEditar && <EditPrestamo onClose={() => setShowEditar(false)} />}
    </div>
  );
}

export default AdminDashboard;
