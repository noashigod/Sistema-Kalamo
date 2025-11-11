import React, { useState } from 'react';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí simula login — reemplaza por llamada real a backend
    if (username === 'admin' && password === 'password') {
      onLoginSuccess('ADMIN');
    } else if (username === 'user' && password === 'password') {
      onLoginSuccess('USER');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">Ingresar</button>
    </form>
  );
}

export default Login;
