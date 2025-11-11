package org.kalamo.backend.service;

import org.kalamo.backend.entity.Libro;
import org.kalamo.backend.exception.LibroNotFoundException;

import java.util.List;
import java.util.Optional;

public interface LibroService {
    List<Libro> findAllLibros();
    Libro saveLibro(Libro libro);
    Libro updateLibro(Long id, Libro libro);
    void deleteLibro(Long id);
    Optional<Libro> findByIsbn(String isbn);
    List<Libro> findByTitulo(String titulo);
    List<Libro> findByAutor(String autor);
    Libro findLibroById(Long id) throws LibroNotFoundException;
}
