package org.kalamo.backend.service;

import org.kalamo.backend.entity.Autor;
import org.kalamo.backend.entity.Editorial;
import org.kalamo.backend.entity.Libro;
import org.kalamo.backend.exception.dto.ActualizarLibroRequest;
import org.kalamo.backend.exception.dto.CrearLibroRequest;
import org.kalamo.backend.exception.dto.LibroResponse;

import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class LibroMapper {

    public LibroResponse toResponse(Libro libro) {
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

    public Libro fromCrearRequest(CrearLibroRequest req) {
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

    public Libro fromActualizarRequest(ActualizarLibroRequest req) {
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
