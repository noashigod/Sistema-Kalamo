package org.kalamo.backend.controller;

import org.kalamo.backend.entity.Prestamo;
import org.kalamo.backend.service.PrestamoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Map;

@RestController
@RequestMapping("/api/prestamos")
public class PrestamoController {

    private final PrestamoService prestamoService;

    public PrestamoController(PrestamoService prestamoService) {
        this.prestamoService = prestamoService;
    }

    @PostMapping("/crear")
    public ResponseEntity<?> crearPrestamo(@RequestBody Map<String, Long> body) {
        Long libroId = body.get("libroId");
        Long usuarioId = body.get("usuarioId");

        if (libroId == null || usuarioId == null) {
            return ResponseEntity.badRequest().body("Datos ingresados no válidos");
        }

    Prestamo creado = prestamoService.crearPrestamo(libroId, usuarioId);
    java.util.Map<String, Object> resp = new java.util.HashMap<>();
    resp.put("message", "Préstamo registrado exitosamente");
    resp.put("id", creado.getId());
    return ResponseEntity.status(HttpStatus.CREATED).body(resp);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editarPrestamo(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        // body puede contener: devuelto (boolean), fechaDevolucionEsperada (ISO date string)
        Boolean devuelto = null;
        java.time.LocalDate fechaDevolucionEsperada = null;

        if (body.containsKey("devuelto")) {
            Object v = body.get("devuelto");
            if (v instanceof Boolean) devuelto = (Boolean) v;
            else if (v instanceof String) devuelto = Boolean.parseBoolean((String) v);
        }

        if (body.containsKey("fechaDevolucionEsperada")) {
            Object f = body.get("fechaDevolucionEsperada");
            if (f instanceof String) {
                fechaDevolucionEsperada = java.time.LocalDate.parse((String) f);
            }
        }

        try {
        Prestamo updated = prestamoService.editarPrestamo(id, devuelto, fechaDevolucionEsperada);
        java.util.Map<String, Object> resp = new java.util.HashMap<>();
        resp.put("message", "Préstamo actualizado");
        resp.put("id", updated.getId());
        return ResponseEntity.ok(resp);
        } catch (org.kalamo.backend.exception.PrestamoNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}
