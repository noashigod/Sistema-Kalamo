import React from 'react';

function AdminDashboard({ onLogout }) {
  return (
    <div>
      <h1>Hola administrador</h1>
      <button onClick={onLogout}>Cerrar sesión</button>
    </div>
  );
}

export default AdminDashboard;
