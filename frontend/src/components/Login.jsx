import React, { useState } from 'react';
import { loginUsuario } from '../services/api';

/**
 * Componente de Login para Bibliotecarios y Usuarios.
 * @param {object} props
 * @param {function} props.onLoginSuccess - Función a llamar tras un login exitoso.
 */
const Login = ({ onLoginSuccess }) => {
  const [loginType, setLoginType] = useState('bibliotecario'); // 'bibliotecario' o 'usuario'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userData = await loginUsuario({ email, password });
      
      // Verificamos que el usuario tenga el rol de BIBLIOTECARIO
      if (userData && userData.rol === 'BIBLIOTECARIO') {
        // Guardamos la información del usuario o un token si el backend lo proporciona
        // Por simplicidad, aquí solo notificamos el éxito.
        localStorage.setItem('user', JSON.stringify(userData)); // Opcional: guardar datos
        onLoginSuccess();
      } else {
        setError('Acceso denegado. Se requiere rol de Bibliotecario.');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Email o contraseña incorrectos.';
      setError(errorMessage);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Iniciar Sesión</h2>
      
      

      {loginType === 'bibliotecario' ? (
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Ej: bibliotecario@email.com"
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Introduce tu contraseña"
              style={{ width: '100%', padding: '8px', marginBottom: '20px' }}
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px' }}>Entrar</button>
        </form>
      ) : (
        <p style={{ textAlign: 'center' }}>La sección de login para usuarios estará disponible próximamente.</p>
      )}

      {error && <p style={{ color: 'red', marginTop: '15px', textAlign: 'center' }}>{error}</p>}
    </div>
  );
};

export default Login;