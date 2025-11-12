package org.kalamo.backend.config;

import java.time.LocalDate;

import org.kalamo.backend.entity.RolUsuario;
import org.kalamo.backend.entity.Usuario;
import org.kalamo.backend.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initUsuarios(UsuarioRepository usuarioRepository,
                                          PasswordEncoder passwordEncoder) {
        return args -> {

            // USER - rol USUARIO
            if (usuarioRepository.findByEmail("user").isEmpty()) {
                Usuario user = new Usuario();
                user.setActivo(true);
                user.setEmail("user");  // login: user
                user.setFechaNacimiento(LocalDate.of(2000, 1, 1));
                user.setNombreCompleto("Usuario normal");
                user.setPassword(passwordEncoder.encode("password")); // "password"
                user.setRol(RolUsuario.USUARIO);
                usuarioRepository.save(user);
            }

            // ADMIN - rol BIBLIOTECARIO (lo tratamos como ADMIN)
            if (usuarioRepository.findByEmail("admin").isEmpty()) {
                Usuario admin = new Usuario();
                admin.setActivo(true);
                admin.setEmail("admin"); // login: admin
                admin.setFechaNacimiento(LocalDate.of(1990, 1, 1));
                admin.setNombreCompleto("Administrador del sistema");
                admin.setPassword(passwordEncoder.encode("password")); // "password"
                admin.setRol(RolUsuario.BIBLIOTECARIO);
                usuarioRepository.save(admin);
            }
        };
    }
}
