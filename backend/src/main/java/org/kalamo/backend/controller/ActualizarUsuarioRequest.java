package org.kalamo.backend.exception.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ActualizarUsuarioRequest {
    private String nombreCompleto;
    private String email;
    private String rol;
    private LocalDate fechaNacimiento;
    private Boolean activo;
}