package org.kalamo.backend.controller;

import jakarta.validation.Valid;
// entity imports moved to mapper
import org.kalamo.backend.entity.Libro;
import org.kalamo.backend.exception.AutorNotFoundException;
import org.kalamo.backend.exception.EditorialNotFoundException;
import org.kalamo.backend.exception.LibroAlreadyExistsException;
import org.kalamo.backend.exception.LibroNotFoundException;
import org.kalamo.backend.exception.dto.ActualizarLibroRequest;
import org.kalamo.backend.exception.dto.CrearLibroRequest;
import org.kalamo.backend.exception.dto.LibroResponse;
import org.kalamo.backend.service.LibroMapper;
import org.kalamo.backend.service.LibroService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

// Controller deprecated: removed stereotype to avoid bean name conflict with modular controller.
// If you want to restore it, re-add @RestController and @RequestMapping.
public class LibroController {

    private final LibroService libroService;
    private final LibroMapper libroMapper;

    public LibroController(LibroService libroService, LibroMapper libroMapper) {
        this.libroService = libroService;
        this.libroMapper = libroMapper;
    }

    @GetMapping
    public List<LibroResponse> listar() {
        return libroService.findAllLibros().stream().map(libroMapper::toResponse).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LibroResponse> obtener(@PathVariable Long id) throws LibroNotFoundException {
        Libro libro = libroService.findLibroById(id);
        return ResponseEntity.ok(libroMapper.toResponse(libro));
    }

    @PostMapping
    public ResponseEntity<LibroResponse> crear(@Valid @RequestBody CrearLibroRequest request) throws LibroAlreadyExistsException, AutorNotFoundException, EditorialNotFoundException {
        Libro libro = libroMapper.fromCrearRequest(request);
        Libro saved = libroService.saveLibro(libro);
        LibroResponse resp = libroMapper.toResponse(saved);
        return ResponseEntity.created(URI.create("/api/libros/" + resp.getId())).body(resp);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LibroResponse> actualizar(@PathVariable Long id, @RequestBody ActualizarLibroRequest request) throws AutorNotFoundException, EditorialNotFoundException, LibroNotFoundException {
        Libro libro = libroMapper.fromActualizarRequest(request);
        Libro updated = libroService.updateLibro(id, libro);
        return ResponseEntity.ok(libroMapper.toResponse(updated));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id) {
        libroService.deleteLibro(id);
    }
    
    // Note: listing, retrieving and deleting were intentionally removed to keep controller
    // focused on creating and updating books only.

    // mapping delegated to LibroMapper
}
