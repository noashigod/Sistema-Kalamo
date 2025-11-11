package org.kalamo.login.config;



import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.kalamo.backend.repository.UsuarioRepository;
import org.kalamo.backend.entity.Usuario;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/login").permitAll()  // Permitir acceso al login
                        .requestMatchers("/admin/**").hasRole("ADMIN")  // Solo admins
                        .requestMatchers("/user/**").hasRole("USER")    // Solo users
                        .requestMatchers("/api/prestamos/**").hasRole("BIBLIOTECARIO") // Solo bibliotecarios pueden gestionar préstamos
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        .loginPage("/login")  // Página de login personalizada (opcional)
                        .defaultSuccessUrl("/dashboard", true)  // Redirigir después del login
                        .permitAll()
                )
                .logout(logout -> logout.permitAll());

        return http.build();
    }

    @Bean
        public UserDetailsService userDetailsService(UsuarioRepository usuarioRepository) {
                // keep an in-memory manager as a fallback for local testing
                InMemoryUserDetailsManager inMemory = new InMemoryUserDetailsManager();
                inMemory.createUser(User.withUsername("user").password(passwordEncoder().encode("password")).roles("USER").build());
                inMemory.createUser(User.withUsername("admin").password(passwordEncoder().encode("password")).roles("ADMIN").build());
                inMemory.createUser(User.withUsername("bibliotecario").password(passwordEncoder().encode("password")).roles("BIBLIOTECARIO").build());

                return username -> {
                        // try cargar desde la base de datos por email (username)
                        java.util.Optional<Usuario> opt = usuarioRepository.findByEmail(username);
                        if (opt.isPresent()) {
                                Usuario u = opt.get();
                                return User.withUsername(u.getEmail())
                                                .password(u.getPassword())
                                                .roles(u.getRol().name())
                                                .build();
                        }
                        // fallback in-memory
                        return inMemory.loadUserByUsername(username);
                };
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }
}
