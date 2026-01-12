import React, { useState, useEffect } from 'react';
import { getAutores, deleteAutor } from '../services/api';
import FormularioAutor from '../components/FormularioAutor'; // Importamos el formulario

const ListaAutores = () => {
  const [autores, setAutores] = useState([]);
  const [autorAEditar, setAutorAEditar] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [autorSeleccionado, setAutorSeleccionado] = useState(null);

  // Función para cargar o recargar los autores
  const cargarAutores = async () => {
    setCargando(true);
    setError(null);
    try {
      const data = await getAutores();
      setAutores(data);
    } catch (err) {
      setError('No se pudieron cargar los autores.');
    } finally {
      setCargando(false);
    }
  };

  // useEffect para cargar los autores cuando el componente se monta
  useEffect(() => {
    cargarAutores();
  }, []);

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este autor?')) {
      try {
        await deleteAutor(id);
        // Recargamos la lista para reflejar el cambio
        cargarAutores();
      } catch (err) {
        const msg = err.response?.data?.mensaje || err.response?.data?.message || 'No se pudo eliminar el autor.';
        setError(msg);
      }
    }
  };

  const handleEditar = (autor) => {
    setAutorAEditar(autor);
    setMostrarFormulario(true);
  };

  const handleConsultar = (autor) => {
    setAutorSeleccionado(autor);
    setMostrarFormulario(false);
  };

  const handleCrear = () => {
    setAutorAEditar(null); // Nos aseguramos de que no hay un autor para editar
    setMostrarFormulario(true);
  };

  const handleGuardado = () => {
    setMostrarFormulario(false);
    setAutorAEditar(null);
    cargarAutores(); // Recargamos la lista
  };

  if (cargando) return <p>Cargando autores...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Gestión de Autores</h1>
      <button onClick={handleCrear}>Crear Nuevo Autor</button>

      {mostrarFormulario && (
        <FormularioAutor autorAEditar={autorAEditar} onGuardado={handleGuardado} />
      )}

      <hr />

      <h2>Lista de Autores</h2>
      <ul>
        {Array.isArray(autores) && autores.map((autor) => (
          <li key={autor.id}>
            {autor.nombre}
            <button onClick={() => handleConsultar(autor)} style={{ marginLeft: '10px' }}>Consultar</button>
            <button onClick={() => handleEditar(autor)} style={{ marginLeft: '10px' }}>Editar</button>
            <button onClick={() => handleEliminar(autor.id)} style={{ marginLeft: '5px' }}>Eliminar</button>
          </li>
        ))}
      </ul>

      {autorSeleccionado && (
        <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
          <h3>Detalle de Autor</h3>
          <p><strong>ID:</strong> {autorSeleccionado.id}</p>
          <p><strong>Nombre:</strong> {autorSeleccionado.nombre}</p>
          <p><strong>Fecha Nacimiento:</strong> {autorSeleccionado.fechaNacimiento}</p>
          <p><strong>Fecha Fallecimiento:</strong> {autorSeleccionado.fechaFallecimiento || 'N/A'}</p>
          <p><strong>Biografía:</strong> {autorSeleccionado.biografia}</p>
          <p><strong>Géneros:</strong> {autorSeleccionado.generosEscritos}</p>
          <button onClick={() => setAutorSeleccionado(null)}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default ListaAutores;