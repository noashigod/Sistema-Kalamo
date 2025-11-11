package org.kalamo.backend.libro.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.kalamo.backend.entity.Autor;
import org.kalamo.backend.entity.Editorial;
import org.kalamo.backend.entity.Libro;
import org.kalamo.backend.repository.AutorRepository;
import org.kalamo.backend.repository.EditorialRepository;
import org.kalamo.backend.repository.LibroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(properties = {
    "spring.datasource.url=jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=false",
    "spring.datasource.driver-class-name=org.h2.Driver",
    "spring.datasource.username=sa",
    "spring.datasource.password=",
    "spring.jpa.database-platform=org.hibernate.dialect.H2Dialect",
    "spring.jpa.hibernate.ddl-auto=create-drop"
})
@Transactional
public class LibroServiceIntegrationTest {

    @Autowired
    private LibroService libroService;

    @Autowired
    private AutorRepository autorRepository;

    @Autowired
    private EditorialRepository editorialRepository;

    @Autowired
    private LibroRepository libroRepository;

    @BeforeEach
    void setUp() {
        libroRepository.deleteAll();
        autorRepository.deleteAll();
        editorialRepository.deleteAll();
    }

    @Test
    void crearLibro_exitoso() throws Exception {
        Autor autor = Autor.builder()
                .nombre("Gabriel Garcia Marquez")
                .build();
        autor = autorRepository.save(autor);

        Editorial editorial = Editorial.builder()
                .name("Editorial Alfa")
                .country("CO")
                .build();
        editorial = editorialRepository.save(editorial);

        Libro libro = Libro.builder()
                .titulo("Cien años de soledad")
                .autor(Autor.builder().id(autor.getId()).build())
                .anioPublicacion(1967)
                .editorial(Editorial.builder().id(editorial.getId()).build())
                .build();

        Libro saved = libroService.saveLibro(libro);

        assertNotNull(saved);
        assertTrue(saved.getId() > 0);
        assertEquals("Cien años de soledad", saved.getTitulo());
        assertEquals(1967, saved.getAnioPublicacion());
        assertEquals(autor.getId(), saved.getAutor().getId());
        assertEquals(editorial.getId(), saved.getEditorial().getId());
    }
}
