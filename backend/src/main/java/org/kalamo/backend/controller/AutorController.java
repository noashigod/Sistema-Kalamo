package org.kalamo.backend.controller;

import jakarta.validation.Valid;
import org.kalamo.backend.entity.Autor;
import org.kalamo.backend.exception.dto.CrearAutorRequest;
import org.kalamo.backend.service.AutorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/autores")
public class AutorController {

    private final AutorService autorService;

    public AutorController(AutorService autorService) {
        this.autorService = autorService;
    }

    @PostMapping
    public ResponseEntity<Autor> crearAutor(@Valid @RequestBody CrearAutorRequest request) {
        Autor autorCreado = autorService.crearAutor(request);
        return new ResponseEntity<>(autorCreado, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Autor> actualizarAutor(@PathVariable Long id, @Valid @RequestBody CrearAutorRequest request) {
        Autor autorActualizado = autorService.actualizarAutor(id, request);
        return ResponseEntity.ok(autorActualizado);
    }

    @GetMapping
    public ResponseEntity<List<Autor>> obtenerTodos() {
        List<Autor> autores = autorService.obtenerTodos();
        return ResponseEntity.ok(autores);
    }
}