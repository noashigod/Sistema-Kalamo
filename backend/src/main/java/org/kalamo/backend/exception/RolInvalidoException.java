package org.kalamo.backend.exception;

public class RolInvalidoException extends RuntimeException {
    public RolInvalidoException(String rol) {
        super("Rol de usuario inválido: " + rol);
    }
}
