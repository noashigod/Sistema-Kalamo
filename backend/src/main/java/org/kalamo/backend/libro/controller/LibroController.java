package org.kalamo.backend.libro.controller;

import jakarta.validation.Valid;
import org.kalamo.backend.entity.Libro;
import org.kalamo.backend.exception.AutorNotFoundException;
import org.kalamo.backend.exception.EditorialNotFoundException;
import org.kalamo.backend.exception.LibroAlreadyExistsException;
import org.kalamo.backend.exception.LibroNotFoundException;
import org.kalamo.backend.libro.dto.ActualizarLibroRequest;
import org.kalamo.backend.libro.dto.CrearLibroRequest;
import org.kalamo.backend.libro.dto.LibroResponse;
import org.kalamo.backend.libro.service.LibroService;
import org.kalamo.backend.libro.mapper.LibroMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/libros")
public class LibroController {

    private final LibroService libroService;
    private final LibroMapper libroMapper;

    public LibroController(LibroService libroService, LibroMapper libroMapper) {
        this.libroService = libroService;
        this.libroMapper = libroMapper;
    }

    // Controller limited to create and update operations only.

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
    
    // Note: list/get/delete intentionally removed to keep controller focused on create/update.
}
