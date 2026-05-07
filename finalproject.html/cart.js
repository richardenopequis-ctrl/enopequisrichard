import { product } from "./data.js"; {

  if (!cart[id]) {
    cart[id] = { ...item, qty: 1 };
  } else {
    cart[id].qty++;
  }

  renderCart();
};

window.removeItem = function(id) {
  delete cart[id];
  renderCart();
};

window.decrease = function(id) {
  if (cart[id]) {
    cart[id].qty--;
    if (cart[id].qty <= 0) delete cart[id];
  }
  renderCart();
};

function renderCart() {
  let html = "";
  let total = 0;

  Object.values(cart).forEach(item => {
    total += item.price * item.qty;

    html += `
      <div class="cart-item">
        <span>${item.productName} x${item.qty}</span>
        <div>
          <button onclick="decrease(${item.id})">-</button>
          <button onclick="addToCart(${item.id})">+</button>
          <button onclick="removeItem(${item.id})">x</button>
        </div>
      </div>
    `;
  });

  document.getElementById("cart-items").innerHTML = html;
  document.getElementById("total").innerText = "Total: ₱" + total;
}

// checkout
const checkoutBtn = document.getElementById("checkout-btn");
checkoutBtn.addEventListener("click", () => {
  if (Object.keys(cart).length === 0) {
    alert("Cart is empty!");
    return;
  }

  alert("Checkout successful! Total: ₱" +
    Object.values(cart).reduce((a,b)=>a+b.price*b.qty,0)
  );

  cart = {};
  renderCart();
});