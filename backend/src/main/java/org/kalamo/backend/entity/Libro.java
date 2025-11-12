package org.kalamo.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "libros")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Libro {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank(message = "Please add the book title")
    private String titulo;

    @ManyToOne
    @JoinColumn(name = "autor_id")
    private Autor autor;

    // Año de publicación como entero (por ejemplo 2025)
    private Integer anioPublicacion;

    @ManyToOne
    @JoinColumn(name = "editorial_id")
    private Editorial editorial;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado", nullable = false)
    @Builder.Default
    private EstadoLibro estado = EstadoLibro.DISPONIBLE;
}
