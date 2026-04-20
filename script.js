let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count on pages with #count
function updateCartCount() {
  const countSpans = document.querySelectorAll("#count");
  countSpans.forEach(span => {
    span.textContent = cart.length;
  });
}

// Add to cart function
function addToCart(name, price) {
  cart.push({ name, price: parseFloat(price) });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  
  // Smooth notification
  let notification = document.createElement("div");
  notification.style.cssText = "position:fixed;top:20px;right:20px;background:green;color:white;padding:10px;border-radius:5px;transform:translateX(400px);transition:transform 0.3s;z-index:1000;";
  notification.textContent = `${name} ajouté au panier!`;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 10);
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Remove item (for panier)
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  displayCart();
}

// Display cart (for panier page)
function displayCart() {
  const panierList = document.getElementById("panierList");
  const totalSpan = document.getElementById("total");
  if (!panierList || !totalSpan) return;

  panierList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const div = document.createElement("div");
    div.classList.add("item");

    div.innerHTML = `
      <p>${item.name} - ${item.price} DH</p>
      <button onclick="removeItem(${index})">❌ Supprimer</button>
    `;

    panierList.appendChild(div);
  });

  totalSpan.textContent = total.toFixed(2) + " DH";
}

// Event listeners (delegation for dynamic buttons)
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("acheter") || e.target.classList.contains("add")) {
    const name = e.target.dataset.name || e.target.closest(".card, .product-item")?.querySelector("h3")?.textContent || "Produit";
    const price = e.target.dataset.price || e.target.closest(".card, .product-item")?.querySelector("p, .price")?.textContent.match(/(\\d+)/)?.[0] || 0;
    addToCart(name, price);
  }
});

// Init on load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  if (document.getElementById("panierList")) {
    displayCart();
  }
});
