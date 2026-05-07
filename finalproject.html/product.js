import { product } from "./data.js";

let cart = [];

function renderCart() {
  document.getElementById("cart-quantity").innerText =
    "Cart: " + cart.length;
}

function showCart() {
  let cartHTML = "";

  cart.forEach((item, index) => {
    cartHTML += `
      <div class="cart-item">
        <span>${item.productName}</span>
        <span>₱${item.price}</span>

        <button onclick="removeItem(${index})">
          Remove
        </button>
      </div>
    `;
  });

  let box = document.getElementById("cart-box");

  if (!box) {
    box = document.createElement("div");
    box.id = "cart-box";
    document.body.appendChild(box);
  }

  box.innerHTML = cartHTML;
}

let html = "";

product.forEach((item) => {
  html += `
    <div class="product-container">
      <img src="${item.image}">
      <p class="product-name">${item.productName}</p>
      <p>₱${item.price}</p>

      <button class="add-button" data-id="${item.id}">
        Add to Cart
      </button>
    </div>
  `;
});

document.getElementById("product-parent").innerHTML = html;

document.querySelectorAll(".add-button").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const id = Number(e.target.dataset.id);

    const item = product.find(p => p.id === id);

    cart.push(item);

    renderCart();
    showCart();
  });
});