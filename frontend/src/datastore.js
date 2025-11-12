// Data Store
const DataStore = {
    usuarios: [
        { id: 1, nombre: 'María García', email: 'maria@ejemplo.com', rol: 'Usuario', estado: 'Activo' },
        { id: 2, nombre: 'Carlos López', email: 'carlos@ejemplo.com', rol: 'Bibliotecario', estado: 'Activo' },
        { id: 3, nombre: 'Ana Martínez', email: 'ana@ejemplo.com', rol: 'Usuario', estado: 'Activo' },
        { id: 4, nombre: 'Pedro Rodríguez', email: 'pedro@ejemplo.com', rol: 'Usuario', estado: 'Inactivo' }
    ],

    autores: [
        { id: 1, nombre: 'Gabriel García Márquez', fechaNacimiento: '1927-03-06', generos: 'Realismo mágico', libros: 15 },
        { id: 2, nombre: 'Miguel de Cervantes', fechaNacimiento: '1547-09-29', generos: 'Novela', libros: 8 },
        { id: 3, nombre: 'Jorge Luis Borges', fechaNacimiento: '1899-08-24', generos: 'Cuento, Ensayo', libros: 22 },
        { id: 4, nombre: 'Isabel Allende', fechaNacimiento: '1942-08-02', generos: 'Novela histórica', libros: 12 }
    ],

    editoriales: [
        { id: 1, nombre: 'Penguin Random House', pais: 'Estados Unidos', libros: 234 },
        { id: 2, nombre: 'Editorial Planeta', pais: 'España', libros: 189 },
        { id: 3, nombre: 'Alfaguara', pais: 'España', libros: 156 },
        { id: 4, nombre: 'Fondo de Cultura Económica', pais: 'México', libros: 142 }
    ],

    libros: [
        { id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', isbn: '978-3-16-148410-0', copias: 5, estado: 'Disponible' },
        { id: 2, titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes', isbn: '978-0-14-303943-3', copias: 3, estado: 'Disponible' },
        { id: 3, titulo: 'Ficciones', autor: 'Jorge Luis Borges', isbn: '978-0-14-118680-9', copias: 0, estado: 'Prestado' },
        { id: 4, titulo: 'La casa de los espíritus', autor: 'Isabel Allende', isbn: '978-1-5011-1746-3', copias: 2, estado: 'Disponible' }
    ],

    prestamos: [
        { id: 1, usuario: 'María García', libro: 'Cien años de soledad', fechaPrestamo: '10/11/2025', fechaDevolucion: '24/11/2025', estado: 'Activo' },
        { id: 2, usuario: 'Carlos López', libro: 'Don Quijote', fechaPrestamo: '09/11/2025', fechaDevolucion: '23/11/2025', estado: 'Activo' },
        { id: 3, usuario: 'Ana Martínez', libro: 'La Odisea', fechaPrestamo: '08/11/2025', fechaDevolucion: '22/11/2025', estado: 'Devuelto' },
        { id: 4, usuario: 'Pedro Rodríguez', libro: 'Ficciones', fechaPrestamo: '01/11/2025', fechaDevolucion: '15/11/2025', estado: 'Vencido' }
    ],

    // Helper methods
    getNextId(collection) {
        const items = this[collection];
        return items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
    },

    add(collection, item) {
        item.id = this.getNextId(collection);
        this[collection].push(item);
        return item;
    },

    remove(collection, id) {
        const index = this[collection].findIndex(item => item.id === id);
        if (index > -1) {
            this[collection].splice(index, 1);
            return true;
        }
        return false;
    }
};
