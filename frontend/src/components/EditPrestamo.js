import React, { useState } from 'react';

function EditPrestamo({ onClose }) {
  const [prestamoId, setPrestamoId] = useState('');
  const [fecha, setFecha] = useState('');
  const [devuelto, setDevuelto] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!prestamoId) {
      setError('Id de préstamo requerido');
      return;
    }

    const body = {};
    if (fecha) body.fechaDevolucionEsperada = fecha;
    body.devuelto = devuelto;

    try {
      const resp = await fetch('/api/prestamos/' + prestamoId, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!resp.ok) {
        const text = await resp.text();
        setError(text || 'Error al actualizar préstamo');
        return;
      }

      const data = await resp.json();
      setMessage(data.message || 'Préstamo actualizado');
    } catch (err) {
      setError('No se pudo conectar con el servidor');
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginTop: '1rem' }}>
      <h3>Editar préstamo</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Id del préstamo:</label>
          <input value={prestamoId} onChange={e => setPrestamoId(e.target.value)} />
        </div>
        <div>
          <label>Fecha devolución esperada (YYYY-MM-DD):</label>
          <input value={fecha} onChange={e => setFecha(e.target.value)} placeholder="2025-11-25" />
        </div>
        <div>
          <label>
            <input type="checkbox" checked={devuelto} onChange={e => setDevuelto(e.target.checked)} /> Devuelto
          </label>
        </div>
        <div style={{ marginTop: '0.5rem' }}>
          <button type="submit">Actualizar préstamo</button>
          <button type="button" onClick={onClose} style={{ marginLeft: '0.5rem' }}>Cerrar</button>
        </div>
      </form>
      {message && <div style={{ color: 'green', marginTop: '0.5rem' }}>{message}</div>}
      {error && <div style={{ color: 'red', marginTop: '0.5rem' }}>{error}</div>}
    </div>
  );
}

export default EditPrestamo;
