package org.kalamo.backend.controller;


import jakarta.validation.Valid;
import org.kalamo.backend.entity.Editorial;
import org.kalamo.backend.exception.EditorialNotFoundException;
import org.kalamo.backend.service.EditorialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/editoriales")
@CrossOrigin
public class EditorialController {

    @Autowired
    EditorialService editorialService;

    @GetMapping
    public List<Editorial> findAllEditorials(){
        return editorialService.findAllEditorials();
    }

    @PostMapping
    public Editorial saveEditorial(@Valid @RequestBody Editorial editorial){
        return editorialService.saveEditorial(editorial);
    }

    @PutMapping("/{id}")
    public Editorial updateEditorial(@PathVariable Long id, @RequestBody Editorial editorial){
        return editorialService.updateEditorial(id, editorial);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEditorial(@PathVariable Long id){
        try {
            editorialService.deleteEditorial(id);
            return ResponseEntity.noContent().build();
        } catch (EmptyResultDataAccessException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("mensaje", "Editorial no encontrada"));
        } catch (DataIntegrityViolationException ex) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("mensaje", "No se puede eliminar la editorial porque tiene libros asociados"));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("mensaje", "Error al eliminar la editorial"));
        }
    }

    @GetMapping("/name/{name}")
    Optional<Editorial> findEditorialByName(@PathVariable String name){
        return editorialService.findByName(name);
    }

    @GetMapping("/country/{country}")
    List<Editorial> findEditorialsByCountry(@PathVariable String country){
        return editorialService.findByCountry(country);
    }

    @GetMapping("/{id}")
    Editorial findEditorialById(@PathVariable Long id) throws EditorialNotFoundException {
        return editorialService.findEditorialById(id);
    }

}
