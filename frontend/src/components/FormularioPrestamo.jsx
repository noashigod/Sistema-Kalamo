import React, { useState, useEffect } from 'react';
import { crearPrestamo, editarPrestamo, getUsuarios, getLibros } from '../services/api';

/**
 * Componente de formulario para crear o editar un Préstamo.
 * @param {object} props
 * @param {object} [props.prestamoAEditar] - El objeto del préstamo si se está editando.
 * @param {function} [props.onGuardado] - Función a llamar después de guardar exitosamente.
 */
const FormularioPrestamo = ({ prestamoAEditar, onGuardado }) => {
  const esModoEdicion = Boolean(prestamoAEditar);

  const [prestamo, setPrestamo] = useState({
    libroId: '',
    usuarioId: '',
    fechaInicio: '',
    fechaFinEsperada: '',
  });

  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  // Estados para las listas de los desplegables
  const [usuarios, setUsuarios] = useState([]);
  const [libros, setLibros] = useState([]);

  // Helper para formatear la fecha a YYYY-MM-DD para el input type="date"
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0];
  };

  // Helper para obtener la fecha de hoy en formato YYYY-MM-DD
  const getTodayString = () => new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (esModoEdicion) {
      setPrestamo({
        libroId: prestamoAEditar.libroId || '',
        usuarioId: prestamoAEditar.usuarioId || '',
        fechaInicio: formatDateForInput(prestamoAEditar.fechaInicio),
        fechaFinEsperada: formatDateForInput(prestamoAEditar.fechaFinEsperada),
      });
    } else {
      setPrestamo({
        libroId: '',
        usuarioId: '',
        fechaInicio: getTodayString(), // Establecer la fecha de inicio a hoy por defecto
        fechaFinEsperada: ''
      });
    }

    // Cargar los datos para los menús desplegables
    const cargarDatosDesplegables = async () => {
      try {
        const listaUsuarios = await getUsuarios();
        const listaLibros = await getLibros();
        setUsuarios(listaUsuarios);
        setLibros(listaLibros);
      } catch (err) {
        setError('No se pudieron cargar los datos para los formularios.');
      }
    };

    cargarDatosDesplegables();

  }, [prestamoAEditar, esModoEdicion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrestamo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setValidationError('');
    setMensajeExito('');

    // Validaciones de fecha
    if (prestamo.fechaFinEsperada < prestamo.fechaInicio) {
      setValidationError('La fecha de devolución no puede ser anterior a la fecha de préstamo.');
      return;
    }

    try {
      if (esModoEdicion) {
        await editarPrestamo(prestamoAEditar.id, prestamo);
        setMensajeExito('¡Préstamo editado con éxito!');
      } else {
        await crearPrestamo(prestamo);
        setMensajeExito('¡Préstamo creado con éxito!');
        setPrestamo({
          libroId: '',
          usuarioId: '',
          fechaInicio: getTodayString(), // Resetear a hoy
          fechaFinEsperada: ''
        });
      }

      if (onGuardado) {
        onGuardado();
      }

    } catch (err) {
      const errorMessage = err.response?.data?.message || 'No se pudo guardar el préstamo. Revisa los campos.';
      setError(errorMessage);
    }
  };

  return (
    <div>
      <h2>{esModoEdicion ? 'Editar Préstamo' : 'Registrar Nuevo Préstamo'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="libroId">Libro:</label>
          <select id="libroId" name="libroId" value={prestamo.libroId} onChange={handleChange} required>
            <option value="">Seleccione un libro</option>
            {libros.map(libro => (
              <option key={libro.id} value={libro.id}>
                {libro.titulo}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="usuarioId">Usuario:</label>
          <select id="usuarioId" name="usuarioId" value={prestamo.usuarioId} onChange={handleChange} required>
            <option value="">Seleccione un usuario</option>
            {usuarios.map(usuario => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.nombreCompleto}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="fechaInicio">Fecha de Préstamo:</label>
          <input type="date" id="fechaInicio" name="fechaInicio" value={prestamo.fechaInicio} onChange={handleChange} required readOnly={true} />
        </div>
        <div>
          <label htmlFor="fechaFinEsperada">Fecha de Devolución Esperada:</label>
          <input type="date" id="fechaFinEsperada" name="fechaFinEsperada" value={prestamo.fechaFinEsperada} onChange={handleChange} required />
        </div>
        <button type="submit">Guardar</button>
      </form>

      {mensajeExito && <p style={{ color: 'green' }}>{mensajeExito}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {validationError && <p style={{ color: 'red' }}>{validationError}</p>}
    </div>
  );
};

export default FormularioPrestamo;