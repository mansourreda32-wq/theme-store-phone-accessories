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
const cartButton = document.querySelector(".cart-btn");
const categoryFilters = document.getElementById("category-filters");
const searchInput = document.getElementById("product-search");
const newsletterForm = document.querySelector(".newsletter");

let cartItems = 0;
let selectedCategory = "All";

function showToast(message) {
  let toast = document.getElementById("store-toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "store-toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("visible");

  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove("visible");
  }, 1800);
}

function getFilteredProducts() {
  const query = searchInput ? searchInput.value.trim().toLowerCase() : "";

  return products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const searchTarget = `${product.name} ${product.category}`.toLowerCase();
    const matchesSearch = !query || searchTarget.includes(query);

    return matchesCategory && matchesSearch;
  });
}

function renderFilters() {
  if (!categoryFilters) return;

  const categories = ["All", ...new Set(products.map((product) => product.category))];

  categoryFilters.innerHTML = categories
    .map(
      (category) => `
        <button
          type="button"
          class="filter-chip ${selectedCategory === category ? "active" : ""}"
          data-category="${category}"
          aria-pressed="${selectedCategory === category}"
        >
          ${category}
        </button>
      `
    )
    .join("");

  categoryFilters.querySelectorAll(".filter-chip").forEach((button) => {
    button.addEventListener("click", () => {
      selectedCategory = button.dataset.category;
      renderFilters();
      renderProducts();
    });
  });
}

function renderProducts() {
  if (!productGrid) return;

  const filteredProducts = getFilteredProducts();

  if (!filteredProducts.length) {
    productGrid.innerHTML = `
      <div class="empty-state">
        <h3>No accessories match your search.</h3>
        <p>Try a different keyword or switch to another category.</p>
      </div>
    `;
    return;
  }

  productGrid.innerHTML = filteredProducts
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
              <button class="add-btn" data-id="${product.id}" type="button">Add</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  document.querySelectorAll(".add-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = Number(button.dataset.id);
      const itemName = products.find((product) => product.id === productId)?.name || "Item";

      cartItems += 1;
      if (cartCount) cartCount.textContent = String(cartItems);

      button.textContent = "Added";
      button.disabled = true;

      setTimeout(() => {
        button.textContent = "Add";
        button.disabled = false;
      }, 900);

      showToast(`${itemName} added to cart.`);
    });
  });
}

if (searchInput) {
  searchInput.addEventListener("input", renderProducts);
}

if (cartButton) {
  cartButton.addEventListener("click", () => {
    const message = cartItems === 0
      ? "Your cart is empty. Add a few favorites to get started."
      : `You have ${cartItems} item${cartItems === 1 ? "" : "s"} in your cart.`;

    showToast(message);
  });
}

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const emailInput = newsletterForm.querySelector("input[type='email']");
    const email = emailInput ? emailInput.value.trim() : "";

    if (!email || !email.includes("@")) {
      showToast("Please enter a valid email address.");
      return;
    }

    newsletterForm.reset();
    showToast("Thanks! You're on the list for future deals.");
  });
}

if (cartCount) cartCount.textContent = String(cartItems);
renderFilters();
renderProducts();
