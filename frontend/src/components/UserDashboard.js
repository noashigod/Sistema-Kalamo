import React from 'react';

function UserDashboard({ onLogout }) {
  return (
    <div>
      <h1>Hola usuario</h1>
      <button onClick={onLogout}>Cerrar sesión</button>
    </div>
  );
}

export default UserDashboard;
