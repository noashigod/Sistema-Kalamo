package org.kalamo.backend.service;

import org.kalamo.backend.entity.Usuario;
import org.kalamo.backend.exception.dto.ActualizarUsuarioRequest;
import org.kalamo.backend.exception.dto.CrearUsuarioRequest;

import java.util.List;

public interface UsuarioService {

    Usuario crearUsuario(CrearUsuarioRequest request);
    Usuario actualizarUsuario(Long id, ActualizarUsuarioRequest request);

    List<Usuario> getAll();

    Usuario findByEmail(String email);
}
