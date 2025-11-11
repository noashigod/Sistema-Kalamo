package org.kalamo.backend.exception.dto;

public class CrearUsuarioResponse {

    private Long id;
    private String mensaje;

    public CrearUsuarioResponse(Long id, String mensaje) {
        this.id = id;
        this.mensaje = mensaje;
    }

    public Long getId() { return id; }
    public String getMensaje() { return mensaje; }
}
