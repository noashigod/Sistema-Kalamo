package org.kalamo.backend.exception;

public class LibroNoDisponibleException extends RuntimeException {
    public LibroNoDisponibleException(Long libroId) {
        super("El libro con id " + libroId + " no se encuentra disponible por los momentos");
    }
}
