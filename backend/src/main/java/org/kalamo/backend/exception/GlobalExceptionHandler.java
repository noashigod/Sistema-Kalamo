package org.kalamo.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // ======= CREACIÓN DE USUARIO =======

    @ExceptionHandler(CorreoYaRegistradoException.class)
    public ResponseEntity<Map<String, String>> handleCorreoYaRegistrado(CorreoYaRegistradoException ex) {
        // criterio de aceptación: "El correo ya está registrado"
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(Map.of("mensaje", "El correo ya está registrado"));
    }

    @ExceptionHandler(DatosObligatoriosIncompletosException.class)
    public ResponseEntity<Map<String, String>> handleDatosIncompletos(DatosObligatoriosIncompletosException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of("mensaje", ex.getMessage()));
    }

    @ExceptionHandler(PasswordInseguraException.class)
    public ResponseEntity<Map<String, String>> handlePasswordInsegura(PasswordInseguraException ex) {
        // criterio de aceptación: "Contraseña insegura"
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of("mensaje", "Contraseña insegura"));
    }

    @ExceptionHandler(UsuarioMenorDeEdadException.class)
    public ResponseEntity<Map<String, String>> handleUsuarioMenorDeEdad(UsuarioMenorDeEdadException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of("mensaje", "El usuario debe tener 18 años o más"));
    }

    @ExceptionHandler(RolInvalidoException.class)
    public ResponseEntity<Map<String, String>> handleRolInvalido(RolInvalidoException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of("mensaje", "El sistema no permite crear un usuario sin un rol válido"));
    }

    // ======= ELIMINAR USUARIO =======

    @ExceptionHandler(UsuarioNoEncontradoException.class)
    public ResponseEntity<Map<String, String>> handleUsuarioNoEncontrado(UsuarioNoEncontradoException ex) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(Map.of("mensaje", "El usuario no existe"));
    }

    @ExceptionHandler(UsuarioConPrestamosPendientesException.class)
    public ResponseEntity<Map<String, String>> handleUsuarioConPrestamosPendientes(
            UsuarioConPrestamosPendientesException ex) {

        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(Map.of("mensaje", "No se puede eliminar el usuario porque tiene préstamos pendientes"));
    }

    // ======= CATCH-ALL (opcional) =======

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGenerico(Exception ex) {
        // Loggear ex en un logger real
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("mensaje", "Ha ocurrido un error inesperado"));
    }
}
