package org.kalamo.backend.libro.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActualizarLibroRequest {
    private String titulo;
    private Long autorId;
    private String autorNombre;
    private Integer anioPublicacion;
    private Long editorialId;
    private String editorialNombre;
}
