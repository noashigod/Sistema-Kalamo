package org.kalamo.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "libros")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Libro {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotBlank(message = "Please add the book title")
    private String titulo;

    private String autor;

    private String isbn;

    @ManyToOne
    @JoinColumn(name = "editorial_id")
    private Editorial editorial;

    @Builder.Default
    private Boolean disponible = true;

    private LocalDate fechaPublicacion;
}
