package org.kalamo.backend.controller;

import jakarta.validation.Valid;
import org.kalamo.backend.entity.Autor;
import org.kalamo.backend.exception.dto.CrearAutorRequest;
import org.kalamo.backend.service.AutorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import java.util.Map;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/autores")
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

    @GetMapping("/{id}")
    public ResponseEntity<Autor> obtenerPorId(@PathVariable Long id) {
        Autor a = autorService.findById(id);
        if (a == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(a);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarAutor(@PathVariable Long id) {
        try {
            autorService.deleteAutor(id);
            return ResponseEntity.noContent().build();
        } catch (EmptyResultDataAccessException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("mensaje", "Autor no encontrado"));
        } catch (DataIntegrityViolationException ex) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("mensaje", "No se puede eliminar el autor porque está referenciado por otros registros"));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("mensaje", "Error al eliminar el autor"));
        }
    }
}