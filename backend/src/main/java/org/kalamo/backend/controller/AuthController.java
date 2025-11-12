package org.kalamo.backend.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @GetMapping("/api/user/role")
    public String getUserRole(Authentication auth) {
        return auth.getAuthorities().stream()
                .findFirst()
                .map(authe -> authe.getAuthority().replace("ROLE_", ""))
                .orElse("UNKNOWN");
    }
}
