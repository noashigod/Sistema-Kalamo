package org.kalamo.backend.controller;

import org.kalamo.backend.entity.Usuario;
import org.kalamo.backend.exception.dto.CrearUsuarioRequest;
import org.kalamo.backend.service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/crear")
    public ResponseEntity<?> crearUsuario(@RequestBody CrearUsuarioRequest request) {

        Usuario creado = usuarioService.crearUsuario(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Usuario creado satisfactoriamente con id " + creado.getId());
    }
}


