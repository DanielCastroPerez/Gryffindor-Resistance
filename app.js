console.log("Hola ");

// Selectores
const formEl = document.getElementById("album-form");
//console.log(formEl);

const mainEl = document.querySelector("#album-container");
//console.log(mainEl);

let albums = [];
//const albums = []; // Segunda opcion

window.addEventListener("load", (event) => {
    if(getItemLocalStorage("albums") == undefined) return;
    // Transformar a un array mas legible
    albums =  [... getItemLocalStorage("albums")];
    // Que se muestren las cards cuando se cierre y vuelva a abrir la página
    albums.map((album) => renderCard(album, mainEl));
    /**
     * Segunda opcion
     * getItemLocalStorage("albums").forEach((album) => albums.push(album));
     * console.log(albums);
     */
});

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(formEl);
    console.log(formData.get("title")); // Obtener un solo dato
    console.log(formData);
    const dataArray = [... formData];
    console.log(dataArray);
    const album = Object.fromEntries(dataArray);
    console.log(album);
    // Hacer todo lo lo anterior en una linea
    //const album = Object.fromEntries([... new FormData(formEl)]);
    //console.log(album);
    albums.push(album);
    setLocalStorage("albums", albums);
    //console.log(albums);
    // Limpiamos antes de volver a renderizar las cards para evitar la acumulación
    mainEl.innerHTML = "";
    // Renderizamos todas las cards dentro del array de albums
    // Al recorrer el array con map nos aseguramos de no mostrar cards de manera acumulativa
    albums.map((album) => renderCard(album, mainEl));
    formEl.reset();
});

const renderCard = (albumObject, htmlElement) => {
const card = `
    <div class="card" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">${albumObject.title}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">${albumObject.artist}</h6>
        <p class="card-text">Genero: ${albumObject.genre}</p>
        <a href="#" class="card-link">Año de lanzamiento: ${albumObject.year}</a>
        <a href="#" class="card-link">Rating: ${albumObject.rating}</a>
        </div>
    </div>
`;
htmlElement.insertAdjacentHTML("beforeend", card);
};

const setLocalStorage = (key, value) => {
    // Paso 1 convertir el valor a text
    const textValue = JSON.stringify(value);
    // Paso 2 almacenar
    localStorage.setItem(key, textValue);
}

const getItemLocalStorage = (key) => {
    if (localStorage.getItem(key) == null) return;
    // Convertimos de texto a lenguaje js
    const data = JSON.parse(localStorage.getItem(key));
    return data;
}