package org.kalamo.backend.api;

import org.kalamo.backend.entity.Prestamo;
import org.kalamo.backend.service.PrestamoService;
import org.kalamo.backend.exception.dto.ActualizarFechaPrestamoRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/prestamos")
public class PrestamoController {

    private final PrestamoService prestamoService;

    public PrestamoController(PrestamoService prestamoService) {
        this.prestamoService = prestamoService;
    }

    @PostMapping
    public ResponseEntity<Prestamo> crearPrestamo(@RequestParam Long usuarioId, @RequestParam Long libroId) {
        Prestamo nuevoPrestamo = prestamoService.crearPrestamo(usuarioId, libroId);
        return new ResponseEntity<>(nuevoPrestamo, HttpStatus.CREATED);
    }

    @PutMapping("/{id}/fecha-devolucion")
    public ResponseEntity<Prestamo> actualizarFechaDevolucion(
            @PathVariable Long id,
            @RequestBody ActualizarFechaPrestamoRequest request) {
        Prestamo prestamoActualizado = prestamoService.actualizarFechaDevolucion(id, request.getNuevaFechaDevolucionEsperada());
        return new ResponseEntity<>(prestamoActualizado, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarPrestamo(@PathVariable Long id) {
        prestamoService.eliminarPrestamo(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}