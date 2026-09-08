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
     <div class="card gryffindor-card h-100 shadow-sm border-danger">
      <div class="card-body">
        <h5 class="card-title text-danger fw-bold">🦁 ${voluntarioObject.nombre}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${voluntarioObject.correo}</h6>
        <p class="card-text mb-1"><strong>Edad:</strong> ${voluntarioObject.edad} años</p>
        <p class="card-text mb-1"><strong>Cualidad:</strong> <span class="badge bg-warning text-dark">${voluntarioObject.cualidad}</span></p>
        <p class="card-text mt-2 text-secondary"><em>"${voluntarioObject.motivo}"</em></p>
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
};

const getItemLocalStorage = (key) => {
    if (localStorage.getItem(key) == null) return;
    // Convertimos de texto a lenguaje js
    const data = JSON.parse(localStorage.getItem(key));
    return data;
};