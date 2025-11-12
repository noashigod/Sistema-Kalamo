package org.kalamo.backend.exception.dto;

import jakarta.validation.constraints.NotBlank;

public class CrearAutorRequest {

    @NotBlank(message = "El nombre del autor no puede estar vacío.")
    private String nombre;

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}