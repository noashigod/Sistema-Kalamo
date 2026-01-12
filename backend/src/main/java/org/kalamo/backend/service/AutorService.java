package org.kalamo.backend.service;

import org.kalamo.backend.entity.Autor;
import org.kalamo.backend.exception.dto.CrearAutorRequest;

import java.util.List;

public interface AutorService {
    Autor crearAutor(CrearAutorRequest request);
    Autor actualizarAutor(Long id, CrearAutorRequest request);
    List<Autor> obtenerTodos();

    void deleteAutor(Long id);

    Autor findById(Long id);
}