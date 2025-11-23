package org.kalamo.backend.service;

import org.kalamo.backend.entity.Prestamo;
import org.kalamo.backend.exception.dto.CrearPrestamoRequest;

import java.util.List;
import java.time.LocalDate;

public interface PrestamoService {

    Prestamo crearPrestamo(CrearPrestamoRequest request);

    Prestamo actualizarPrestamo(Long id, Prestamo prestamo);

    Prestamo actualizarFechaDevolucion(Long prestamoId, LocalDate nuevaFecha);

    void eliminarPrestamo(Long id);

    List<Prestamo> obtenerTodos();

    Prestamo marcarComoDevuelto(Long prestamoId);

}