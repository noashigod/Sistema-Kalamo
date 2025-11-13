package org.kalamo.backend.exception.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CrearAutorRequest {

    @NotBlank(message = "El nombre del autor es obligatorio")
    private String nombre;

    @NotBlank(message = "La fecha de nacimiento es obligatoria")
    private String fechaNacimiento;

    private String fechaFallecimiento; // Puede ser nulo

    @NotBlank(message = "La biografía es obligatoria")
    private String biografia;

    @NotBlank(message = "Los géneros escritos son obligatorios")
    private String generosEscritos;
}