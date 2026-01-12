import React, { useState, useEffect } from 'react';
import { getPrestamos, deletePrestamo, devolverPrestamo } from '../services/api';
import FormularioPrestamo from '../components/FormularioPrestamo';

const ListaPrestamos = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [prestamoAEditar, setPrestamoAEditar] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [prestamoSeleccionado, setPrestamoSeleccionado] = useState(null);

  const cargarPrestamos = async () => {
    setCargando(true);
    setError(null);
    try {
      const data = await getPrestamos();
      setPrestamos(data);
    } catch (err) {
      setError('No se pudieron cargar los préstamos.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarPrestamos();
  }, []);

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este préstamo?')) {
      try {
        await deletePrestamo(id);
        cargarPrestamos();
      } catch (err) {
        const msg = err.response?.data?.mensaje || err.response?.data?.message || 'No se pudo eliminar el préstamo.';
        setError(msg);
      }
    }
  };

  const handleDevolver = async (id) => {
    if (window.confirm('¿Marcar este préstamo como devuelto?')) {
      try {
        await devolverPrestamo(id);
        // Recargamos la lista para que se actualice el estado
        cargarPrestamos();
      } catch (err) {
        const errorMessage = err.response?.data?.message || 'No se pudo actualizar el préstamo.';
        setError(errorMessage);
        // Ocultar el error después de unos segundos
        setTimeout(() => setError(null), 5000);
      }
    }
  };

  const handleConsultar = (prestamo) => {
    setPrestamoSeleccionado(prestamo);
    setMostrarFormulario(false);
  };

  const handleCrear = () => {
    setPrestamoAEditar(null);
    setMostrarFormulario(true);
  };

  const handleGuardado = () => {
    setMostrarFormulario(false);
    setPrestamoAEditar(null);
    cargarPrestamos();
  };

  if (cargando) return <p>Cargando préstamos...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Gestión de Préstamos</h1>
      <button onClick={handleCrear}>Registrar Nuevo Préstamo</button>

      {mostrarFormulario && (
        <FormularioPrestamo prestamoAEditar={prestamoAEditar} onGuardado={handleGuardado} />
      )}

      <hr />

      <h2>Lista de Préstamos</h2>
      <ul>
        {Array.isArray(prestamos) && prestamos.map((prestamo) => (
          <li key={prestamo.id} style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
            <span style={{ flexGrow: 1 }}>
              <strong>Libro:</strong> {prestamo.libro.titulo} <br />
              <small><strong>Usuario:</strong> {prestamo.usuario.nombreCompleto} | <strong>Fecha:</strong> {new Date(prestamo.fechaInicio).toLocaleDateString()}</small>
            </span>
            <div style={{ flexGrow: 1 }}>
              {prestamo.devuelto ? (
              <span style={{ color: 'green', fontWeight: 'bold' }}>Devuelto el {new Date(prestamo.fechaDevolucion).toLocaleDateString()}</span>
              ) : (
                <button onClick={() => handleDevolver(prestamo.id)}>Marcar como Devuelto</button>
              )}
            </div>
            <button onClick={() => handleConsultar(prestamo)} style={{ marginLeft: '5px' }}>Consultar</button>
            <button onClick={() => handleEliminar(prestamo.id)} style={{ marginLeft: '5px' }}>Eliminar</button>
          </li>
        ))}
      </ul>

      {prestamoSeleccionado && (
        <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
          <h3>Detalle de Préstamo</h3>
          <p><strong>ID:</strong> {prestamoSeleccionado.id}</p>
          <p><strong>Libro:</strong> {prestamoSeleccionado.libro.titulo} (ID {prestamoSeleccionado.libro.id})</p>
          <p><strong>Usuario:</strong> {prestamoSeleccionado.usuario.nombreCompleto} (ID {prestamoSeleccionado.usuario.id})</p>
          <p><strong>Fecha Inicio:</strong> {new Date(prestamoSeleccionado.fechaInicio).toLocaleDateString()}</p>
          <p><strong>Fecha Fin Esperada:</strong> {new Date(prestamoSeleccionado.fechaFinEsperada).toLocaleDateString()}</p>
          <p><strong>Fecha Devolución:</strong> {prestamoSeleccionado.fechaDevolucion ? new Date(prestamoSeleccionado.fechaDevolucion).toLocaleDateString() : 'N/A'}</p>
          <p><strong>Devuelto:</strong> {prestamoSeleccionado.devuelto ? 'Sí' : 'No'}</p>
          <button onClick={() => setPrestamoSeleccionado(null)}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default ListaPrestamos;