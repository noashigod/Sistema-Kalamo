package org.kalamo.backend.exception.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CrearPrestamoRequest {
    private Long libroId;
    private Long usuarioId;
    private LocalDate fechaInicio;
    private LocalDate fechaFinEsperada;
}