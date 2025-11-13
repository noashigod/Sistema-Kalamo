package org.kalamo.backend.service;

import org.kalamo.backend.entity.Libro;
import org.kalamo.backend.entity.Prestamo;
import org.kalamo.backend.exception.dto.CrearPrestamoRequest;
import org.kalamo.backend.exception.FechaInvalidaException;
import org.kalamo.backend.exception.PrestamoDevueltoException;
import org.kalamo.backend.entity.Usuario;
import org.kalamo.backend.exception.LibroNotFoundException;
import org.kalamo.backend.exception.UsuarioNotFoundException;
import org.kalamo.backend.repository.LibroRepository;
import org.kalamo.backend.repository.PrestamoRepository;
import org.kalamo.backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PrestamoServiceImpl implements PrestamoService {

    private final PrestamoRepository prestamoRepository;
    private final UsuarioRepository usuarioRepository;
    private final LibroRepository libroRepository;

    public PrestamoServiceImpl(PrestamoRepository prestamoRepository, UsuarioRepository usuarioRepository, LibroRepository libroRepository) {
        this.prestamoRepository = prestamoRepository;
        this.usuarioRepository = usuarioRepository;
        this.libroRepository = libroRepository;
    }

    @Override
    public Prestamo crearPrestamo(CrearPrestamoRequest request) {
        Usuario usuario = usuarioRepository.findById(request.getUsuarioId())
                .orElseThrow(() -> new UsuarioNotFoundException("Usuario no encontrado con id: " + request.getUsuarioId()));

        Libro libro = libroRepository.findById(request.getLibroId())
                .orElseThrow(() -> new LibroNotFoundException("Libro no encontrado con id: " + request.getLibroId()));

        //Implementar la logica de negocio

        Prestamo prestamo = new Prestamo();
        prestamo.setUsuario(usuario);
        prestamo.setLibro(libro);
        prestamo.setFechaInicio(request.getFechaInicio());
        prestamo.setFechaFinEsperada(request.getFechaFinEsperada());
        // Asignamos también a la otra columna de fecha para cumplir con la restricción de la BD
        prestamo.setFechaDevolucionEsperada(request.getFechaFinEsperada());
        prestamo.setDevuelto(false); // Por defecto, un nuevo préstamo no está devuelto.
        return prestamoRepository.save(prestamo);
    }

    @Override
    public Prestamo actualizarPrestamo(Long id, Prestamo prestamo) {
        Prestamo prestamoExistente = prestamoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prestamo no encontrado con id: " + id));

        Usuario usuario = usuarioRepository.findById(prestamo.getUsuario().getId())
                .orElseThrow(() -> new UsuarioNotFoundException("Usuario no encontrado con id: " + prestamo.getUsuario().getId()));

        Libro libro = libroRepository.findById(prestamo.getLibro().getId())
                .orElseThrow(() -> new LibroNotFoundException("Libro no encontrado con id: " + prestamo.getLibro().getId()));

        prestamoExistente.setUsuario(usuario);
        prestamoExistente.setLibro(libro);
        // Si se actualiza una fecha, actualizamos ambas para mantener consistencia
        prestamoExistente.setFechaFinEsperada(prestamo.getFechaFinEsperada());
        prestamoExistente.setFechaDevolucionEsperada(prestamo.getFechaFinEsperada());


        return prestamoRepository.save(prestamoExistente);
    }

    @Override
    public Prestamo actualizarFechaDevolucion(Long prestamoId, LocalDate nuevaFecha) {
        // 1. Buscar el préstamo
        Prestamo prestamoExistente = prestamoRepository.findById(prestamoId)
                .orElseThrow(() -> new RuntimeException("Prestamo no encontrado con id: " + prestamoId));

        // 2. Regla de negocio: No se puede editar un préstamo ya devuelto.
        if (prestamoExistente.isDevuelto()) {
            throw new PrestamoDevueltoException("No se puede editar un préstamo que ya ha sido devuelto.");
        }

        // 3. Regla de negocio: La nueva fecha debe ser posterior a la fecha de inicio.
        if (!nuevaFecha.isAfter(prestamoExistente.getFechaInicio())) {
            throw new FechaInvalidaException("La nueva fecha de devolución debe ser posterior a la fecha de inicio del préstamo.");
        }

        // 4. Actualizar las fechas y guardar
        prestamoExistente.setFechaFinEsperada(nuevaFecha);
        prestamoExistente.setFechaDevolucionEsperada(nuevaFecha); // Mantenemos consistencia
        return prestamoRepository.save(prestamoExistente);
    }

    @Override
    public void eliminarPrestamo(Long id) {
        if (!prestamoRepository.existsById(id)) {
            throw new RuntimeException("Prestamo no encontrado con id: " + id);
        }
        prestamoRepository.deleteById(id);
    }

    @Override
    public List<Prestamo> obtenerTodos() {
        return prestamoRepository.findAll();
    }
}