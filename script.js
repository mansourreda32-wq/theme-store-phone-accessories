const products = [
  {
    id: 1,
    name: "AeroShield Case",
    category: "Phone case",
    price: 29,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "VoltMax Charger",
    category: "Fast charge",
    price: 39,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "EchoPods Pro",
    category: "Wireless audio",
    price: 79,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "FlexGrip Mount",
    category: "Car accessory",
    price: 24,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    name: "MagSafe Stand",
    category: "Desk setup",
    price: 45,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    name: "ClearView Glass",
    category: "Screen protector",
    price: 18,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=80",
  },
];

const productGrid = document.getElementById("product-grid");
const cartCount = document.getElementById("cart-count");

let cartItems = 0;

function renderProducts() {
  productGrid.innerHTML = products
    .map(
      (product) => `
        <article class="product-card" aria-label="${product.name}">
          <img src="${product.image}" alt="${product.name}" />
          <div class="product-info">
            <div class="product-meta">
              <span>${product.category}</span>
              <span class="rating">★ ${product.rating}</span>
            </div>
            <h3>${product.name}</h3>
            <div class="price-row">
              <span class="price">$${product.price}</span>
              <button class="add-btn" data-id="${product.id}">Add</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  document.querySelectorAll(".add-btn").forEach((button) => {
    button.addEventListener("click", () => {
      cartItems += 1;
      cartCount.textContent = cartItems;

      const itemName = products.find((product) => product.id === Number(button.dataset.id))?.name || "Item";
      button.textContent = "Added";
      button.disabled = true;

      setTimeout(() => {
        button.textContent = "Add";
        button.disabled = false;
      }, 900);

      alert(`${itemName} added to cart.`);
    });
  });
}

renderProducts();

const cartButton = document.querySelector(".cart-btn");
cartButton.addEventListener("click", () => {
  alert(`You have ${cartItems} item(s) in your cart.`);
});
