console.log("Hola ");



/**
 * Todo lo que seleccionemos al principio
 * Debe ser seleccionado mediante el document
 * 
 * Opciones de seleccion
 * Clasicas
 * getElementById
 * getElementByClassName
 * 
 * Modernas
 * Nos permite seleccionar por un selector css
 * Selectores css
 * etiqueta por ejemplo poner form
 * clase . por ejemplo .form-control
 * id # por ejemplo #title
 * 
 * 
 * querySelector() Si usamos un selector como de clase
 * solo va a seleccionar la primera coincidencia
 * 
 * querySelectorAll() 
 */


const formEl = document.getElementById("album-form");
console.log(formEl);

const mainEl = document.querySelector("#albumContainer")
console.log(mainEl);


let albums = [];

/**
 * Eventos
 * Es cualquier accion que realia el usuario en la pagina web
 * Escuchar por el evento
 * Escuchamos por un evento para que cuando ocurra
 * desencadene una respuesta
 * 
 * Pasos para extraer la información del formulario
 * 1.- Agregar un event listener del evento submit
 * 2.- Prevenir el comportamiento por default
 * 3.- Construir un form data dandole el elemento formulario
 * 4.- Extraer la información del formData y guardarla en un array de arrays
 * usando el spread operator
 * El spread operator desempaqueta la información de un iterable y la guarda en otro
 * 5.- Crear un objeto con la información usando Object.fromEntries()
 * object from entries recibe un array de arrays
 */



window.addEventListener("load", (event) =>{
    //console.log(event);
    if(getItemLocalStorage("albums")==undefined)return;
    albums =[...getItemLocalStorage("albums")];
    albums.map((album)=> renderCard(album,mainEl));
    /**
     * Segunda opcion
     * getItemLocalStorage("albums").forEach((album) => albums.push(album));
     */
    console.log(albums);
    
})




formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    //console.log(event);
    const formData = new FormData(formEl);
    console.log(formData);
    const dataArray = [...formData];
    console.log(dataArray);

    //console.log(dataArray[2]);
    const album = Object.fromEntries(dataArray);
    console.log(album);

    albums.push(album);

    setLocalStorage("albums", albums);


    console.log("array"+albums);
    mainEl.innerHTML = "";
    albums.map((album)=> renderCard(album,mainEl));
    //renderCard(album,mainEl);

    //para que se reseteen los campos del formulario
    formEl.reset();


    /* //obtener y convertir en un objeto en pocas lineas
    const album = Object.fromEntries([... new FormData(formEl)]);
    console.log(album);
    */
});

const setLocalStorage = (key,value)=>{

    //paso 1, convertir el valor a texto (string)
    const textValue = JSON.stringify(value);

    //paso 2, almacenar
    localStorage.setItem(key, textValue);
};


const getItemLocalStorage = (key) =>
{
    if(localStorage.getItem(key)==null) return;

    //convertimos de texto a el lenguaje JS
    const data = JSON.parse(localStorage.getItem(key));
    return data;  
};




/**
 * Manipulacion de la interfaz
 * 1.- Propiedad llamada innerhtml dentro de ella podemos observar todo
 * el html que vive dentro de la etiqueta seleccionada
 * !importante
 * !no se recomienda usar innerhtml para renderizar texto si estoy recibiendo y mostrando inmediatamente
 * porque es propenso a inyección de html
 * 
 * 
 * 2.- Propiedad llamada textConten esta solo mostrara el texto que tiene dentro
 * 
 */
/* console.log(mainEl.innerHTML);
console.log("text content");
console.log(mainEl.textContent);


mainEl.innerHTML += "<h1>Hola CH71</h1>"
mainEl.innerHTML += card;
console.log(mainEl.innerHTML); */


//mainEl.textContent += "hola";
//mainEl.textContent += card;


/**
 * Insert Adjacent HTMl
 * Permite insertar html en el contenedor sin borrar lo que ya esa en una posicion especifica
 * tiene 4 posiciones
 * 1.- beforebegin
 * 2.-beforeend
 * 3.- afterbeging
 * 4.- afterend
 */
// mainEl.insertAdjacentHTML("beforeend", card)


/*Opcion solo para este script
const renderCard = (albumObject) => {

    const card = `
<div class="card" style="width: 30rem;">
            <div class="card-body">
                <h5 class="card-title">${albumObject.titulo}</h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${albumObject.artista}</li>
                <li class="list-group-item">${albumObject.age}</li>
                <li class="list-group-item">${albumObject.genero}</li>
                <li class="list-group-item">${albumObject.rating}⭐</li>
                <li class="list-group-item">${albumObject.listened}</li>
            </ul>
            </div>
`;
mainEl.insertAdjacentHTML("beforeend", card);
}
*/

const renderCard = (albumObject, htmlElement) => {

    const card = `
    
    <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${albumObject.titulo}</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">${albumObject.artista}</li>
                    <li class="list-group-item">${albumObject.age}</li>
                    <li class="list-group-item">${albumObject.genero}</li>
                    <li class="list-group-item">${albumObject.rating}⭐</li>
                    <li class="list-group-item">${albumObject.listened}</li>
                </ul>
                </div>
                
    `;
    htmlElement.insertAdjacentHTML("beforeend", card);
}






const formVol = document.getElementById("recruitment-form");
console.log(formVol);

const mainVol = document.querySelector("#por-definir-xd")
console.log(mainVol);

let voluntarios = [];

formVol.addEventListener("submit", (event) => {
    event.preventDefault();
    //console.log(event);
    const formData = new FormData(formVol);
    console.log(formData);
    const dataArray = [...formData];
    console.log(dataArray);

    //console.log(dataArray[2]);
    const voluntario = Object.fromEntries(dataArray);
    console.log(voluntario);

    voluntarios.push(voluntario);

    setLocalStorage("voluntarios", voluntarios);


    console.log("array"+voluntarios);
    mainVol.innerHTML = "";
    voluntarios.map((voluntario)=> renderCard(voluntario,mainEl));

    //para que se reseteen los campos del formulario
    formEl.reset();


});