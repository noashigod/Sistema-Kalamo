package org.kalamo.backend.exception;

public class PasswordInseguraException extends RuntimeException {
    public PasswordInseguraException() {
        super("Contraseña insegura. Debe cumplir la política de seguridad.");
    }
}
