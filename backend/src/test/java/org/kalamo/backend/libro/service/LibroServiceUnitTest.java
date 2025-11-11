package org.kalamo.backend.libro.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.kalamo.backend.entity.Autor;
import org.kalamo.backend.entity.Editorial;
import org.kalamo.backend.entity.Libro;
import org.kalamo.backend.repository.AutorRepository;
import org.kalamo.backend.repository.EditorialRepository;
import org.kalamo.backend.repository.LibroRepository;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class LibroServiceUnitTest {

    @Mock
    private LibroRepository libroRepository;

    @Mock
    private AutorRepository autorRepository;

    @Mock
    private EditorialRepository editorialRepository;

    @InjectMocks
    private LibroServiceImpl libroService;

    @Test
    void crearLibro_exitoso_unit() throws Exception {
        Autor autor = Autor.builder().id(1L).nombre("Gabriel Garcia Marquez").build();
        Editorial editorial = Editorial.builder().id(1L).name("Editorial Alfa").country("CO").build();

    when(autorRepository.findById(1L)).thenReturn(Optional.of(autor));
    when(editorialRepository.findById(1L)).thenReturn(Optional.of(editorial));
        when(libroRepository.findByTituloAndAutor("Cien años de soledad", autor)).thenReturn(Optional.empty());

        when(libroRepository.save(any(Libro.class))).thenAnswer(invocation -> {
            Libro l = invocation.getArgument(0);
            l.setId(1L);
            return l;
        });

        Libro libro = Libro.builder()
                .titulo("Cien años de soledad")
                .autor(Autor.builder().id(1L).build())
                .anioPublicacion(1967)
                .editorial(Editorial.builder().id(1L).build())
                .build();

        Libro saved = libroService.saveLibro(libro);

        assertNotNull(saved);
        assertEquals(1L, saved.getId());
        assertEquals("Cien años de soledad", saved.getTitulo());
        assertEquals(1967, saved.getAnioPublicacion());
        assertEquals(1L, saved.getAutor().getId());
        assertEquals(1L, saved.getEditorial().getId());
    }
}
