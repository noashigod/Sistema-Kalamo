package org.kalamo.backend.exception;

import org.kalamo.backend.exception.dto.ErrorMessage;
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

    @ExceptionHandler(LibroNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleLibroNoEncontrado(LibroNotFoundException ex) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(Map.of("mensaje", ex.getMessage()));
    }
    @ExceptionHandler(UsuarioNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleUsuarioNoEncontrado(UsuarioNotFoundException ex) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(Map.of("mensaje", ex.getMessage()));
    }

    @ExceptionHandler(PrestamoDevueltoException.class)
    public ResponseEntity<Map<String, String>> handlePrestamoDevuelto(PrestamoDevueltoException ex) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT) // 409 Conflict es adecuado aquí
                .body(Map.of("mensaje", ex.getMessage()));
    }

    @ExceptionHandler(FechaInvalidaException.class)
    public ResponseEntity<Map<String, String>> handleFechaInvalida(FechaInvalidaException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of("mensaje", ex.getMessage()));
    }

    @ExceptionHandler(AutorYaExisteException.class)
    public ResponseEntity<Map<String, String>> handleAutorYaExiste(AutorYaExisteException ex) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(Map.of("mensaje", ex.getMessage()));
    }

    /*// ======= ELIMINAR USUARIO =======

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
    }*/

    // ======= CATCH-ALL =======

    public ResponseEntity<ErrorMessage> handleUnexpected(Exception ex) {
        // Puedes hacer log aquí si quieres: ex.printStackTrace();

        ErrorMessage error = new ErrorMessage();   // 👈 sin parámetros
        error.setMessage("Ha ocurrido un error inesperado"); // 👈 usando el setter

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(error);
    }
}
