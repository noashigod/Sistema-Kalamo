package org.kalamo.backend.service;

import org.kalamo.backend.entity.EstadoLibro;
import org.kalamo.backend.entity.Libro;
import org.kalamo.backend.entity.Prestamo;
import org.kalamo.backend.entity.Usuario;
import org.kalamo.backend.exception.LibroNoDisponibleException;
import org.kalamo.backend.exception.LibroNotFoundException;
import org.kalamo.backend.exception.UsuarioNoEncontradoException;
import org.kalamo.backend.repository.LibroRepository;
import org.kalamo.backend.repository.PrestamoRepository;
import org.kalamo.backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class PrestamoServiceImpl implements PrestamoService {

    private final PrestamoRepository prestamoRepository;
    private final LibroRepository libroRepository;
    private final UsuarioRepository usuarioRepository;

    public PrestamoServiceImpl(PrestamoRepository prestamoRepository, LibroRepository libroRepository, UsuarioRepository usuarioRepository) {
        this.prestamoRepository = prestamoRepository;
        this.libroRepository = libroRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public Prestamo crearPrestamo(Long libroId, Long usuarioId) {
        // 1. Verificar que el libro exista
        Libro libro = libroRepository.findById(libroId).orElse(null);
        if (libro == null) {
            throw new RuntimeException("El libro solicitado no existe");
        }

        // 2. Verificar disponibilidad
        if (libro.getEstado() != null && libro.getEstado() == EstadoLibro.PRESTADO) {
            throw new LibroNoDisponibleException(libroId);
        }

        // 3. Verificar que el usuario exista
        Usuario usuario = usuarioRepository.findById(usuarioId).orElse(null);
        if (usuario == null) {
            throw new UsuarioNoEncontradoException(usuarioId);
        }

        // 4. Registrar prestamo
        LocalDate inicio = LocalDate.now();
        LocalDate devolucionEsperada = inicio.plusDays(14);

        Prestamo p = new Prestamo(libro, usuario, inicio, devolucionEsperada);
        Prestamo saved = prestamoRepository.save(p);

        // 5. Actualizar estado del libro
        libro.setEstado(EstadoLibro.PRESTADO);
        libroRepository.save(libro);

        return saved;
    }

    @Override
    public Prestamo editarPrestamo(Long prestamoId, Boolean devuelto, java.time.LocalDate fechaDevolucionEsperada) {
        Prestamo p = prestamoRepository.findById(prestamoId).orElseThrow(() -> new org.kalamo.backend.exception.PrestamoNotFoundException(prestamoId));

        boolean changed = false;

        // Actualizar fecha de devolución esperada
        if (fechaDevolucionEsperada != null) {
            p.setFechaDevolucionEsperada(fechaDevolucionEsperada);
            changed = true;
        }

        // Marcar como devuelto / no devuelto
        if (devuelto != null) {
            if (devuelto && !p.isDevuelto()) {
                // marcar devuelto: liberar libro
                p.setDevuelto(true);
                Libro libro = p.getLibro();
                libro.setEstado(org.kalamo.backend.entity.EstadoLibro.DISPONIBLE);
                libroRepository.save(libro);
                changed = true;
            } else if (!devuelto && p.isDevuelto()) {
                // desmarcar devuelto: set libro como prestado
                p.setDevuelto(false);
                Libro libro = p.getLibro();
                libro.setEstado(org.kalamo.backend.entity.EstadoLibro.PRESTADO);
                libroRepository.save(libro);
                changed = true;
            }
        }

        if (changed) {
            return prestamoRepository.save(p);
        }
        return p;
    }
}
