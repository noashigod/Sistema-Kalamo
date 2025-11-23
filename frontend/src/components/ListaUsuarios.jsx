import React, { useState, useEffect } from 'react';
import { getUsuarios, deleteUsuario } from '../services/api';
import FormularioUsuario from '../components/FormularioUsuario';

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioAEditar, setUsuarioAEditar] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const cargarUsuarios = async () => {
    setCargando(true);
    setError(null);
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (err) {
      setError('No se pudieron cargar los usuarios.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      try {
        await deleteUsuario(id);
        cargarUsuarios();
      } catch (err) {
        setError('No se pudo eliminar el usuario.');
      }
    }
  };

  const handleEditar = (usuario) => {
    setUsuarioAEditar(usuario);
    setMostrarFormulario(true);
  };

  const handleCrear = () => {
    setUsuarioAEditar(null);
    setMostrarFormulario(true);
  };

  const handleGuardado = () => {
    setMostrarFormulario(false);
    setUsuarioAEditar(null);
    cargarUsuarios();
  };

  if (cargando) return <p>Cargando usuarios...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Gestión de Usuarios</h1>
      <button onClick={handleCrear}>Crear Nuevo Usuario</button>

      {mostrarFormulario && (
        <FormularioUsuario usuarioAEditar={usuarioAEditar} onGuardado={handleGuardado} />
      )}

      <hr />

      <h2>Lista de Usuarios</h2>
      <ul>
        {Array.isArray(usuarios) && usuarios.map((usuario) => (
          <li key={usuario.id}>
            {usuario.nombreCompleto} ({usuario.email})
            <button onClick={() => handleEditar(usuario)} style={{ marginLeft: '10px' }}>Editar</button>
            <button onClick={() => handleEliminar(usuario.id)} style={{ marginLeft: '5px' }}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaUsuarios;