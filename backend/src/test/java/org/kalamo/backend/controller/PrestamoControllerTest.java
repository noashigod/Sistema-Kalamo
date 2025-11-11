package org.kalamo.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.kalamo.backend.entity.Prestamo;
import org.kalamo.backend.service.PrestamoService;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDate;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

public class PrestamoControllerTest {

    private MockMvc mockMvc;

    @Mock
    private PrestamoService prestamoService;

    @InjectMocks
    private PrestamoController prestamoController;

    private ObjectMapper mapper = new ObjectMapper();

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(prestamoController).build();
    }

    @Test
    void crearPrestamo_returns201() throws Exception {
        Prestamo p = new Prestamo();
        p.setFechaInicio(LocalDate.now());
        p.setFechaDevolucionEsperada(LocalDate.now().plusDays(14));
        when(prestamoService.crearPrestamo(anyLong(), anyLong())).thenReturn(p);

        String body = mapper.writeValueAsString(java.util.Map.of("libroId", 1L, "usuarioId", 2L));

        mockMvc.perform(post("/api/prestamos/crear")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.message").exists());
    }

    @Test
    void editarPrestamo_returns200() throws Exception {
        Prestamo p = new Prestamo();
        p.setFechaInicio(LocalDate.now());
        p.setFechaDevolucionEsperada(LocalDate.now().plusDays(7));
        when(prestamoService.editarPrestamo(anyLong(), (Boolean) any(), (LocalDate) any())).thenReturn(p);

        String body = mapper.writeValueAsString(java.util.Map.of("devuelto", true));

        mockMvc.perform(put("/api/prestamos/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Préstamo actualizado"));
    }
}
