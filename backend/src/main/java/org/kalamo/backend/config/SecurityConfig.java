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
            // La configuración de CORS ahora es global en WebConfig.java
            .authorizeHttpRequests(authz -> authz
                    // --- CAMBIO IMPORTANTE PARA DESARROLLO ---
                    // Permitimos todas las peticiones a la API y al login sin autenticación
                    .requestMatchers("/login", "/api/**").permitAll()
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
}
