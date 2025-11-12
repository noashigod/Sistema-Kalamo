package org.kalamo.backend.service;

import org.kalamo.backend.entity.Prestamo;

import java.time.LocalDate;

public interface PrestamoService {

    Prestamo crearPrestamo(Long usuarioId, Long libroId);

    Prestamo actualizarPrestamo(Long id, Prestamo prestamo);

    Prestamo actualizarFechaDevolucion(Long prestamoId, LocalDate nuevaFecha);

    void eliminarPrestamo(Long id);

}