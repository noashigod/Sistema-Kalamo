package org.kalamo.backend.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DashboardController {

    @GetMapping("/dashboard")
    public String dashboard(Authentication auth) {
        if (auth.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))) {
            return "redirect:/admin";  // Redirigir a vista de admin
        } else {
            return "redirect:/user";   // Redirigir a vista de user
        }
    }

    @GetMapping("/admin")
    public String adminPage() {
        return "admin";  // Vista para admin
    }

    @GetMapping("/user")
    public String userPage() {
        return "user";   // Vista para user
    }
}
