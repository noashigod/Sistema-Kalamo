package org.kalamo.backend.service;


import org.kalamo.backend.entity.Editorial;
import org.kalamo.backend.exception.EditorialNotFoundException;
import org.kalamo.backend.repository.EditorialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class EditorialServiceImpl implements EditorialService {

    @Autowired
    EditorialRepository editorialRepository;


    @Override
    public List<Editorial> findAllEditorials() {
        return editorialRepository.findAll();
    }

    @Override
    public Editorial saveEditorial(Editorial editorial) {
        return editorialRepository.save(editorial);
    }

    @Override
    public Editorial updateEditorial(Long id, Editorial editorial) {
        Editorial editorialDb = editorialRepository.findById(id).get();

        if(Objects.nonNull(editorial.getName()) && !"".equalsIgnoreCase(editorial.getName())) {
            editorialDb.setName(editorial.getName());
        }

        if(Objects.nonNull(editorial.getCountry()) && !"".equalsIgnoreCase(editorial.getCountry())) {
            editorialDb.setCountry(editorial.getCountry());
        }

        return editorialRepository.save(editorialDb);
    }

    @Override
    public void deleteEditorial(Long id) {
        editorialRepository.deleteById(id);
    }

    @Override
    public Optional<Editorial> findByName(String name) {
        return editorialRepository.findByName(name);
    }

    @Override
    public List<Editorial> findByCountry(String country) {
        return editorialRepository.findByCountry(country);
    }

    @Override
    public Editorial findEditorialById(Long id) throws EditorialNotFoundException {
        Optional<Editorial> editorial = editorialRepository.findById(id);
        if(!editorial.isPresent()) {
            throw new EditorialNotFoundException("Local is not on the database");
        }
        return editorial.get();
    }
}
