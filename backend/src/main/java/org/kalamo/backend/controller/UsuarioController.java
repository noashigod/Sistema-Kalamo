package org.kalamo.backend.controller;
import org.kalamo.backend.entity.Usuario;
import org.kalamo.backend.exception.dto.ActualizarUsuarioRequest;
import org.kalamo.backend.exception.dto.CrearUsuarioRequest;
import org.kalamo.backend.exception.dto.LoginRequest;
import org.kalamo.backend.service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;
    private final PasswordEncoder passwordEncoder;

    public UsuarioController(UsuarioService usuarioService, PasswordEncoder passwordEncoder) {
        this.usuarioService = usuarioService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping
    public ResponseEntity<?> crearUsuario(@RequestBody CrearUsuarioRequest request) {
        Usuario creado = usuarioService.crearUsuario(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Usuario creado satisfactoriamente con id " + creado.getId());
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> obtenerTodos() {
        List<Usuario> usuarios = usuarioService.getAll();
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerPorId(@PathVariable Long id) {
        Usuario u = usuarioService.findById(id);
        if (u == null) {
            return ResponseEntity.notFound().build();
        }
        // No devolver contraseña
        u.setPassword(null);
        return ResponseEntity.ok(u);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(@PathVariable Long id, @RequestBody ActualizarUsuarioRequest request) {
        Usuario actualizado = usuarioService.actualizarUsuario(id, request);
        return ResponseEntity.ok(actualizado);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUsuario(@RequestBody LoginRequest loginRequest) {
        try {
            // Suponiendo que tu servicio tiene un método para buscar por email.
            Usuario usuario = usuarioService.findByEmail(loginRequest.getEmail());

            // Usamos PasswordEncoder para comparar la contraseña del request con la cifrada en la BD
            if (usuario != null && passwordEncoder.matches(loginRequest.getPassword(), usuario.getPassword())) {

                // Por seguridad, nunca devuelvas la contraseña en la respuesta.
                usuario.setPassword(null);

                return ResponseEntity.ok(usuario);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email o contraseña incorrectos.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error en el servidor durante el login.");
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarUsuario(@PathVariable Long id) {
        usuarioService.eliminarUsuario(id);
        return ResponseEntity.noContent().build();
    }
}
