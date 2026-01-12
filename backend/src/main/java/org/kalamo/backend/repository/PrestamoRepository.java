package org.kalamo.backend.repository;

import org.kalamo.backend.entity.Prestamo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrestamoRepository extends JpaRepository<Prestamo, Long> {
    // Additional methods can be defined here, such as finding loans by user or book
    boolean existsByUsuarioIdAndDevueltoFalse(Long usuarioId);
}