package org.kalamo.backend.service;

import org.kalamo.backend.entity.Usuario;
import org.kalamo.backend.exception.dto.CrearUsuarioRequest;

public interface UsuarioService {

    Usuario crearUsuario(CrearUsuarioRequest request);

    void eliminarUsuario(Long idUsuario);
}

