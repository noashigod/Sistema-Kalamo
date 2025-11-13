package org.kalamo.backend.controller;

import org.kalamo.backend.entity.Prestamo;
import org.kalamo.backend.exception.dto.CrearPrestamoRequest;
import org.kalamo.backend.service.PrestamoService;
import org.kalamo.backend.exception.dto.ActualizarFechaPrestamoRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/prestamos")
public class PrestamoController {

    private final PrestamoService prestamoService;

    public PrestamoController(PrestamoService prestamoService) {
        this.prestamoService = prestamoService;
    }

    @GetMapping
    public ResponseEntity<List<Prestamo>> obtenerTodos() {
        List<Prestamo> prestamos = prestamoService.obtenerTodos();
        return ResponseEntity.ok(prestamos);
    }

    @PostMapping
    public ResponseEntity<Prestamo> crearPrestamo(@RequestBody CrearPrestamoRequest request) {
        Prestamo nuevoPrestamo = prestamoService.crearPrestamo(request);
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