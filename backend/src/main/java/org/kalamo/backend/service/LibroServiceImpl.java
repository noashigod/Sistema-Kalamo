package org.kalamo.backend.service;

import org.kalamo.backend.entity.Libro;
import org.kalamo.backend.exception.LibroNotFoundException;
import org.kalamo.backend.repository.LibroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class LibroServiceImpl implements LibroService {

    @Autowired
    private LibroRepository libroRepository;

    @Override
    public List<Libro> findAllLibros() {
        return libroRepository.findAll();
    }

    @Override
    public Libro saveLibro(Libro libro) {
        return libroRepository.save(libro);
    }

    @Override
    public Libro updateLibro(Long id, Libro libro) {
        Libro libroDb = libroRepository.findById(id).get();

        if (Objects.nonNull(libro.getTitulo()) && !"".equalsIgnoreCase(libro.getTitulo())) {
            libroDb.setTitulo(libro.getTitulo());
        }

        if (Objects.nonNull(libro.getAutor()) && !"".equalsIgnoreCase(libro.getAutor())) {
            libroDb.setAutor(libro.getAutor());
        }

        if (Objects.nonNull(libro.getIsbn()) && !"".equalsIgnoreCase(libro.getIsbn())) {
            libroDb.setIsbn(libro.getIsbn());
        }

        if (Objects.nonNull(libro.getEditorial())) {
            libroDb.setEditorial(libro.getEditorial());
        }

        if (Objects.nonNull(libro.getDisponible())) {
            libroDb.setDisponible(libro.getDisponible());
        }

        if (Objects.nonNull(libro.getFechaPublicacion())) {
            libroDb.setFechaPublicacion(libro.getFechaPublicacion());
        }

        return libroRepository.save(libroDb);
    }

    @Override
    public void deleteLibro(Long id) {
        libroRepository.deleteById(id);
    }

    @Override
    public Optional<Libro> findByIsbn(String isbn) {
        return libroRepository.findByIsbn(isbn);
    }

    @Override
    public List<Libro> findByTitulo(String titulo) {
        return libroRepository.findByTitulo(titulo);
    }

    @Override
    public List<Libro> findByAutor(String autor) {
        return libroRepository.findByAutor(autor);
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
