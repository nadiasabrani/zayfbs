let cart = JSON.parse(localStorage.getItem("cart")) || [];

const products = [
  { name: "Huile Bio Premium 1L", desc: "Lorem ipsum dolor sit amet.", price: 150, img: "./img/zit1.jpg" },
  { name: "Gaade bouteille d'oire", desc: "Lorem ipsum dolor sit amet.", price: 200, img: "./img/zit2.jpg" },
  { name: "Coffret cadeau d'huile", desc: "Lorem ipsum dolor sit amet.", price: 170, img: "./img/zit3.jpg" },
  { name: "Huile Bio Premium 1L", desc: "Lorem ipsum dolor sit amet.", price: 120, img: "./img/zit4.jpg" },
  { name: "Huile Bio Premium 1L", desc: "Lorem ipsum dolor sit amet.", price: 139, img: "./img/zit5.jpg" },
  { name: "Gaade bouteille d'oire", desc: "Lorem ipsum dolor sit amet.", price: 100, img: "./img/zit6.jpg" },
  { name: "Coffret cadeau d'huile", desc: "Lorem ipsum dolor sit amet.", price: 180, img: "./img/zit7.jpg" },
  { name: "Huile Bio Premium 1L", desc: "Lorem ipsum dolor sit amet.", price: 120, img: "./img/zit8.jpg" },
  { name: "Huile Bio Premium 1L", desc: "Lorem ipsum dolor sit amet.", price: 145, img: "./img/zit9.jpg" },
  { name: "Gaade bouteille d'oire", desc: "Lorem ipsum dolor sit amet.", price: 230, img: "./img/zit10.jpg" },
  { name: "Coffret cadeau d'huile", desc: "Lorem ipsum dolor sit amet.", price: 190, img: "./img/zit11.jpg" },
];

function renderProducts() {
  const grid = document.querySelector(".grid");
  if (!grid) return;

  grid.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.desc}</p>
      <span class="price">${product.price} DH</span>
      <a href="#" class="btn add" data-name="${product.name}" data-price="${product.price}">🛒 Ajouter</a>
      <a href="#" class="btn delete">🗑️ Supprimer</a>
    `;

    grid.appendChild(card);
  });
}

function updateCartCount() {
  const countSpans = document.querySelectorAll("#count");
  countSpans.forEach(span => {
    span.textContent = cart.length;
  });
}

function addToCart(name, price) {
  cart.push({ name, price: parseFloat(price) });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

  let notification = document.createElement("div");
  notification.style.cssText = "position:fixed;top:20px;right:20px;background:green;color:white;padding:10px;border-radius:5px;transform:translateX(400px);transition:transform 0.3s;z-index:1000;";
  notification.textContent = `${name} ajouté au panier!`;
  document.body.appendChild(notification);
  setTimeout(() => { notification.style.transform = "translateX(0)"; }, 10);
  setTimeout(() => { notification.remove(); }, 3000);
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  displayCart();
}

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

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("acheter") || e.target.classList.contains("add")) {
    const name = e.target.dataset.name || e.target.closest(".card, .product-item")?.querySelector("h3")?.textContent || "Produit";
    const price = e.target.dataset.price || e.target.closest(".card, .product-item")?.querySelector("p, .price")?.textContent.match(/(\d+)/)?.[0] || 0;
    addToCart(name, price);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderProducts();

  if (document.getElementById("panierList")) {
    displayCart();
  }

  const btnCommander = document.getElementById("commander");
  if (btnCommander) {
    btnCommander.addEventListener("click", () => {
      let panier = JSON.parse(localStorage.getItem("cart")) || [];

      if (panier.length === 0) {
        alert("Votre panier est vide !");
        return;
      }

      alert("Commande confirmée ✅");

      cart = [];
      localStorage.removeItem("cart");
      location.reload();
    });
  }
});