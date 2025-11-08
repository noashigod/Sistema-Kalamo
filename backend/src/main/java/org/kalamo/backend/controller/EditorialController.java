package org.kalamo.backend.controller;


import jakarta.validation.Valid;
import org.kalamo.backend.entity.Editorial;
import org.kalamo.backend.exception.EditorialNotFoundException;
import org.kalamo.backend.service.EditorialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class EditorialController {

    @Autowired
    EditorialService editorialService;

    @GetMapping("/findAllEditorials")
    public List<Editorial> findAllEditorials(){
        return editorialService.findAllEditorials();
    }

    @PostMapping("/saveEditorial")
    public Editorial saveEditorial(@Valid @RequestBody Editorial editorial){
        return editorialService.saveEditorial(editorial);
    }

    @PutMapping("/updateEditorial/{id}")
    public Editorial updateEditorial(@PathVariable Long id, @RequestBody Editorial editorial){
        return editorialService.updateEditorial(id, editorial);
    }

    @DeleteMapping("/deleteEditorial/{id}")
    public String deleteEditorial(@PathVariable Long id){
        editorialService.deleteEditorial(id);
        return "Successfully deleted";
    }

    @GetMapping("/findEditorialByName/{name}")
    Optional<Editorial> findEditorialByName(@PathVariable String name){
        return editorialService.findByName(name);
    }

    @GetMapping("/findEditorialsByCountry/{country}")
    List<Editorial> findEditorialsByCountry(@PathVariable String country){
        return editorialService.findByCountry(country);
    }

    @GetMapping("/findEditorialByID/{id}")
    Editorial findEditorialById(@PathVariable Long id) throws EditorialNotFoundException {
        return editorialService.findEditorialById(id);
    }

}
