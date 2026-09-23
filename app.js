// Selectores
const formVol = document.getElementById("recruitment-form");
console.log(formVol);

const sliderVol = document.querySelector("#cards-voluntarios");
console.log(sliderVol);

let voluntarios = [];

if (formVol) {
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
}

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

const cartStorageKey = "gryffindor-cart";

const formatCurrency = (value) => `$${Number(value).toLocaleString("es-MX")}`;

const getCart = () => {
    try {
        const cart = JSON.parse(localStorage.getItem(cartStorageKey) || "[]");
        return Array.isArray(cart) ? cart : [];
    } catch (error) {
        return [];
    }
};

const setCart = (cart) => {
    localStorage.setItem(cartStorageKey, JSON.stringify(cart));
};

const renderCart = () => {
    const cart = getCart();
    const title = document.getElementById("cart-summary-title");
    const body = document.getElementById("cart-summary-body");
    const totalElement = document.getElementById("cart-total");

    if (!title || !body || !totalElement) return;

    const existingList = body.querySelector(".cart-items-list");
    if (existingList) existingList.remove();

    if (!cart.length) {
        title.textContent = "Tu carrito está vacío.";
        totalElement.textContent = formatCurrency(0);
        return;
    }

    const total = cart.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);
    totalElement.textContent = formatCurrency(total);
    title.textContent = "Productos en tu carrito:";

    const list = document.createElement("ul");
    list.className = "list-unstyled cart-items-list mt-3 mb-0";

    cart.forEach((item) => {
        const itemLine = document.createElement("li");
        itemLine.className = "mb-1";
        itemLine.textContent = `${item.name} x${item.quantity} — ${formatCurrency(Number(item.price) * Number(item.quantity))}`;
        list.appendChild(itemLine);
    });

    body.appendChild(list);
};

const initializeStoreCart = () => {
    const addButtons = document.querySelectorAll(".add-to-cart");
    const clearCartButton = document.getElementById("clear-cart");
    const buyCartButton = document.getElementById("buy-cart");

    addButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const productCard = button.closest(".product");
            if (!productCard) return;

            const name = productCard.dataset.name;
            const price = Number(productCard.dataset.price);
            const quantityInput = productCard.querySelector(".product-quantity");
            const quantity = Math.max(1, Number(quantityInput?.value || 1));
            const cart = getCart();
            const existingItem = cart.find((item) => item.name === name);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({ name, price, quantity });
            }

            setCart(cart);
            renderCart();

            document.body.classList.add("cart-updating");
            window.clearTimeout(window.__gryffindorCartResetTimer || 0);
            window.__gryffindorCartResetTimer = window.setTimeout(() => {
                document.body.classList.remove("cart-updating");
            }, 300);

            button.classList.add("adding");
            const originalText = button.textContent;
            button.textContent = "Agregado";
            quantityInput.value = 1;

            window.setTimeout(() => {
                button.classList.remove("adding");
                button.textContent = originalText;
            }, 700);
        });
    });

    clearCartButton?.addEventListener("click", () => {
        setCart([]);
        renderCart();
    });

    buyCartButton?.addEventListener("click", () => {
        const cart = getCart();

        if (!cart.length) {
            alert("Tu carrito está vacío.");
            return;
        }

        const total = cart.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);
        alert(`¡Gracias por tu compra! Total: ${formatCurrency(total)}`);
        setCart([]);
        renderCart();
    });

    renderCart();
};

if (document.querySelector(".add-to-cart")) {
    initializeStoreCart();
}