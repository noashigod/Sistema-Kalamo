import React, { useState, useEffect } from 'react';
import { getEditoriales, deleteEditorial } from '../services/api';
import FormularioEditorial from '../components/FormularioEditorial';

const ListaEditoriales = () => {
  const [editoriales, setEditoriales] = useState([]);
  const [editorialAEditar, setEditorialAEditar] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editorialSeleccionada, setEditorialSeleccionada] = useState(null);

  const cargarEditoriales = async () => {
    setCargando(true);
    setError(null);
    try {
      const data = await getEditoriales();
      setEditoriales(data);
    } catch (err) {
      setError('No se pudieron cargar las editoriales.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarEditoriales();
  }, []);

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta editorial?')) {
      try {
        await deleteEditorial(id);
        cargarEditoriales();
      } catch (err) {
        const msg = err.response?.data?.mensaje || err.response?.data?.message || 'No se pudo eliminar la editorial.';
        setError(msg);
      }
    }
  };

  const handleEditar = (editorial) => {
    setEditorialAEditar(editorial);
    setMostrarFormulario(true);
  };

  const handleConsultar = (editorial) => {
    setEditorialSeleccionada(editorial);
    setMostrarFormulario(false);
  };

  const handleCrear = () => {
    setEditorialAEditar(null);
    setMostrarFormulario(true);
  };

  const handleGuardado = () => {
    setMostrarFormulario(false);
    setEditorialAEditar(null);
    cargarEditoriales();
  };

  if (cargando) return <p>Cargando editoriales...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Gestión de Editoriales</h1>
      <button onClick={handleCrear}>Crear Nueva Editorial</button>

      {mostrarFormulario && (
        <FormularioEditorial editorialAEditar={editorialAEditar} onGuardado={handleGuardado} />
      )}

      <hr />

      <h2>Lista de Editoriales</h2>
      <ul>
        {Array.isArray(editoriales) && editoriales.map((editorial) => (
          <li key={editorial.id}>
            {editorial.name} (País: {editorial.country || 'N/A'})
            <button onClick={() => handleConsultar(editorial)} style={{ marginLeft: '10px' }}>Consultar</button>
            <button onClick={() => handleEditar(editorial)} style={{ marginLeft: '10px' }}>Editar</button>
            <button onClick={() => handleEliminar(editorial.id)} style={{ marginLeft: '5px' }}>Eliminar</button>
          </li>
        ))}
      </ul>

      {editorialSeleccionada && (
        <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
          <h3>Detalle de Editorial</h3>
          <p><strong>ID:</strong> {editorialSeleccionada.id}</p>
          <p><strong>Nombre:</strong> {editorialSeleccionada.name}</p>
          <p><strong>País:</strong> {editorialSeleccionada.country}</p>
          <button onClick={() => setEditorialSeleccionada(null)}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default ListaEditoriales;