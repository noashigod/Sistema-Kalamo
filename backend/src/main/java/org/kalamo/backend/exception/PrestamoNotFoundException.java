package org.kalamo.backend.exception;

public class PrestamoNotFoundException extends RuntimeException {
    public PrestamoNotFoundException(Long id) {
        super("Préstamo con id " + id + " no encontrado.");
    }
}
