import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';

function App() {
  // Estado para guardar rol del usuario (null = no logueado)
  const [role, setRole] = useState(null);

  // Función para actualizar role después de login desde componente Login
  const handleLoginSuccess = (userRole) => {
    setRole(userRole);
  };

  // Función para logout (volver al estado no autenticado)
  const handleLogout = () => {
    setRole(null);
  };

  // Vista cuando el usuario **no está logueado**
  if (!role) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Login onLoginSuccess={handleLoginSuccess} />
        </header>
      </div>
    );
  }

  // Vista para administrador
  if (role === 'ADMIN') {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  // Vista para usuario normal
  return <UserDashboard onLogout={handleLogout} />;
}

export default App;

