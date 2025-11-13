package org.kalamo.backend.service;

import org.kalamo.backend.entity.Autor;
import org.kalamo.backend.exception.AutorNotFoundException;
import org.kalamo.backend.exception.AutorYaExisteException;
import org.kalamo.backend.exception.dto.CrearAutorRequest;
import org.kalamo.backend.repository.AutorRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.List;

@Service
public class AutorServiceImpl implements AutorService {

    private final AutorRepository autorRepository;

    public AutorServiceImpl(AutorRepository autorRepository) {
        this.autorRepository = autorRepository;
    }

    @Override
    public Autor crearAutor(CrearAutorRequest request) {
        // Regla de negocio: Verificar unicidad por nombre
        autorRepository.findByNombre(request.getNombre()).ifPresent(autor -> {
            throw new AutorYaExisteException("Ya existe un autor con el nombre: " + request.getNombre());
        });

        Autor nuevoAutor = new Autor();
        nuevoAutor.setNombre(request.getNombre());
        // Asignar el resto de los campos desde el request
        nuevoAutor.setFechaNacimiento(request.getFechaNacimiento());
        nuevoAutor.setFechaFallecimiento(request.getFechaFallecimiento());
        nuevoAutor.setBiografia(request.getBiografia());
        nuevoAutor.setGenerosEscritos(request.getGenerosEscritos());
        return autorRepository.save(nuevoAutor);
    }

    @Override
    public Autor actualizarAutor(Long id, CrearAutorRequest request) {
        Autor autorExistente = autorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Autor no encontrado con id: " + id));

        // Validar que el nuevo nombre no esté ya en uso por OTRO autor
        if (request.getNombre() != null && !request.getNombre().isBlank()) {
            Optional<Autor> autorConEseNombre = autorRepository.findByNombre(request.getNombre());
            if (autorConEseNombre.isPresent() && !autorConEseNombre.get().getId().equals(id)) {
                throw new AutorYaExisteException("Ya existe otro autor con el nombre: " + request.getNombre());
            }
            autorExistente.setNombre(request.getNombre());
        }
        if (request.getFechaNacimiento() != null && !request.getFechaNacimiento().isBlank()) {
            autorExistente.setFechaNacimiento(request.getFechaNacimiento());
        }
        if (request.getFechaFallecimiento() != null) { // Puede ser nulo o vacío si el autor vive
            autorExistente.setFechaFallecimiento(request.getFechaFallecimiento());
        }
        if (request.getBiografia() != null && !request.getBiografia().isBlank()) {
            autorExistente.setBiografia(request.getBiografia());
        }
        if (request.getGenerosEscritos() != null && !request.getGenerosEscritos().isBlank()) {
            autorExistente.setGenerosEscritos(request.getGenerosEscritos());
        }

        return autorRepository.save(autorExistente);
    }

    @Override
    public List<Autor> obtenerTodos() {
        return autorRepository.findAll();
    }
}