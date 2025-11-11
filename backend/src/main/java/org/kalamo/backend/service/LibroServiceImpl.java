package org.kalamo.backend.service;

import org.kalamo.backend.entity.Autor;
import org.kalamo.backend.entity.Editorial;
import org.kalamo.backend.entity.Libro;
import org.kalamo.backend.exception.AutorNotFoundException;
import org.kalamo.backend.exception.EditorialNotFoundException;
import org.kalamo.backend.exception.LibroAlreadyExistsException;
import org.kalamo.backend.exception.LibroNotFoundException;
import org.kalamo.backend.repository.AutorRepository;
import org.kalamo.backend.repository.EditorialRepository;
import org.kalamo.backend.repository.LibroRepository;
import org.springframework.beans.factory.annotation.Autowired;
// Deprecated service implementation: removed @Service to avoid duplicate bean with modular implementation.

import java.util.List;
import java.util.Objects;
import java.util.Optional;

public class LibroServiceImpl implements LibroService {

    @Autowired
    private LibroRepository libroRepository;

    @Autowired
    private AutorRepository autorRepository;

    @Autowired
    private EditorialRepository editorialRepository;

    @Override
    public List<Libro> findAllLibros() {
        return libroRepository.findAll();
    }

    @Override
    public Libro saveLibro(Libro libro) throws LibroAlreadyExistsException, AutorNotFoundException, EditorialNotFoundException {
        // Validar autor
        Autor autorEncontrado = null;
        if (libro.getAutor() == null) {
            throw new AutorNotFoundException("Autor no proporcionado");
        }
        if (libro.getAutor().getId() != null) {
            Optional<Autor> a = autorRepository.findById(libro.getAutor().getId());
            if (!a.isPresent()) {
                throw new AutorNotFoundException("Autor no encontrado con id: " + libro.getAutor().getId());
            }
            autorEncontrado = a.get();
        } else if (libro.getAutor().getNombre() != null) {
            Optional<Autor> a = autorRepository.findByNombre(libro.getAutor().getNombre());
            if (!a.isPresent()) {
                throw new AutorNotFoundException("Autor no encontrado con nombre: " + libro.getAutor().getNombre());
            }
            autorEncontrado = a.get();
        } else {
            throw new AutorNotFoundException("Autor inválido");
        }

        // Validar editorial
        Editorial editorialEncontrada = null;
        if (libro.getEditorial() == null) {
            throw new EditorialNotFoundException("Editorial no proporcionada");
        }
        if (libro.getEditorial().getId() != 0L) {
            Optional<Editorial> e = editorialRepository.findById(libro.getEditorial().getId());
            if (!e.isPresent()) {
                throw new EditorialNotFoundException("Editorial no encontrada con id: " + libro.getEditorial().getId());
            }
            editorialEncontrada = e.get();
        } else if (libro.getEditorial().getName() != null) {
            Optional<Editorial> e = editorialRepository.findByName(libro.getEditorial().getName());
            if (!e.isPresent()) {
                throw new EditorialNotFoundException("Editorial no encontrada con nombre: " + libro.getEditorial().getName());
            }
            editorialEncontrada = e.get();
        } else {
            throw new EditorialNotFoundException("Editorial inválida");
        }

        // Verificar si ya existe libro con mismo título y autor
        Optional<Libro> existe = libroRepository.findByTituloAndAutor(libro.getTitulo(), autorEncontrado);
        if (existe.isPresent()) {
            throw new LibroAlreadyExistsException("El libro ya existe para ese autor");
        }

        libro.setAutor(autorEncontrado);
        libro.setEditorial(editorialEncontrada);
        return libroRepository.save(libro);
    }

    @Override
    public Libro updateLibro(Long id, Libro libro) throws AutorNotFoundException, EditorialNotFoundException, LibroNotFoundException {
        Optional<Libro> opt = libroRepository.findById(id);
        if (!opt.isPresent()) {
            throw new LibroNotFoundException("Libro no encontrado con id: " + id);
        }
        Libro libroDb = opt.get();

        if (Objects.nonNull(libro.getTitulo()) && !"".equalsIgnoreCase(libro.getTitulo())) {
            libroDb.setTitulo(libro.getTitulo());
        }

        if (Objects.nonNull(libro.getAutor())) {
            Autor autorEncontrado;
            if (libro.getAutor().getId() != null) {
                Optional<Autor> a = autorRepository.findById(libro.getAutor().getId());
                if (!a.isPresent()) {
                    throw new AutorNotFoundException("Autor no encontrado con id: " + libro.getAutor().getId());
                }
                autorEncontrado = a.get();
            } else if (libro.getAutor().getNombre() != null) {
                Optional<Autor> a = autorRepository.findByNombre(libro.getAutor().getNombre());
                if (!a.isPresent()) {
                    throw new AutorNotFoundException("Autor no encontrado con nombre: " + libro.getAutor().getNombre());
                }
                autorEncontrado = a.get();
            } else {
                throw new AutorNotFoundException("Autor inválido");
            }
            libroDb.setAutor(autorEncontrado);
        }

        if (Objects.nonNull(libro.getAnioPublicacion())) {
            libroDb.setAnioPublicacion(libro.getAnioPublicacion());
        }

        if (Objects.nonNull(libro.getEditorial())) {
            Editorial editorialEncontrada;
            if (libro.getEditorial().getId() != 0L) {
                Optional<Editorial> e = editorialRepository.findById(libro.getEditorial().getId());
                if (!e.isPresent()) {
                    throw new EditorialNotFoundException("Editorial no encontrada con id: " + libro.getEditorial().getId());
                }
                editorialEncontrada = e.get();
            } else if (libro.getEditorial().getName() != null) {
                Optional<Editorial> e = editorialRepository.findByName(libro.getEditorial().getName());
                if (!e.isPresent()) {
                    throw new EditorialNotFoundException("Editorial no encontrada con nombre: " + libro.getEditorial().getName());
                }
                editorialEncontrada = e.get();
            } else {
                throw new EditorialNotFoundException("Editorial inválida");
            }
            libroDb.setEditorial(editorialEncontrada);
        }

        return libroRepository.save(libroDb);
    }

    @Override
    public void deleteLibro(Long id) {
        libroRepository.deleteById(id);
    }

    @Override
    public Optional<Libro> findByIsbn(String isbn) {
        // Ya no hay ISBN en la entidad; devolver Optional.empty()
        return Optional.empty();
    }

    @Override
    public List<Libro> findByTitulo(String titulo) {
        return libroRepository.findByTitulo(titulo);
    }

    @Override
    public List<Libro> findByAutor(String autor) {
        Optional<Autor> a = autorRepository.findByNombre(autor);
        if (!a.isPresent()) {
            return List.of();
        }
        return libroRepository.findByAutor(a.get());
    }

    @Override
    public Libro findLibroById(Long id) throws LibroNotFoundException {
        Optional<Libro> libro = libroRepository.findById(id);
        if (!libro.isPresent()) {
            throw new LibroNotFoundException("Libro no encontrado en la base de datos");
        }
        return libro.get();
    }
}
