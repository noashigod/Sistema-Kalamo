package org.kalamo.backend.entity;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "autores")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Autor {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank(message = "Please add the author name")
    private String nombre;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @NotBlank(message = "Please add the birth date")
    private String fechaNacimiento;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private String fechaFallecimiento;

    @NotBlank(message = "Please add the biography")
    @Column(length = 5000)
    private String biografia;

    @NotBlank(message = "Please add the genders")
    private String generosEscritos;
}
