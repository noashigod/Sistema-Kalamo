import React, { useState } from 'react';

function CreatePrestamo({ onClose }) {
  const [libroId, setLibroId] = useState('');
  const [usuarioId, setUsuarioId] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!libroId || !usuarioId) {
      setError('Datos ingresados no válidos');
      return;
    }

    try {
      const resp = await fetch('/api/prestamos/crear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ libroId: Number(libroId), usuarioId: Number(usuarioId) })
      });

      if (!resp.ok) {
        const text = await resp.text();
        setError(text || 'Error al crear préstamo');
        return;
      }

      const data = await resp.json();
      setMessage(data.message || 'Préstamo registrado exitosamente');
      setLibroId('');
      setUsuarioId('');
    } catch (err) {
      setError('No se pudo conectar con el servidor');
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginTop: '1rem' }}>
      <h3>Crear nuevo préstamo</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Id del libro:</label>
          <input value={libroId} onChange={e => setLibroId(e.target.value)} />
        </div>
        <div>
          <label>Id del usuario:</label>
          <input value={usuarioId} onChange={e => setUsuarioId(e.target.value)} />
        </div>
        <div style={{ marginTop: '0.5rem' }}>
          <button type="submit">Confirmar préstamo</button>
          <button type="button" onClick={onClose} style={{ marginLeft: '0.5rem' }}>Cancelar</button>
        </div>
      </form>
      {message && <div style={{ color: 'green', marginTop: '0.5rem' }}>{message}</div>}
      {error && <div style={{ color: 'red', marginTop: '0.5rem' }}>{error}</div>}
    </div>
  );
}

export default CreatePrestamo;
