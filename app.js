// Selectores
const formVol = document.getElementById("recruitment-form");
console.log(formVol);

const sliderVol = document.querySelector(".cards-slider");
console.log(sliderVol);

let voluntarios = [];

window.addEventListener("load", (event) => {
    if(getItemLocalStorage("voluntarios") == undefined) return;
    // Transformar a un array mas legible
    voluntarios =  [... getItemLocalStorage("voluntarios")];
    // Que se muestren las cards cuando se cierre y vuelva a abrir la página
    voluntarios.map((voluntario) => renderCard(voluntario, sliderVol));
});

formVol.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(formVol);
    console.log(formData.get("title")); // Obtener un solo dato
    console.log(formData);
    const dataArray = [... formData];
    console.log(dataArray);

    const voluntario = Object.fromEntries(dataArray);
    console.log(voluntario);
    //const album = Object.fromEntries([... new FormData(formEl)]);
    console.log(voluntario);
    voluntarios.push(voluntario);
    setLocalStorage("voluntarios", voluntarios);
    console.log("array" + voluntarios);
    // Limpiamos antes de volver a renderizar las cards para evitar la acumulación
    sliderVol.innerHTML = "";
    // Renderizamos todas las cards dentro del array de albums
    // Al recorrer el array con map nos aseguramos de no mostrar cards de manera acumulativa
    voluntarios.map((voluntario) => renderCard(voluntario, sliderVol));
    formVol.reset();
});

const renderCard = (voluntarioObject, htmlElement) => {
const card = `
    <article class="card gryffindor-card" id="card-2">
        <div class="card-body d-flex flex-column">
            <p class="card-category">${voluntarioObject.category}</p>
            <h2 class="card-title">${voluntarioObject.nombre}</h2>
            <h2 class="card-title">${voluntarioObject.edad}</h2>
            <p class="card-text">
            ${voluntarioObject.motivo}
            </p>
            <p class="card-detail mt-auto">${voluntarioObject.cualidad}</p>
        </div>
    </article>
`;
htmlElement.insertAdjacentHTML("beforeend", card);
};

const setLocalStorage = (key, value) => {
    // Paso 1 convertir el valor a text
    const textValue = JSON.stringify(value);
    // Paso 2 almacenar
    localStorage.setItem(key, textValue);
};

const getItemLocalStorage = (key) => {
    if (localStorage.getItem(key) == null) return;
    // Convertimos de texto a lenguaje js
    const data = JSON.parse(localStorage.getItem(key));
    return data;
};