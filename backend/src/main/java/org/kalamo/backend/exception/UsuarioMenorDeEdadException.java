package org.kalamo.backend.exception;

public class UsuarioMenorDeEdadException extends RuntimeException {
    public UsuarioMenorDeEdadException() {
        super("El usuario debe tener 18 años o más.");
    }
}
