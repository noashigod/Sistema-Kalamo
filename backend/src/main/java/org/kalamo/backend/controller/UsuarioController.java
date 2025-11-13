package org.kalamo.backend.controller;

import org.kalamo.backend.entity.Usuario;
import org.kalamo.backend.exception.dto.ActualizarLibroRequest;
import org.kalamo.backend.exception.dto.ActualizarUsuarioRequest;
import org.kalamo.backend.exception.dto.CrearUsuarioRequest;
import org.kalamo.backend.service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
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

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(@PathVariable Long id, @RequestBody ActualizarUsuarioRequest request) {
        Usuario actualizado = usuarioService.actualizarUsuario(id, request);
        return ResponseEntity.ok(actualizado);
    }

    /*@DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarUsuario(@PathVariable Long id) {
        usuarioService.eliminarUsuario(id);
        return ResponseEntity.ok("Usuario eliminado correctamente");
    }*/
}
