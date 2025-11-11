package org.kalamo.backend.exception;

public class UsuarioConPrestamosPendientesException extends RuntimeException {

    public UsuarioConPrestamosPendientesException(Long id) {
        super("No se puede eliminar el usuario " + id + " porque tiene préstamos pendientes.");
    }
}
