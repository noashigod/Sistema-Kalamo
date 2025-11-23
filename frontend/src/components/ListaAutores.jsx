import React, { useState, useEffect } from 'react';
import { getAutores, deleteAutor } from '../services/api';
import FormularioAutor from '../components/FormularioAutor'; // Importamos el formulario

const ListaAutores = () => {
  const [autores, setAutores] = useState([]);
  const [autorAEditar, setAutorAEditar] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

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
        setError('No se pudo eliminar el autor.');
      }
    }
  };

  const handleEditar = (autor) => {
    setAutorAEditar(autor);
    setMostrarFormulario(true);
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
            <button onClick={() => handleEditar(autor)} style={{ marginLeft: '10px' }}>Editar</button>
            <button onClick={() => handleEliminar(autor.id)} style={{ marginLeft: '5px' }}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaAutores;