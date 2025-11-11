package org.kalamo.backend.service;

import org.kalamo.backend.entity.Prestamo;

public interface PrestamoService {
    Prestamo crearPrestamo(Long libroId, Long usuarioId);
    Prestamo editarPrestamo(Long prestamoId, Boolean devuelto, java.time.LocalDate fechaDevolucionEsperada);
}
