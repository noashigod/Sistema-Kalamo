package org.kalamo.backend.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.kalamo.backend.entity.EstadoLibro;
import org.kalamo.backend.entity.Libro;
import org.kalamo.backend.entity.Prestamo;
import org.kalamo.backend.entity.Usuario;
import org.kalamo.backend.exception.LibroNoDisponibleException;
import org.kalamo.backend.repository.LibroRepository;
import org.kalamo.backend.repository.PrestamoRepository;
import org.kalamo.backend.repository.UsuarioRepository;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PrestamoServiceTest {

    @Mock
    PrestamoRepository prestamoRepository;

    @Mock
    LibroRepository libroRepository;

    @Mock
    UsuarioRepository usuarioRepository;

    @InjectMocks
    PrestamoServiceImpl prestamoService;

    @Test
    void crearPrestamo_success_setsLibroPrestado() {
        Libro libro = new Libro();
        libro.setId(1L);
        libro.setEstado(EstadoLibro.DISPONIBLE);

    Usuario usuario = new Usuario();

        when(libroRepository.findById(1L)).thenReturn(Optional.of(libro));
        when(usuarioRepository.findById(2L)).thenReturn(Optional.of(usuario));

        ArgumentCaptor<Prestamo> captor = ArgumentCaptor.forClass(Prestamo.class);
        when(prestamoRepository.save(any())).thenAnswer(i -> i.getArgument(0));
        when(libroRepository.save(any())).thenAnswer(i -> i.getArgument(0));

    Prestamo p = prestamoService.crearPrestamo(1L, 2L);

    assertThat(p.getLibro().getId()).isEqualTo(1L);
    assertThat(p.getUsuario()).isEqualTo(usuario);
        assertThat(p.getFechaInicio()).isEqualTo(LocalDate.now());
        assertThat(p.getFechaDevolucionEsperada()).isEqualTo(LocalDate.now().plusDays(14));

        verify(prestamoRepository).save(captor.capture());
        verify(libroRepository).save(libro);
        assertThat(libro.getEstado()).isEqualTo(EstadoLibro.PRESTADO);
    }

    @Test
    void crearPrestamo_whenLibroPrestado_throws() {
        Libro libro = new Libro();
        libro.setId(1L);
        libro.setEstado(EstadoLibro.PRESTADO);

        when(libroRepository.findById(1L)).thenReturn(Optional.of(libro));

        assertThrows(LibroNoDisponibleException.class, () -> prestamoService.crearPrestamo(1L, 2L));
    }
}
