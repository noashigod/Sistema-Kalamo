package org.kalamo.backend.repository;

import org.kalamo.backend.entity.Prestamo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrestamoRepository extends JpaRepository<Prestamo, Long> {

    // Devuelve true si existe al menos un préstamo NO devuelto para ese usuario
    boolean existsByUsuarioIdAndDevueltoFalse(Long usuarioId);
}

