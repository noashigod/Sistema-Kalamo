package org.kalamo.backend.repository;

import org.kalamo.backend.entity.Editorial;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface EditorialRepository extends JpaRepository<Editorial, Long> {

    // Las CRUD se definen en el servicio de una porque estan por defecto ya

    // Consulta con inversion de control (Spring Data)
    Optional<Editorial> findByName(String name);

    List<Editorial> findByCountry(String country);
}
