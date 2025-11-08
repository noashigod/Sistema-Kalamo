package org.kalamo.backend.service;

import org.kalamo.backend.entity.Editorial;
import org.kalamo.backend.exception.EditorialNotFoundException;

import java.util.List;
import java.util.Optional;

public interface EditorialService {
    List<Editorial> findAllEditorials();
    Editorial saveEditorial(Editorial editorial);
    Editorial updateEditorial(Long id, Editorial editorial);
    void deleteEditorial(Long id);
    Optional<Editorial> findByName(String name);
    List<Editorial> findByCountry(String name);
    Editorial findEditorialById(Long id) throws EditorialNotFoundException;
//            throws LocalNotFoundException;


}
