import React, { useState, useEffect } from 'react';
import { crearEditorial, editarEditorial } from '../services/api';

/**
 * Componente de formulario para crear o editar una Editorial.
 * @param {object} props
 * @param {object} [props.editorialAEditar] - El objeto de la editorial si se está editando.
 * @param {function} [props.onGuardado] - Función a llamar después de guardar exitosamente.
 */
const FormularioEditorial = ({ editorialAEditar, onGuardado }) => {
  const esModoEdicion = Boolean(editorialAEditar);

  const [editorial, setEditorial] = useState({
    name: '',
    country: '',
  });

  const [error, setError] = useState(null);
  const [mensajeExito, setMensajeExito] = useState('');

  useEffect(() => {
    if (esModoEdicion) {
      setEditorial({
        name: editorialAEditar.name || '',
        country: editorialAEditar.country || '',
      });
    } else {
      setEditorial({ name: '', country: '' });
    }
  }, [editorialAEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditorial(prevState => ({
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
        await editarEditorial(editorialAEditar.id, editorial);
        setMensajeExito('¡Editorial editada con éxito!');
      } else {
        await crearEditorial(editorial);
        setMensajeExito('¡Editorial creada con éxito!');
        setEditorial({ name: '', country: '' });
      }

      if (onGuardado) {
        onGuardado();
      }

    } catch (err) {
      const errorMessage = err.response?.data?.message || 'No se pudo guardar la editorial. Revisa los campos.';
      setError(errorMessage);
    }
  };

  return (
    <div>
      <h2>{esModoEdicion ? 'Editar Editorial' : 'Crear Nueva Editorial'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input type="text" id="name" name="name" value={editorial.name} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="country">País:</label>
          <input type="text" id="country" name="country" value={editorial.country} onChange={handleChange} required />
        </div>
        <button type="submit">Guardar</button>
      </form>

      {mensajeExito && <p style={{ color: 'green' }}>{mensajeExito}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FormularioEditorial;