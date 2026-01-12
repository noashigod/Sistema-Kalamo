import React, { useState, useEffect } from 'react';
import { getLibros, deleteLibro } from '../services/api';
import FormularioLibro from '../components/FormularioLibro';

const ListaLibros = () => {
  const [libros, setLibros] = useState([]);
  const [libroAEditar, setLibroAEditar] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [libroSeleccionado, setLibroSeleccionado] = useState(null);

  const cargarLibros = async () => {
    setCargando(true);
    setError(null);
    try {
      const data = await getLibros();
      setLibros(data);
    } catch (err) {
      setError('No se pudieron cargar los libros.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarLibros();
  }, []);

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este libro?')) {
      try {
        await deleteLibro(id);
        cargarLibros();
      } catch (err) {
        const msg = err.response?.data?.mensaje || err.response?.data?.message || 'No se pudo eliminar el libro.';
        setError(msg);
      }
    }
  };

  const handleEditar = (libro) => {
    setLibroAEditar(libro);
    setMostrarFormulario(true);
  };

  const handleConsultar = (libro) => {
    setLibroSeleccionado(libro);
    setMostrarFormulario(false);
  };

  const handleCrear = () => {
    setLibroAEditar(null);
    setMostrarFormulario(true);
  };

  const handleGuardado = () => {
    setMostrarFormulario(false);
    setLibroAEditar(null);
    cargarLibros();
  };

  if (cargando) return <p>Cargando libros...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Gestión de Libros</h1>
      <button onClick={handleCrear}>Crear Nuevo Libro</button>

      {mostrarFormulario && (
        <FormularioLibro libroAEditar={libroAEditar} onGuardado={handleGuardado} />
      )}

      <hr />

      <h2>Lista de Libros</h2>
      <ul>
        {Array.isArray(libros) && libros.map((libro) => (
          <li key={libro.id} style={{ marginBottom: '10px' }}>
            <strong>{libro.titulo}</strong> ({libro.anioPublicacion}) <br />
            <small>Autor: {libro.autorNombre} | Editorial: {libro.editorialNombre}</small>
            <button onClick={() => handleConsultar(libro)} style={{ marginLeft: '10px' }}>Consultar</button>
            <button onClick={() => handleEditar(libro)} style={{ marginLeft: '10px' }}>Editar</button>
            <button onClick={() => handleEliminar(libro.id)} style={{ marginLeft: '5px' }}>Eliminar</button>
          </li>
        ))}
      </ul>

      {libroSeleccionado && (
        <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
          <h3>Detalle de Libro</h3>
          <p><strong>ID:</strong> {libroSeleccionado.id}</p>
          <p><strong>Título:</strong> {libroSeleccionado.titulo}</p>
          <p><strong>Año Publicación:</strong> {libroSeleccionado.anioPublicacion}</p>
          <p><strong>Autor:</strong> {libroSeleccionado.autorNombre} (ID {libroSeleccionado.autorId})</p>
          <p><strong>Editorial:</strong> {libroSeleccionado.editorialNombre} (ID {libroSeleccionado.editorialId})</p>
          <button onClick={() => setLibroSeleccionado(null)}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default ListaLibros;