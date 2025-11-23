import React, { useState, useEffect } from 'react';
import { getEditoriales, deleteEditorial } from '../services/api';
import FormularioEditorial from '../components/FormularioEditorial';

const ListaEditoriales = () => {
  const [editoriales, setEditoriales] = useState([]);
  const [editorialAEditar, setEditorialAEditar] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

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
        setError('No se pudo eliminar la editorial.');
      }
    }
  };

  const handleEditar = (editorial) => {
    setEditorialAEditar(editorial);
    setMostrarFormulario(true);
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
            <button onClick={() => handleEditar(editorial)} style={{ marginLeft: '10px' }}>Editar</button>
            <button onClick={() => handleEliminar(editorial.id)} style={{ marginLeft: '5px' }}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaEditoriales;