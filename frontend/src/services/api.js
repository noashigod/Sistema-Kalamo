import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1', // CORREGIDO: Apuntar a la v1 de la API
  headers: {
    'Content-Type': 'application/json',
  }
});

// --- Servicio para Autenticación ---

export const loginUsuario = async (credenciales) => {
  const response = await apiClient.post('/usuarios/login', credenciales);
  return response.data;
};

// --- Servicio para Autores ---

export const crearAutor = async (data) => {
  try {
    const response = await apiClient.post('/autores', data);
    console.log('Autor creado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al crear autor:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getAutores = async () => {
  try {
    const response = await apiClient.get('/autores');
    console.log('Autores obtenidos:', response.data);
    // Maneja respuestas con paginación (objeto con 'content') y sin paginación (array directo)
    const data = response.data;
    return Array.isArray(data) ? data : (data && Array.isArray(data.content) ? data.content : []);
  } catch (error) {
    console.error('Error al obtener autores:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const editarAutor = async (id, data) => {
  try {
    const response = await apiClient.put(`/autores/${id}`, data);
    console.log('Autor editado:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al editar autor ${id}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteAutor = async (id) => {
  try {
    const response = await apiClient.delete(`/autores/${id}`);
    console.log('Autor eliminado:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar autor ${id}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};

// --- Servicio para Préstamos ---

export const crearPrestamo = async (data) => {
  try {
    const response = await apiClient.post('/prestamos', data);
    console.log('Préstamo creado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al crear préstamo:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const editarPrestamo = async (id, data) => {
  try {
    const response = await apiClient.put(`/prestamos/${id}`, data);
    console.log('Préstamo editado:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al editar préstamo ${id}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getPrestamos = async () => {
  try {
    const response = await apiClient.get('/prestamos');
    console.log('Préstamos obtenidos:', response.data);
    // Maneja respuestas con paginación (objeto con 'content') y sin paginación (array directo)
    const data = response.data;
    return Array.isArray(data) ? data : (data && Array.isArray(data.content) ? data.content : []);
  } catch (error) {
    console.error('Error al obtener préstamos:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deletePrestamo = async (id) => {
  try {
    const response = await apiClient.delete(`/prestamos/${id}`);
    console.log('Préstamo eliminado:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar préstamo ${id}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};

export const devolverPrestamo = async (id) => {
  try {
    // Usamos PATCH porque es una actualización parcial (solo el estado 'devuelto' y la fecha)
    const response = await apiClient.patch(`/prestamos/${id}/devolver`);
    console.log('Préstamo devuelto:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al devolver el préstamo ${id}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};

// --- Servicio para Libros ---

export const crearLibro = async (data) => {
  try {
    const response = await apiClient.post('/libros', data);
    console.log('Libro creado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al crear libro:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getLibros = async () => {
  try {
    const response = await apiClient.get('/libros');
    console.log('Libros obtenidos:', response.data);
    // Maneja respuestas con paginación (objeto con 'content') y sin paginación (array directo)
    const data = response.data;
    return Array.isArray(data) ? data : (data && Array.isArray(data.content) ? data.content : []);
  } catch (error) {
    console.error('Error al obtener libros:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteLibro = async (id) => {
  try {
    const response = await apiClient.delete(`/libros/${id}`);
    console.log('Libro eliminado:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar libro ${id}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};

export const editarLibro = async (id, data) => {
  try {
    const response = await apiClient.put(`/libros/${id}`, data);
    console.log('Libro editado:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al editar libro ${id}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};

// --- Servicio para Usuarios ---

export const crearUsuario = async (data) => {
  try {
    const response = await apiClient.post('/usuarios', data);
    console.log('Usuario creado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al crear usuario:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getUsuarios = async () => {
  try {
    const response = await apiClient.get('/usuarios');
    console.log('Usuarios obtenidos:', response.data);
    // Maneja respuestas con paginación (objeto con 'content') y sin paginación (array directo)
    const data = response.data;
    return Array.isArray(data) ? data : (data && Array.isArray(data.content) ? data.content : []);
  } catch (error) {
    console.error('Error al obtener usuarios:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteUsuario = async (id) => {
  try {
    const response = await apiClient.delete(`/usuarios/${id}`);
    console.log('Usuario eliminado:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar usuario ${id}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};

export const editarUsuario = async (id, data) => {
  try {
    const response = await apiClient.put(`/usuarios/${id}`, data);
    console.log('Usuario editado:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al editar usuario ${id}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};

// --- Servicio para Editoriales ---

export const crearEditorial = async (data) => {
  try {
    const response = await apiClient.post('/editoriales', data);
    console.log('Editorial creada:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al crear editorial:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getEditoriales = async () => {
  try {
    const response = await apiClient.get('/editoriales');
    console.log('Editoriales obtenidas:', response.data);
    // Maneja respuestas con paginación (objeto con 'content') y sin paginación (array directo)
    const data = response.data;
    return Array.isArray(data) ? data : (data && Array.isArray(data.content) ? data.content : []);
  } catch (error) {
    console.error('Error al obtener editoriales:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteEditorial = async (id) => {
  try {
    const response = await apiClient.delete(`/editoriales/${id}`);
    console.log('Editorial eliminada:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar editorial ${id}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};

export const editarEditorial = async (id, data) => {
  try {
    const response = await apiClient.put(`/editoriales/${id}`, data);
    console.log('Editorial editada:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al editar editorial ${id}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};