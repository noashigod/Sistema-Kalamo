package org.kalamo.backend.repository;

import org.kalamo.backend.entity.Libro;
import org.kalamo.backend.entity.Autor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LibroRepository extends JpaRepository<Libro, Long> {
    Optional<Libro> findByTituloAndAutor(String titulo, Autor autor);
    List<Libro> findByTitulo(String titulo);
    List<Libro> findByAutor(Autor autor);
}
