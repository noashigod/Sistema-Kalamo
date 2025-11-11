package org.kalamo.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.kalamo.backend.entity.Autor;
import org.kalamo.backend.entity.Editorial;
import org.kalamo.backend.repository.AutorRepository;
import org.kalamo.backend.repository.EditorialRepository;
import org.kalamo.backend.repository.LibroRepository;
import org.kalamo.backend.libro.dto.CrearLibroRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(properties = {
    "spring.datasource.url=jdbc:h2:mem:testdb",
    "spring.datasource.driverClassName=org.h2.Driver",
    "spring.datasource.username=sa",
    "spring.datasource.password=",
    "spring.jpa.database-platform=org.hibernate.dialect.H2Dialect",
    "spring.jpa.hibernate.ddl-auto=create-drop"
})
@org.springframework.transaction.annotation.Transactional
@AutoConfigureMockMvc
public class LibroControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private AutorRepository autorRepository;

    @Autowired
    private EditorialRepository editorialRepository;

    @Autowired
    private LibroRepository libroRepository;

    @Test
    @WithMockUser
    public void crearLibro_happyPath_persisteEnBD() throws Exception {
        autorRepository.deleteAll();
        editorialRepository.deleteAll();
        libroRepository.deleteAll();

        Autor autor = Autor.builder().nombre("Gabriel García Márquez").build();
        autor = autorRepository.save(autor);

        Editorial editorial = Editorial.builder().name("Editorial Oveja Negra").country("Colombia").build();
        editorial = editorialRepository.save(editorial);

        CrearLibroRequest req = new CrearLibroRequest();
        req.setTitulo("Cien años de soledad");
        req.setAutorId(autor.getId());
        req.setAnioPublicacion(1967);
        req.setEditorialId(editorial.getId());

        String body = objectMapper.writeValueAsString(req);

    String resp = mockMvc.perform(post("/api/libros")
            .with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(body))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.titulo").value("Cien años de soledad"))
                .andReturn().getResponse().getContentAsString();

        // Verificar que realmente existe en la BD
        assertThat(libroRepository.findAll()).hasSize(1);
    }

    @Test
    @WithMockUser
    public void crearLibro_autorInexistente_devuelve404() throws Exception {
        autorRepository.deleteAll();
        editorialRepository.deleteAll();
        libroRepository.deleteAll();

        // Solo creamos editorial
        Editorial editorial = Editorial.builder().name("Planeta").country("ES").build();
        editorial = editorialRepository.save(editorial);

        CrearLibroRequest req = new CrearLibroRequest();
        req.setTitulo("Libro sin autor");
        req.setAutorId(99999L); // id que no existe
        req.setAnioPublicacion(2000);
        req.setEditorialId(editorial.getId());

        String body = objectMapper.writeValueAsString(req);

        mockMvc.perform(post("/api/libros").with(csrf()).contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser
    public void crearLibro_duplicado_devuelve409() throws Exception {
        autorRepository.deleteAll();
        editorialRepository.deleteAll();
        libroRepository.deleteAll();

        Autor autor = Autor.builder().nombre("Autor Duplicado").build();
        autor = autorRepository.save(autor);

        Editorial editorial = Editorial.builder().name("EdDup").country("ES").build();
        editorial = editorialRepository.save(editorial);

        CrearLibroRequest req = new CrearLibroRequest();
        req.setTitulo("Titulo D");
        req.setAutorId(autor.getId());
        req.setAnioPublicacion(1999);
        req.setEditorialId(editorial.getId());

        String body = objectMapper.writeValueAsString(req);

        // Primera creación OK
        mockMvc.perform(post("/api/libros").with(csrf()).contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isCreated());

        // Segunda creación -> conflicto
        mockMvc.perform(post("/api/libros").with(csrf()).contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isConflict());
    }
}
