import React, { useState, useEffect } from 'react';
import { crearAutor, editarAutor } from '../services/api';

/**
 * Componente de formulario para crear o editar un Autor.
 * @param {object} props
 * @param {object} [props.autorAEditar] - El objeto del autor si se está editando.
 * @param {function} [props.onGuardado] - Función a llamar después de guardar exitosamente.
 */
const FormularioAutor = ({ autorAEditar, onGuardado }) => {
  // Determina si estamos en modo edición basado en las props
  const esModoEdicion = Boolean(autorAEditar);

  // Estado para los datos del formulario
  const [autor, setAutor] = useState({
    nombre: "",
    fechaNacimiento: "",
    fechaFallecimiento: "",
    biografia: "",
    generosEscritos: "",
  });
  const [sigueVivo, setSigueVivo] = useState(false);

  const [error, setError] = useState(null);
  const [mensajeExito, setMensajeExito] = useState('');

  // useEffect para llenar el formulario si estamos en modo edición
  useEffect(() => {
    if (esModoEdicion) {
      const autorSigueVivo = !autorAEditar.fechaFallecimiento;
      setSigueVivo(autorSigueVivo);
      setAutor({
        nombre: autorAEditar.nombre || "",
        fechaNacimiento: autorAEditar.fechaNacimiento || "",
        fechaFallecimiento: autorSigueVivo ? "" : (autorAEditar.fechaFallecimiento || ""),
        biografia: autorAEditar.biografia || "",
        generosEscritos: autorAEditar.generosEscritos || "",
      });
    } else {
      // Limpiar el formulario para el modo creación
      setAutor({ nombre: "", fechaNacimiento: "", fechaFallecimiento: "", biografia: "", generosEscritos: "" });
      setSigueVivo(false);
    }
    // Se quita la dependencia de esModoEdicion para evitar re-renders innecesarios
  }, [autorAEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAutor(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSigueVivoChange = (e) => {
    const checked = e.target.checked;
    setSigueVivo(checked);
    if (checked) {
      setAutor(prevState => ({
        ...prevState,
        fechaFallecimiento: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMensajeExito('');

    const datosAEnviar = { ...autor };
    if (sigueVivo || datosAEnviar.fechaFallecimiento === '') {
      datosAEnviar.fechaFallecimiento = null;
    }
    try {
      if (esModoEdicion) {
        // Lógica de edición
        await editarAutor(autorAEditar.id, datosAEnviar);
        setMensajeExito('¡Autor editado con éxito!');
      } else {
        // Lógica de creación
        await crearAutor(datosAEnviar);
        setMensajeExito('¡Autor creado con éxito!');
        // Limpiar formulario después de crear
        setAutor({ nombre: "", fechaNacimiento: "", fechaFallecimiento: "", biografia: "", generosEscritos: "" });
      }

      // Si se proporcionó una función onGuardado, la llamamos
      if (onGuardado) {
        onGuardado();
      }

    } catch (err) {
      const errorMessage = err.response?.data?.message || 'No se pudo guardar el autor. Revisa los campos.';
      setError(errorMessage);
    }
  };

  return (
    <div>
      <h2>{esModoEdicion ? 'Editar Autor' : 'Crear Nuevo Autor'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" value={autor.nombre} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
          <input type="date" id="fechaNacimiento" name="fechaNacimiento" value={autor.fechaNacimiento} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="fechaFallecimiento">Fecha de Fallecimiento:</label>
          <input type="date" id="fechaFallecimiento" name="fechaFallecimiento" value={autor.fechaFallecimiento} onChange={handleChange} disabled={sigueVivo} />
        </div>
        <div>
          <label>
            <input type="checkbox" checked={sigueVivo} onChange={handleSigueVivoChange} />
            El autor sigue vivo
          </label>
        </div>
        <div>
          <label htmlFor="generosEscritos">Géneros:</label>
          <input type="text" id="generosEscritos" name="generosEscritos" value={autor.generosEscritos} onChange={handleChange} required placeholder="Ej: Novela, Poesía, Ensayo" />
        </div>
        <div>
          <label htmlFor="biografia">Biografía:</label>
          <textarea
            id="biografia" name="biografia" value={autor.biografia}
            onChange={handleChange} required rows="4"
            style={{ width: '100%', marginTop: '5px' }}
          />
        </div>
        <button type="submit">Guardar</button>
      </form>

      {mensajeExito && <p style={{ color: 'green' }}>{mensajeExito}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FormularioAutor;