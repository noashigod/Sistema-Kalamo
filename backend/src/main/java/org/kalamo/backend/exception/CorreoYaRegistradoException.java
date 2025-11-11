package org.kalamo.backend.exception;

public class CorreoYaRegistradoException extends RuntimeException {
    public CorreoYaRegistradoException(String correo) {
        super("El correo ya está registrado: " + correo);
    }
}
