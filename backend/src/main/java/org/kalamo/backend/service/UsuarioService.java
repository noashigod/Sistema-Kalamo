package org.kalamo.backend.service;

import org.kalamo.backend.entity.Usuario;
import org.kalamo.backend.exception.dto.ActualizarUsuarioRequest;
import org.kalamo.backend.exception.dto.CrearUsuarioRequest;

public interface UsuarioService {

    Usuario crearUsuario(CrearUsuarioRequest request);
    Usuario actualizarUsuario(Long id, ActualizarUsuarioRequest request);

    /*void eliminarUsuario(Long idUsuario);*/
}
