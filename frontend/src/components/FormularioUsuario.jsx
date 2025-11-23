import React, { useState, useEffect } from 'react';
import { crearUsuario, editarUsuario } from '../services/api';

/**
 * Componente de formulario para crear o editar un Usuario.
 * @param {object} props
 * @param {object} [props.usuarioAEditar] - El objeto del usuario si se está editando.
 * @param {function} [props.onGuardado] - Función a llamar después de guardar exitosamente.
 */
const FormularioUsuario = ({ usuarioAEditar, onGuardado }) => {
  const esModoEdicion = Boolean(usuarioAEditar);

  const [usuario, setUsuario] = useState({
    nombreCompleto: '',
    email: '',
    password: '',
    rol: 'USUARIO', // Valor por defecto
    activo: true,
    fechaNacimiento: '',
  });

  const [error, setError] = useState(null);
  const [mensajeExito, setMensajeExito] = useState('');

  useEffect(() => {
    if (esModoEdicion) {
      setUsuario({
        nombreCompleto: usuarioAEditar.nombreCompleto || '',
        email: usuarioAEditar.email || '',
        password: '', // La contraseña no se debe pre-cargar por seguridad
        rol: usuarioAEditar.rol || 'USUARIO',
        activo: usuarioAEditar.activo !== undefined ? usuarioAEditar.activo : true,
        fechaNacimiento: usuarioAEditar.fechaNacimiento || '',
      });
    } else {
      setUsuario({ nombreCompleto: '', email: '', password: '', rol: 'USUARIO', activo: true, fechaNacimiento: '' });
    }
  }, [usuarioAEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMensajeExito('');

    try {
      if (esModoEdicion) {
        await editarUsuario(usuarioAEditar.id, usuario);
        setMensajeExito('¡Usuario editado con éxito!');
      } else {
        await crearUsuario(usuario);
        setMensajeExito('¡Usuario creado con éxito!');
        setUsuario({ nombreCompleto: '', email: '', password: '', rol: 'USUARIO', activo: true, fechaNacimiento: '' });
      }

      if (onGuardado) {
        onGuardado();
      }

    } catch (err) {
      const errorMessage = err.response?.data?.message || 'No se pudo guardar el usuario. Revisa los campos.';
      setError(errorMessage);
    }
  };

  return (
    <div>
      <h2>{esModoEdicion ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombreCompleto">Nombre Completo:</label>
          <input type="text" id="nombreCompleto" name="nombreCompleto" value={usuario.nombreCompleto} onChange={handleChange} required placeholder="Ej: Juan Pérez" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={usuario.email} onChange={handleChange} required placeholder="Ej: juan.perez@email.com" />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" name="password" value={usuario.password} onChange={handleChange} required={!esModoEdicion} placeholder={esModoEdicion ? "Dejar en blanco para no cambiar" : ""} />
        </div>
        <div>
          <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
          <input type="date" id="fechaNacimiento" name="fechaNacimiento" value={usuario.fechaNacimiento} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="rol">Rol:</label>
          <select id="rol" name="rol" value={usuario.rol} onChange={handleChange} required>
            <option value="USUARIO">Usuario</option>
            <option value="BIBLIOTECARIO">Bibliotecario</option>
          </select>
        </div>
        {esModoEdicion && (
          <div>
            <label htmlFor="activo">Estado:</label>
            <select id="activo" name="activo" value={usuario.activo} onChange={handleChange}>
              <option value={true}>Activo</option>
              <option value={false}>Inactivo</option>
            </select>
          </div>
        )}
        <button type="submit">Guardar</button>
      </form>

      {mensajeExito && <p style={{ color: 'green' }}>{mensajeExito}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FormularioUsuario;