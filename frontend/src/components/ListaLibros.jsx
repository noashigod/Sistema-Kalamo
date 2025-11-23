import React, { useState, useEffect } from 'react';
import { getLibros, deleteLibro } from '../services/api';
import FormularioLibro from '../components/FormularioLibro';

const ListaLibros = () => {
  const [libros, setLibros] = useState([]);
  const [libroAEditar, setLibroAEditar] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

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
        setError('No se pudo eliminar el libro.');
      }
    }
  };

  const handleEditar = (libro) => {
    setLibroAEditar(libro);
    setMostrarFormulario(true);
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
            <button onClick={() => handleEditar(libro)} style={{ marginLeft: '10px' }}>Editar</button>
            <button onClick={() => handleEliminar(libro.id)} style={{ marginLeft: '5px' }}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaLibros;