package org.kalamo.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "prestamos")
public class Prestamo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "libro_id", nullable = false)
    private Libro libro;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(name = "fecha_inicio", nullable = false)
    private LocalDate fechaInicio;

    @Column(name = "fecha_devolucion_esperada", nullable = false)
    private LocalDate fechaDevolucionEsperada;

    @Column(name = "devuelto", nullable = false)
    private boolean devuelto = false;

    public Prestamo() {}

    public Prestamo(Libro libro, Usuario usuario, LocalDate fechaInicio, LocalDate fechaDevolucionEsperada) {
        this.libro = libro;
        this.usuario = usuario;
        this.fechaInicio = fechaInicio;
        this.fechaDevolucionEsperada = fechaDevolucionEsperada;
        this.devuelto = false;
    }

    public Long getId() { return id; }
    public Libro getLibro() { return libro; }
    public void setLibro(Libro libro) { this.libro = libro; }
    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
    public LocalDate getFechaInicio() { return fechaInicio; }
    public void setFechaInicio(LocalDate fechaInicio) { this.fechaInicio = fechaInicio; }
    public LocalDate getFechaDevolucionEsperada() { return fechaDevolucionEsperada; }
    public void setFechaDevolucionEsperada(LocalDate fechaDevolucionEsperada) { this.fechaDevolucionEsperada = fechaDevolucionEsperada; }
    public boolean isDevuelto() { return devuelto; }
    public void setDevuelto(boolean devuelto) { this.devuelto = devuelto; }
}
