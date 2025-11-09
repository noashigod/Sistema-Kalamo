package org.kalamo.backend.exception;

public class DatosObligatoriosIncompletosException extends RuntimeException {
    public DatosObligatoriosIncompletosException(String detalle) {
        super("Faltan datos obligatorios: " + detalle);
    }
}