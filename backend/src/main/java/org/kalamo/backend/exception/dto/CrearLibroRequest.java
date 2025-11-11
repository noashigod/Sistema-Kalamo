package org.kalamo.backend.exception.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CrearLibroRequest {

    @NotBlank(message = "El título es obligatorio")
    private String titulo;

    // Se puede enviar el id del autor o su nombre
    private Long autorId;
    private String autorNombre;

    @NotNull(message = "El año de publicación es obligatorio")
    private Integer anioPublicacion;

    // Se puede enviar el id de la editorial o su nombre
    private Long editorialId;
    private String editorialNombre;
}
