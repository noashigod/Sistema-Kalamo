import React, { useState, useEffect } from 'react';
import { crearLibro, editarLibro, getAutores, getEditoriales } from '../services/api';

/**
 * Componente de formulario para crear o editar un Libro.
 * @param {object} props
 * @param {object} [props.libroAEditar] - El objeto del libro si se está editando.
 * @param {function} [props.onGuardado] - Función a llamar después de guardar exitosamente.
 */
const FormularioLibro = ({ libroAEditar, onGuardado }) => {
  const esModoEdicion = Boolean(libroAEditar);

  const [libro, setLibro] = useState({
    titulo: '',
    anioPublicacion: '',
    autorId: '', // Cambiado para enviar solo el ID
    editorialId: '', // Cambiado para enviar solo el ID
  });

  const [error, setError] = useState(null);
  const [mensajeExito, setMensajeExito] = useState('');
  // Estados para almacenar las listas para los desplegables
  const [autores, setAutores] = useState([]);
  const [editoriales, setEditoriales] = useState([]);

  useEffect(() => {
    if (esModoEdicion) {
      setLibro({
        titulo: libroAEditar.titulo || '',
        anioPublicacion: libroAEditar.anioPublicacion || '',
        autorId: libroAEditar.autor?.id || '', // Asumimos que el objeto autor viene en la respuesta
        editorialId: libroAEditar.editorial?.id || '', // Asumimos que el objeto editorial viene en la respuesta
      });
    } else {
      // Limpiar el formulario si cambiamos de modo edición a creación
      setLibro({ titulo: '', anioPublicacion: '', autorId: '', editorialId: '' });
    }

    // Cargar los datos para los menús desplegables al montar el componente
    const cargarDatosDesplegables = async () => {
      try {
        const listaAutores = await getAutores();
        const listaEditoriales = await getEditoriales();
        setAutores(listaAutores);
        setEditoriales(listaEditoriales);
      } catch (err) {
        setError('No se pudieron cargar los datos para los formularios.');
      }
    };

    cargarDatosDesplegables();

  }, [libroAEditar, esModoEdicion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLibro(prevState => ({
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
        await editarLibro(libroAEditar.id, libro);
        setMensajeExito('¡Libro editado con éxito!');
      } else {
        await crearLibro(libro);
        setMensajeExito('¡Libro creado con éxito!');
        setLibro({ titulo: '', anioPublicacion: '', autorId: '', editorialId: '' });
      }

      if (onGuardado) {
        onGuardado();
      }

    } catch (err) {
      const errorMessage = err.response?.data?.message || 'No se pudo guardar el libro. Revisa los campos.';
      setError(errorMessage);
    }
  };

  return (
    <div>
      <h2>{esModoEdicion ? 'Editar Libro' : 'Crear Nuevo Libro'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titulo">Título:</label>
          <input type="text" id="titulo" name="titulo" value={libro.titulo} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="anioPublicacion">Año de Publicación:</label>
          <input type="number" id="anioPublicacion" name="anioPublicacion" value={libro.anioPublicacion} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="autorId">Autor:</label>
          <select id="autorId" name="autorId" value={libro.autorId} onChange={handleChange} required>
            <option value="">Seleccione un autor</option>
            {autores.map(autor => (
              <option key={autor.id} value={autor.id}>
                {autor.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="editorialId">Editorial:</label>
          <select id="editorialId" name="editorialId" value={libro.editorialId} onChange={handleChange} required>
            <option value="">Seleccione una editorial</option>
            {editoriales.map(editorial => (
              <option key={editorial.id} value={editorial.id}>
                {editorial.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Guardar</button>
      </form>

      {mensajeExito && <p style={{ color: 'green' }}>{mensajeExito}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FormularioLibro;