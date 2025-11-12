package org.kalamo.backend.service;

import java.util.List;

import org.kalamo.backend.entity.RolUsuario;
import org.kalamo.backend.entity.Usuario;
import org.kalamo.backend.repository.UsuarioRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    public CustomUserDetailsService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        // Buscamos por email, que en tu caso será "user" o "admin"
        Usuario usuario = usuarioRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));

        RolUsuario rolBd = usuario.getRol();

        String springRole;
        // Mapear tu enum (USUARIO / BIBLIOTECARIO) a roles de Spring
        switch (rolBd) {
            case BIBLIOTECARIO -> springRole = "ROLE_ADMIN";
            case USUARIO -> springRole = "ROLE_USER";
            default -> springRole = "ROLE_USER";
        }

        List<GrantedAuthority> authorities =
                List.of(new SimpleGrantedAuthority(springRole));

        return new User(
                usuario.getEmail(),      // username
                usuario.getPassword(),   // contraseña (BCrypt)
                usuario.isActivo(),      // enabled
                true,
                true,
                true,
                authorities
        );
    }
}
