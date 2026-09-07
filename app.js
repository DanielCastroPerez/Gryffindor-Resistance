/**
 * GryffindIn - Red Social de Gryffindor
 * Script para gestionar el feed de publicaciones y persistencia en LocalStorage
 */

// 1. Selección de elementos del DOM
const formEl = document.getElementById("post-form");
const mainEl = document.querySelector("#feed-container");

let posts = [];

/**
 * Evento que se ejecuta al cargar la página
 * Recupera las publicaciones guardadas en LocalStorage y las renderiza
 */
window.addEventListener("load", () => {
  const savedPosts = getItemLocalStorage("posts");
  
  if (savedPosts === undefined) return;

  // Asignamos las publicaciones recuperadas al arreglo
  posts = [...savedPosts];

  // Renderizamos cada publicación en el contenedor principal
  posts.map((post) => renderCard(post, mainEl));
});

/**
 * Evento del formulario para agregar un nuevo "logro" o publicación al feed
 */
formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  // Captura de datos del formulario de manera limpia mediante FormData
  const formData = new FormData(formEl);
  const post = Object.fromEntries([...formData]);

  // Agregar marca de tiempo para saber cuándo se publicó
  post.timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Guardar en la lista global y en LocalStorage
  posts.push(post);
  setLocalStorage("posts", posts);

  // Limpiar el contenedor antes de re-renderizar para evitar duplicados
  mainEl.innerHTML = "";

  // Renderizar las publicaciones actualizadas
  posts.map((post) => renderCard(post, mainEl));

  // Limpiar los campos del formulario
  formEl.reset();
});

/**
 * Función encargada de construir e insertar el HTML de cada tarjeta en el DOM
 * @param {Object} postObject Objeto con la información de la publicación
 * @param {HTMLElement} htmlElement Contenedor donde se insertará la tarjeta
 */
const renderCard = (postObject, htmlElement) => {
  const card = `
    <article class="card mb-3 shadow-sm border-danger-subtle">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h5 class="card-title mb-0 fw-bold text-danger">${postObject.author}</h5>
          <small class="text-muted">${postObject.timestamp || 'Reciente'}</small>
        </div>
        <h6 class="card-subtitle mb-2 text-body-secondary">${postObject.role}</h6>
        <p class="card-text fs-6">${postObject.content}</p>
        <div class="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
          <span class="badge bg-warning text-dark">Especialidad: ${postObject.specialty}</span>
          <button type="button" class="btn btn-outline-danger btn-sm">
            🦁 Rugir
          </button>
        </div>
      </div>
    </article>
  `;

  htmlElement.insertAdjacentHTML("afterbegin", card); // Inserta el post más reciente arriba
};

/**
 * Almacena un valor serializado en LocalStorage
 * @param {string} key Clave de almacenamiento
 * @param {any} value Valor a guardar
 */
const setLocalStorage = (key, value) => {
  const textValue = JSON.stringify(value);
  localStorage.setItem(key, textValue);
};

/**
 * Obtiene y deserializa un valor guardado en LocalStorage
 * @param {string} key Clave de almacenamiento
 * @returns {any} Datos en formato JavaScript
 */
const getItemLocalStorage = (key) => {
  const item = localStorage.getItem(key);
  if (item === null) return;

  const data = JSON.parse(item);
  return data;
};