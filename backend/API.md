# API - LibroController

Resumen breve de los endpoints para gestionar libros (módulo backend).

Base path: `/api/libros`

Campos principales del recurso Libro:
- titulo (string)
- anioPublicacion (integer)
- autorId (long)
- editorialId (long)

---

## GET /api/libros
Lista todos los libros.

Respuesta:
- 200 OK
- Body: arreglo de objetos `LibroResponse`.

Ejemplo de respuesta:

[
  {
    "id": 1,
    "titulo": "Cien años de soledad",
    "anioPublicacion": 1967,
    "autorId": 5,
    "editorialId": 2
  }
]

---

## GET /api/libros/{id}
Obtiene un libro por su id.

Respuestas:
- 200 OK: devuelve `LibroResponse`
- 404 Not Found: si el libro no existe

Ejemplo de respuesta 200:

{
  "id": 1,
  "titulo": "Cien años de soledad",
  "anioPublicacion": 1967,
  "autorId": 5,
  "editorialId": 2
}

---

## POST /api/libros
Crea un nuevo libro. Esta operación depende al 100% de la BBDD: valida existencia de autor y editorial.

Request body (`CrearLibroRequest`):
- `titulo` (string) - obligatorio
- `anioPublicacion` (integer) - obligatorio
- `autorId` (long) - obligatorio
- `editorialId` (long) - obligatorio

Ejemplo de request:

{
  "titulo": "El amor en los tiempos del cólera",
  "anioPublicacion": 1985,
  "autorId": 5,
  "editorialId": 2
}

Respuestas posibles:
- 201 Created: libro creado correctamente. Location header: `/api/libros/{id}` y body con `LibroResponse`.
- 400 Bad Request: datos obligatorios faltantes o inválidos.
- 404 Not Found: si `autorId` o `editorialId` no existen (ej. `AutorNotFoundException`, `EditorialNotFoundException`).
- 409 Conflict: si ya existe un libro con mismo título y autor (ej. `LibroAlreadyExistsException`).

Ejemplo de respuesta 201:

{
  "id": 42,
  "titulo": "El amor en los tiempos del cólera",
  "anioPublicacion": 1985,
  "autorId": 5,
  "editorialId": 2
}

---

## PUT /api/libros/{id}
Actualiza los datos de un libro existente.

Request body (`ActualizarLibroRequest`): similar a `CrearLibroRequest` (campos a actualizar).

Respuestas:
- 200 OK: devuelve el `LibroResponse` actualizado.
- 400 Bad Request: datos inválidos.
- 404 Not Found: si el libro (o autor/editorial referenciados) no existen.
- 409 Conflict: si la actualización genera un conflicto con un libro existente.

Ejemplo request:

{
  "titulo": "El amor en los tiempos del cólera (ed. revisada)",
  "anioPublicacion": 1986,
  "autorId": 5,
  "editorialId": 2
}

---

## DELETE /api/libros/{id}
Elimina un libro por id.

Respuestas:
- 204 No Content: eliminado satisfactoriamente.
- 404 Not Found: si el libro no existe.
- 409 Conflict: si la eliminación está impedida por reglas de negocio (p.ej. FK o préstamos pendientes; si aplica en tu dominio).

---

## Errores comunes y códigos HTTP mappeados
- `AutorNotFoundException` -> 404
- `EditorialNotFoundException` -> 404
- `LibroAlreadyExistsException` -> 409
- `LibroNotFoundException` -> 404
- `DatosObligatoriosIncompletosException` -> 400

(Estos mapeos se gestionan en `GlobalExceptionHandler`.)

---

## Notas
- Seguridad: los tests de integración usan `@WithMockUser` y MockMvc con CSRF cuando es necesario. En producción, revisar políticas de autenticación/autorización para estos endpoints.
- Si quieres, genero además ejemplos curl o un `application-postman.json` para importar en Postman.

