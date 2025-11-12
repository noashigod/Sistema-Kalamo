// Agrega y exporta todo el “Pages” modular
import { createListPage, handleSearch, showSuccess, deleteItem } from "./common.js";
import { dashboard } from "./dashboard.js";
import { listarUsuarios, crearUsuario, submitUsuario } from "./usuarios.js";
import { listarAutores, crearAutor, submitAutor } from "./autores.js";
import { listarEditoriales, crearEditorial, submitEditorial } from "./editoriales.js";
import { listarLibros, crearLibro, submitLibro } from "./libros.js";
import { listarPrestamos, crearPrestamo } from "./prestamos.js";

export const Pages = {
  // comunes
  createListPage,
  handleSearch,
  showSuccess,
  deleteItem,
  // dashboard
  dashboard,
  // usuarios
  listarUsuarios,
  crearUsuario,
  submitUsuario,
  // autores
  listarAutores,
  crearAutor,
  submitAutor,
  // editoriales
  listarEditoriales,
  crearEditorial,
  submitEditorial,
  // libros
  listarLibros,
  crearLibro,
  submitLibro,
  // préstamos
  listarPrestamos,
  crearPrestamo,
};

// mantener compatibilidad con los onclick en tu HTML
if (typeof window !== "undefined") {
  window.Pages = Pages;
}

export default Pages;
