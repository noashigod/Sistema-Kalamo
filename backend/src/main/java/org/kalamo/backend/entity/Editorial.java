package org.kalamo.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "editorials")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Editorial {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @NotBlank(message = "Please add the editorial name")
    private String name;
    @NotBlank(message = "Please add the editorial country")
    private String country;
}
