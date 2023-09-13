const cart = JSON.parse(localStorage.getItem('cart'));

const emptyMsg = document.querySelector("#emptyMsg");
const cartProds = document.querySelector("#cartProds");
const cartActions = document.querySelector("#cartActions");
const purchasedMsg = document.querySelector("#purchasedMsg");
let delBtns = document.querySelector(".cart-prod-delete");
const clearCart = document.querySelector("#clear-cart");
const totalText = document.querySelector("#total");
const purchase = document.querySelector("#purchase");

function loadProducts() {
    cartProds.innerHTML = "";

    if (cart && cart.length > 0) {
        emptyMsg.classList.add('disabled');
        cartProds.classList.remove('disabled');
        cartActions.classList.remove('disabled');
        emptyMsg.classList.add('disabled');
        cart.forEach(prod => {
            const div = document.createElement('div');
            div.classList.add('cart-prod');
            div.innerHTML = `
        <img class="cart-prod-sample" src="${prod.imagen}" alt="${prod.titulo}" />
        <div class="cart-prod-name">
          <small>Product Name</small>
          <h3>${prod.titulo}</h3>
        </div>
        <div class="cart-prod-q">
          <small>Quatnity</small>
          <p>${prod.cantidad}</p>
        </div>
        <div class="cart-prod-price">
          <small>Price</small>
          <p>$ ${prod.precio}</p>
        </div>
        <div class="cart-prod-sub">
          <small>Subtotal</small>
          <p>$ ${prod.precio * prod.cantidad}</p>
        </div>
        <button id="${prod.id}" class="cart-prod-delete">
          <i class="bi bi-x-square-fill"></i>
        </button>`;
            cartProds.append(div);
        });
    } else {
        emptyMsg.classList.remove("disabled");
        cartProds.classList.add('disabled');
        cartActions.classList.add('disabled');
        purchasedMsg.classList.add('disabled');
    }
    updateButtons();
    total();
}

loadProducts();

function updateButtons() {
    delBtns = document.querySelectorAll('.cart-prod-delete');
    delBtns.forEach(btn => {
        btn.addEventListener('click', delFromCart);
    });
}

function delFromCart(e) {
    const toDel = e.currentTarget.id;
    cart.splice(cart.findIndex(prod => prod.id === toDel),1);
    localStorage.setItem("cart",JSON.stringify(cart))
    loadProducts();
}

function clear() {
    cart.length = 0;
    localStorage.setItem("cart", JSON.stringify(cart));
    loadProducts();
}
clearCart.addEventListener('click', clear);

function total() {
    totalText.innerText=`$ ${cart.reduce((acc, prod) => acc + (prod.cantidad * prod.precio),0)}`;
}

function purchased() {
    cart.length = 0;
    localStorage.setItem("cart", JSON.stringify(cart));
    emptyMsg.classList.add("disabled");
    cartProds.classList.add('disabled');
    cartActions.classList.add('disabled');
    purchasedMsg.classList.remove('disabled');
}
purchase.addEventListener("click", purchased);