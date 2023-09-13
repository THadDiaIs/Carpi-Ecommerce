// PRODUCTOS
const productos = [
    // Abrigos
    {
        id: "abrigo-01",
        titulo: "Abrigo 01",
        imagen: "./img/abrigos/01.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 1000
    },
    {
        id: "abrigo-02",
        titulo: "Abrigo 02",
        imagen: "./img/abrigos/02.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 1000
    },
    {
        id: "abrigo-03",
        titulo: "Abrigo 03",
        imagen: "./img/abrigos/03.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 1000
    },
    {
        id: "abrigo-04",
        titulo: "Abrigo 04",
        imagen: "./img/abrigos/04.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 1000
    },
    {
        id: "abrigo-05",
        titulo: "Abrigo 05",
        imagen: "./img/abrigos/05.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 1000
    },
    // Camisetas
    {
        id: "camiseta-01",
        titulo: "Camiseta 01",
        imagen: "./img/camisetas/01.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "camiseta-02",
        titulo: "Camiseta 02",
        imagen: "./img/camisetas/02.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "camiseta-03",
        titulo: "Camiseta 03",
        imagen: "./img/camisetas/03.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "camiseta-04",
        titulo: "Camiseta 04",
        imagen: "./img/camisetas/04.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "camiseta-05",
        titulo: "Camiseta 05",
        imagen: "./img/camisetas/05.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "camiseta-06",
        titulo: "Camiseta 06",
        imagen: "./img/camisetas/06.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "camiseta-07",
        titulo: "Camiseta 07",
        imagen: "./img/camisetas/07.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "camiseta-08",
        titulo: "Camiseta 08",
        imagen: "./img/camisetas/08.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    // Pantalones
    {
        id: "pantalon-01",
        titulo: "Pantalón 01",
        imagen: "./img/pantalones/01.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 1000
    },
    {
        id: "pantalon-02",
        titulo: "Pantalón 02",
        imagen: "./img/pantalones/02.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 1000
    },
    {
        id: "pantalon-03",
        titulo: "Pantalón 03",
        imagen: "./img/pantalones/03.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 1000
    },
    {
        id: "pantalon-04",
        titulo: "Pantalón 04",
        imagen: "./img/pantalones/04.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 1000
    },
    {
        id: "pantalon-05",
        titulo: "Pantalón 05",
        imagen: "./img/pantalones/05.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 1000
    }
];

const productsContainer = document.querySelector("#prods-container");
const btnCategories = document.querySelectorAll(".btn-category");
const pageTitle = document.querySelector('#pageTitle');
let addButtons = document.querySelectorAll('.add-to-cart');
const inCart = document.querySelector('#number');

function loadProducts(prodsToShow) {
    productsContainer.innerHTML="";
    prodsToShow.forEach(prod => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="prod-sample" src="${prod.imagen}" alt="${prod.titulo}">
        <div class="prod-info">
            <h3 class="prod-name">${prod.titulo}</h3>
            <p class="prod-price">$ ${prod.precio}</p>
            <button id="${prod.id}" class="add-to-cart">Add</button>
        </div>
        `;
        productsContainer.append(div);
    });
    updateButtons();
}

btnCategories.forEach(btn => {
    btn.addEventListener('click', (e)=>{
        btnCategories.forEach(buttn => buttn.classList.remove('active'));
        e.currentTarget.classList.add("active");
        if (e.currentTarget.id != "all"){
            pageTitle.innerText=`${e.currentTarget.id.toUpperCase()}`;
            loadProducts(productos.filter(prod => prod.categoria.id === e.currentTarget.id));
        }else{
            pageTitle.innerText="All Products";
            loadProducts(productos);
        }
    });
});

function updateButtons() {
    addButtons = document.querySelectorAll('.add-to-cart');
    addButtons.forEach(btn => {
        btn.addEventListener('click',addToCart);
    });
}

let cart = [];
const cartLs = JSON.parse(localStorage.getItem('cart'));
if (cartLs) {
    cart = cartLs;
    updateInCart();
}

function addToCart(e) {
    const toAdd = e.currentTarget.id;
    const product = productos.find(prod => prod.id === toAdd);
    if (cart.some(prod => prod.id === toAdd)){
        cart[cart.findIndex(prod => prod.id === toAdd)].cantidad++;
    }else{
        product.cantidad = 1;
        cart.push(product);
    }
    updateInCart();
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateInCart() {
    inCart.innerText = cart.reduce((acc,prod) => acc+prod.cantidad, 0);
}
loadProducts(productos);