package org.kalamo.backend.libro.service;

import org.kalamo.backend.entity.Libro;
import org.kalamo.backend.exception.AutorNotFoundException;
import org.kalamo.backend.exception.EditorialNotFoundException;
import org.kalamo.backend.exception.LibroAlreadyExistsException;
import org.kalamo.backend.exception.LibroNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

/**
 * Deprecated shim: kept temporarily for compatibility. Delegates to the canonical
 * implementation in `org.kalamo.backend.service.LibroServiceImpl` but is NOT a Spring bean.
 *
 * Goal: allow safe removal of the `libro` package later. Prefer using
 * `org.kalamo.backend.service.LibroService` and the implementation in `service`.
 */
@Deprecated
public class LibroServiceImpl implements org.kalamo.backend.libro.service.LibroService, org.kalamo.backend.service.LibroService {

    private final org.kalamo.backend.service.LibroServiceImpl delegate;

    @Autowired
    public LibroServiceImpl(org.kalamo.backend.service.LibroServiceImpl delegate) {
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
