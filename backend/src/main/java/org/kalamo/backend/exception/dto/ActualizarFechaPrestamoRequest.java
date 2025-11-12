package org.kalamo.backend.exception.dto;

import java.time.LocalDate;

public class ActualizarFechaPrestamoRequest {
    private LocalDate nuevaFechaDevolucionEsperada;

    // Getter
    public LocalDate getNuevaFechaDevolucionEsperada() {
        return nuevaFechaDevolucionEsperada;
    }

    // Setter
    public void setNuevaFechaDevolucionEsperada(LocalDate nuevaFechaDevolucionEsperada) {
        this.nuevaFechaDevolucionEsperada = nuevaFechaDevolucionEsperada;
    }
}