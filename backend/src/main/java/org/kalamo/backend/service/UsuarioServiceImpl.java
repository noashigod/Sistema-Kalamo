package org.kalamo.backend.service;

import org.kalamo.backend.entity.RolUsuario;
import org.kalamo.backend.entity.Usuario;
import org.kalamo.backend.exception.dto.*;
import org.kalamo.backend.exception.*;
import org.kalamo.backend.exception.dto.CrearUsuarioRequest;
import org.kalamo.backend.repository.UsuarioRepository;
import org.kalamo.backend.repository.PrestamoRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.time.Period;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final PrestamoRepository prestamoRepository;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, PrestamoRepository prestamoRepository) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.prestamoRepository = prestamoRepository;
    }

    // ===================== CREAR =====================
    @Override
    public Usuario crearUsuario(CrearUsuarioRequest request) {
        validarDatosObligatorios(request);

        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new CorreoYaRegistradoException(request.getEmail());
        }

        RolUsuario rol = parsearRol(request.getRol());

        if (!cumplePoliticaPassword(request.getPassword())) {
            throw new PasswordInseguraException();
        }

        if (!esMayorDeEdad(request.getFechaNacimiento())) {
            throw new UsuarioMenorDeEdadException();
        }

        Usuario nuevo = new Usuario(
                request.getNombreCompleto(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()), // ¡Contraseña cifrada!
                rol,
                request.getFechaNacimiento()
        );

        return usuarioRepository.save(nuevo);
    }

    
    @Override
    public Usuario actualizarUsuario(Long id, ActualizarUsuarioRequest request) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new UsuarioNotFoundException("Usuario no encontrado con id: " + id));

        if (request.getNombreCompleto() != null && !request.getNombreCompleto().isBlank()) {
            usuario.setNombreCompleto(request.getNombreCompleto());
        }

        if (request.getEmail() != null && !request.getEmail().isBlank() && !request.getEmail().equals(usuario.getEmail())) {
            if (usuarioRepository.existsByEmail(request.getEmail())) {
                throw new CorreoYaRegistradoException(request.getEmail());
            }
            usuario.setEmail(request.getEmail());
        }

        if (request.getFechaNacimiento() != null) {
            if (!esMayorDeEdad(request.getFechaNacimiento())) {
                throw new UsuarioMenorDeEdadException();
            }
            usuario.setFechaNacimiento(request.getFechaNacimiento());
        }

        if (request.getRol() != null && !request.getRol().isBlank()) {
            RolUsuario nuevoRol = parsearRol(request.getRol());
            usuario.setRol(nuevoRol);
        }

        if (request.getActivo() != null) {
            usuario.setActivo(request.getActivo());
        }

        return usuarioRepository.save(usuario);
    }

    @Override
    public List<Usuario> getAll() {
        return usuarioRepository.findAll();
    }

    @Override
    public Usuario findByEmail(String email) {
        // Usamos el método del repositorio y devolvemos el usuario o null.
        return usuarioRepository.findByEmail(email).orElse(null);
    }

    @Override
    public Usuario findById(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }


    // ===================== ELIMINAR =====================
    @Override
    public void eliminarUsuario(Long idUsuario) {
        // 1. Validar que exista
        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new UsuarioNotFoundException("Usuario no encontrado con id: " + idUsuario));

        // 2. Verificar si tiene préstamos pendientes
        boolean tienePrestamosPendientes = prestamoRepository.existsByUsuarioIdAndDevueltoFalse(usuario.getId());

        if (tienePrestamosPendientes) {
            throw new UsuarioConPrestamosPendientesException(usuario.getId());
        }

        // 3. Si todo bien, eliminar (física)
        usuarioRepository.delete(usuario);
    }

    // ===================== MÉTODOS PRIVADOS =====================

    private void validarDatosObligatorios(CrearUsuarioRequest r) {
        StringBuilder faltantes = new StringBuilder();

        if (r.getNombreCompleto() == null || r.getNombreCompleto().isBlank()) {
            faltantes.append("nombre completo, ");
        }
        if (r.getEmail() == null || r.getEmail().isBlank()) {
            faltantes.append("correo electrónico, ");
        }
        if (r.getPassword() == null || r.getPassword().isBlank()) {
            faltantes.append("contraseña, ");
        }
        if (r.getRol() == null || r.getRol().isBlank()) {
            faltantes.append("rol de usuario, ");
        }
        if (r.getFechaNacimiento() == null) {
            faltantes.append("fecha de nacimiento, ");
        }

        if (!faltantes.isEmpty()) {
            String detalle = faltantes.substring(0, faltantes.length() - 2);
            throw new DatosObligatoriosIncompletosException(detalle);
        }
    }

    private RolUsuario parsearRol(String rolTexto) {
        try {
            return RolUsuario.valueOf(rolTexto.toUpperCase());
        } catch (IllegalArgumentException | NullPointerException e) {
            throw new RolInvalidoException(rolTexto);
        }
    }

    private boolean esMayorDeEdad(LocalDate fechaNacimiento) {
        return Period.between(fechaNacimiento, LocalDate.now()).getYears() >= 18;
    }

    private boolean cumplePoliticaPassword(String password) {
        if (password == null || password.length() < 8) return false;

        boolean tieneLetra = false;
        boolean tieneNumero = false;
        for (char c : password.toCharArray()) {
            if (Character.isLetter(c)) tieneLetra = true;
            if (Character.isDigit(c))  tieneNumero = true;
        }
        return tieneLetra && tieneNumero;
    }
}
