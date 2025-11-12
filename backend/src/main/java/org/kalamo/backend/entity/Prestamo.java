package org.kalamo.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "prestamos")
public class Prestamo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "libro_id", nullable = false)
    private Libro libro;

    @Column(name = "fecha_inicio", nullable = false)
    private LocalDate fechaInicio;

    @Column(name = "fecha_fin_esperada", nullable = false)
    private LocalDate fechaFinEsperada;

    @Column(name = "fecha_devolucion_esperada", nullable = false)
    private LocalDate fechaDevolucionEsperada;

    @Column(name = "fecha_devolucion")
    private LocalDate fechaDevolucion;

    @Column(name = "devuelto", nullable = false)
    private boolean devuelto = false;

    // Constructors, getters, and setters

    public Prestamo() {
    }

    public Prestamo(Usuario usuario, Libro libro, LocalDate fechaInicio, LocalDate fechaFinEsperada) {
        this.usuario = usuario;
        this.libro = libro;
        this.fechaInicio = fechaInicio;
        this.fechaFinEsperada = fechaFinEsperada;
        this.fechaDevolucionEsperada = fechaFinEsperada; // Asignamos el mismo valor a la nueva columna
        this.devuelto = false; // Aseguramos que siempre se inicie como no devuelto
    }

    // ⭐ GETTERS Y SETTERS AÑADIDOS PARA RESOLVER EL ERROR DE COMPILACIÓN

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Libro getLibro() {
        return libro;
    }

    public void setLibro(Libro libro) {
        this.libro = libro;
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDate getFechaFinEsperada() {
        return fechaFinEsperada;
    }

    public void setFechaFinEsperada(LocalDate fechaFinEsperada) {
        this.fechaFinEsperada = fechaFinEsperada;
    }

    public LocalDate getFechaDevolucion() {
        return fechaDevolucion;
    }

    public void setFechaDevolucion(LocalDate fechaDevolucion) {
        this.fechaDevolucion = fechaDevolucion;
    }

    public boolean isDevuelto() {
        return devuelto;
    }

    public void setDevuelto(boolean devuelto) {
        this.devuelto = devuelto;
    }

    public LocalDate getFechaDevolucionEsperada() {
        return fechaDevolucionEsperada;
    }

    public void setFechaDevolucionEsperada(LocalDate fechaDevolucionEsperada) {
        this.fechaDevolucionEsperada = fechaDevolucionEsperada;
    }
}