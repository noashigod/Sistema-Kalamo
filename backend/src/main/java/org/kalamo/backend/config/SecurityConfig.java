package org.kalamo.backend.config;

import java.util.List;

import jakarta.servlet.http.HttpServletResponse;
import org.kalamo.backend.service.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final CustomUserDetailsService customUserDetailsService;

    public SecurityConfig(CustomUserDetailsService customUserDetailsService) {
        this.customUserDetailsService = customUserDetailsService;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(customUserDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.authenticationProvider(authenticationProvider());

        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(authz -> authz
                    // Rutas públicas: login y creación de usuarios
                    .requestMatchers("/login", "/api/usuarios").permitAll()
                    // Rutas de administrador
                    .requestMatchers("/api/autores/**").hasRole("ADMIN")
                    .requestMatchers("/api/editoriales/**").hasRole("ADMIN")
                    .requestMatchers("/api/libros/**").hasRole("ADMIN")
                    .requestMatchers("/api/prestamos/**").hasRole("ADMIN")
                    // El resto de las rutas requieren autenticación
                    .anyRequest().authenticated()
            )
            .formLogin(form -> form
                    .loginProcessingUrl("/login")   // aquí recibe el POST del front
                    .successHandler((request, response, authentication) -> {
                        // no redirigimos, solo 200 OK
                        response.setStatus(HttpServletResponse.SC_OK);
                    })
                    .failureHandler((request, response, ex) -> {
                        // credenciales inválidas -> 401
                        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    })
                    .permitAll()
            )
            .logout(logout -> logout
                    .logoutUrl("/logout")
                    .logoutSuccessHandler((request, response, auth) -> {
                        response.setStatus(HttpServletResponse.SC_OK);
                    })
            );

        return http.build();
    }

    // CORS para permitir peticiones desde React
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        // Cambia el puerto si tu React corre en otro (5173, etc.)
        config.setAllowedOrigins(List.of("http://localhost:3000"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true); // importante para cookies de sesión

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
