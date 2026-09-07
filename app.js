console.log("Hola ");





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