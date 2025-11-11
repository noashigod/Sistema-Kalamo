package org.kalamo.backend.service;

import org.kalamo.backend.entity.Libro;
import org.kalamo.backend.exception.AutorNotFoundException;
import org.kalamo.backend.exception.EditorialNotFoundException;
import org.kalamo.backend.exception.LibroAlreadyExistsException;
import org.kalamo.backend.exception.LibroNotFoundException;
import org.kalamo.backend.libro.service.LibroServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Adapter: expone la interfaz antigua org.kalamo.backend.service.LibroService
 * y delega a la implementación modular.
 */
@Service
public class LibroServiceAdapter implements LibroService {

    private final LibroServiceImpl delegate;

    @Autowired
    public LibroServiceAdapter(LibroServiceImpl delegate) {
        this.delegate = delegate;
    }

    @Override
    public List<Libro> findAllLibros() {
        return delegate.findAllLibros();
    }

    @Override
    public Libro saveLibro(Libro libro) throws LibroAlreadyExistsException, AutorNotFoundException, EditorialNotFoundException {
        return delegate.saveLibro(libro);
    }

    @Override
    public Libro updateLibro(Long id, Libro libro) throws AutorNotFoundException, EditorialNotFoundException, LibroNotFoundException {
        return delegate.updateLibro(id, libro);
    }

    @Override
    public void deleteLibro(Long id) {
        delegate.deleteLibro(id);
    }

    @Override
    public Optional<Libro> findByIsbn(String isbn) {
        return delegate.findByIsbn(isbn);
    }

    @Override
    public List<Libro> findByTitulo(String titulo) {
        return delegate.findByTitulo(titulo);
    }

    @Override
    public List<Libro> findByAutor(String autor) {
        return delegate.findByAutor(autor);
    }

    @Override
    public Libro findLibroById(Long id) throws LibroNotFoundException {
        return delegate.findLibroById(id);
    }
}
