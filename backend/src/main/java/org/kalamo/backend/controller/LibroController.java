package org.kalamo.backend.controller;

import jakarta.validation.Valid;
import org.kalamo.backend.entity.Autor;
import org.kalamo.backend.entity.Editorial;
import org.kalamo.backend.entity.Libro;
import org.kalamo.backend.exception.AutorNotFoundException;
import org.kalamo.backend.exception.EditorialNotFoundException;
import org.kalamo.backend.exception.LibroAlreadyExistsException;
import org.kalamo.backend.exception.LibroNotFoundException;
import org.kalamo.backend.exception.dto.ActualizarLibroRequest;
import org.kalamo.backend.exception.dto.CrearLibroRequest;
import org.kalamo.backend.exception.dto.LibroResponse;
import org.kalamo.backend.service.LibroService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/libros")
public class LibroController {

    private final LibroService libroService;

    public LibroController(LibroService libroService) {
        this.libroService = libroService;
    }

    @GetMapping
    public List<LibroResponse> listar() {
        return libroService.findAllLibros().stream().map(this::toResponse).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LibroResponse> obtener(@PathVariable Long id) throws LibroNotFoundException {
        Libro libro = libroService.findLibroById(id);
        return ResponseEntity.ok(toResponse(libro));
    }

    @PostMapping
    public ResponseEntity<LibroResponse> crear(@Valid @RequestBody CrearLibroRequest request) throws LibroAlreadyExistsException, AutorNotFoundException, EditorialNotFoundException {
        Libro libro = fromCrearRequest(request);
        Libro saved = libroService.saveLibro(libro);
        LibroResponse resp = toResponse(saved);
        return ResponseEntity.created(URI.create("/api/libros/" + resp.getId())).body(resp);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LibroResponse> actualizar(@PathVariable Long id, @RequestBody ActualizarLibroRequest request) throws AutorNotFoundException, EditorialNotFoundException, LibroNotFoundException {
        Libro libro = fromActualizarRequest(request);
        Libro updated = libroService.updateLibro(id, libro);
        return ResponseEntity.ok(toResponse(updated));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id) {
        libroService.deleteLibro(id);
    }

    // --- mappers ---
    private LibroResponse toResponse(Libro libro) {
        LibroResponse r = new LibroResponse();
        r.setId(libro.getId());
        r.setTitulo(libro.getTitulo());
        if (libro.getAutor() != null) {
            r.setAutorId(libro.getAutor().getId());
            r.setAutorNombre(libro.getAutor().getNombre());
        }
        r.setAnioPublicacion(libro.getAnioPublicacion());
        if (libro.getEditorial() != null) {
            r.setEditorialId(libro.getEditorial().getId());
            r.setEditorialNombre(libro.getEditorial().getName());
        }
        return r;
    }

    private Libro fromCrearRequest(CrearLibroRequest req) {
        Libro l = new Libro();
        l.setTitulo(req.getTitulo());
        l.setAnioPublicacion(req.getAnioPublicacion());

        Autor a = new Autor();
        if (req.getAutorId() != null) {
            a.setId(req.getAutorId());
        } else if (req.getAutorNombre() != null) {
            a.setNombre(req.getAutorNombre());
        }
        l.setAutor(a);

        Editorial e = new Editorial();
        if (req.getEditorialId() != null) {
            e.setId(req.getEditorialId());
        } else if (req.getEditorialNombre() != null) {
            e.setName(req.getEditorialNombre());
        }
        l.setEditorial(e);

        return l;
    }

    private Libro fromActualizarRequest(ActualizarLibroRequest req) {
        Libro l = new Libro();
        if (req.getTitulo() != null) l.setTitulo(req.getTitulo());
        if (req.getAnioPublicacion() != null) l.setAnioPublicacion(req.getAnioPublicacion());

        if (req.getAutorId() != null || req.getAutorNombre() != null) {
            Autor a = new Autor();
            if (req.getAutorId() != null) a.setId(req.getAutorId());
            if (req.getAutorNombre() != null) a.setNombre(req.getAutorNombre());
            l.setAutor(a);
        }

        if (req.getEditorialId() != null || req.getEditorialNombre() != null) {
            Editorial e = new Editorial();
            if (req.getEditorialId() != null) e.setId(req.getEditorialId());
            if (req.getEditorialNombre() != null) e.setName(req.getEditorialNombre());
            l.setEditorial(e);
        }

        return l;
    }
}
