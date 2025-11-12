package org.kalamo.backend.exception;

public class LibroNotFoundException extends RuntimeException {
    public LibroNotFoundException(String message) {
        super(message);
    }
}