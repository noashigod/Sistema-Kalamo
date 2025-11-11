package org.kalamo.backend.repository;

import org.kalamo.backend.entity.Prestamo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrestamoRepository extends JpaRepository<Prestamo, Long> {
    List<Prestamo> findByUsuarioId(Long usuarioId);
    boolean existsByLibroIdAndDevueltoFalse(Long libroId);
}
