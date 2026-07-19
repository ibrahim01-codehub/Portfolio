console.log("JavaScript is connected!");


const ORDER_EMAIL = "ibrahim.candoit@gmail.com";
const BAKERY_NAME = "Butter Treat";
const PRODUCTS = [
    // ---- Cakes ----
    { id: "cake-belgian", name: "Belgian Chocolate Truffle", unit: "2lb", category: "cakes",
      price: 2600, note: "Dark Belgian ganache between rich cocoa sponge layers.",
      img: "images/cakes/belgian-chocolate.jpg" },
    { id: "cake-lotus", name: "Lotus Biscoff Cake", unit: "2lb", category: "cakes",
      price: 3100, note: "Caramelised biscuit cream folded through vanilla sponge.",
      img: "images/cakes/lotus-biscoff.jpg" },
    { id: "cake-pistachio", name: "Pistachio Rose Cake", unit: "2lb", category: "cakes",
      price: 3400, note: "Ground pistachio sponge, rosewater cream, crushed nuts.",
      img: "images/cakes/pistachio-rose.jpg" },
    { id: "cake-redvelvet", name: "Classic Red Velvet", unit: "2lb", category: "cakes",
      price: 2400, note: "Cocoa sponge, cream cheese frosting, a hint of vanilla.",
      img: "images/cakes/red-velvet.jpg" },
    { id: "cake-threemilk", name: "Three Milk Cake", unit: "2lb", category: "cakes",
      price: 2900, note: "Soaked sponge, whipped cream, condensed milk glaze.",
      img: "images/cakes/three-milk.jpg" },

    // ---- Cupcakes ----
    { id: "cup-nutella", name: "Nutella Swirl Cupcake", unit: "each", category: "cupcakes",
      price: 280, note: "Chocolate sponge topped with a hazelnut swirl.",
      img: "images/cupcakes/nutella-swirl.jpg" },
    { id: "cup-redvelvet", name: "Red Velvet Cupcake", unit: "each", category: "cupcakes",
      price: 260, note: "Cream cheese frosting on a soft cocoa base.",
      img: "images/cupcakes/red-velvet.jpg" },
    { id: "cup-caramel", name: "Salted Caramel Cupcake", unit: "each", category: "cupcakes",
      price: 300, note: "Caramel-filled centre, sea salt on top.",
      img: "images/cupcakes/salted-caramel.jpg" },

    // ---- Brownies & Cookies ----
    { id: "bro-walnut", name: "Fudge Walnut Brownie", unit: "each", category: "brownies-cookies",
      price: 250, note: "Dense, fudgy, loaded with toasted walnuts.",
      img: "images/brownies-cookies/fudge-walnut.jpg" },
    { id: "cookie-belgian", name: "Belgian Chocolate Chunk Cookie", unit: "each", category: "brownies-cookies",
      price: 220, note: "Soft-baked with generous chocolate chunks.",
      img: "images/brownies-cookies/choc-chunk.jpg" },
    { id: "cookie-lotus", name: "Lotus Stuffed Cookie", unit: "each", category: "brownies-cookies",
      price: 240, note: "Gooey centre stuffed with Lotus Biscoff spread.",
      img: "images/brownies-cookies/lotus-cookie.jpg" },

    // ---- Mini Donuts ----
    { id: "donut-choc", name: "Chocolate Glazed Mini Donuts", unit: "box of 6", category: "donuts",
      price: 650, note: "Bite-sized donuts dipped in dark chocolate glaze.",
      img: "images/donuts/chocolate-glazed.jpg" },
    { id: "donut-lotus", name: "Lotus Mini Donuts", unit: "box of 6", category: "donuts",
      price: 700, note: "Topped with Lotus drizzle and biscuit crumbs.",
      img: "images/donuts/lotus.jpg" },

    // ---- Sundaes & Desserts ----
    { id: "sundae-caramel", name: "Salted Caramel Sundae", unit: "each", category: "sundaes",
      price: 550, note: "Layers of caramel, cream and toffee crunch.",
      img: "images/sundaes/salted-caramel.jpg" },
    { id: "sundae-brownie", name: "Brownie Fudge Sundae", unit: "each", category: "sundaes",
      price: 600, note: "Warm brownie chunks, fudge sauce, whipped cream.",
      img: "images/sundaes/brownie-fudge.jpg" },
    { id: "cheesecake-classic", name: "Classic Cheesecake Slice", unit: "each", category: "sundaes",
      price: 450, note: "Baked New York-style cheesecake, plain and rich.",
      img: "images/sundaes/classic-cheesecake.jpg" },
];

const CATEGORY_LABELS = {
    "cakes": "Cakes",
    "cupcakes": "Cupcakes",
    "brownies-cookies": "Brownies & Cookies",
    "donuts": "Mini Donuts",
    "sundaes": "Sundaes & Desserts"
};

let cart = [];

let productGrid = document.getElementById("product-grid");
let filterRow = document.getElementById("filter-row");

let cartOpenBtn = document.getElementById("cart-open-btn");
let cartCloseBtn = document.getElementById("cart-close-btn");
let cartDrawer = document.getElementById("cart-drawer");
let cartOverlay = document.getElementById("cart-overlay");

let cartItemsBox = document.getElementById("cart-items");
let cartEmptyMsg = document.getElementById("cart-empty");
let cartSubtotalEl = document.getElementById("cart-subtotal");
let cartCountEl = document.getElementById("cart-count");

let checkoutForm = document.getElementById("checkout-form");
let deliveryRadios = document.querySelectorAll('input[name="delivery-method"]');
let addressField = document.getElementById("address-field");


function findProduct(id) {
    return PRODUCTS.find(function (product) {
        return product.id === id;
    });
}

function formatPrice(amount) {
    return "Rs. " + amount.toLocaleString("en-PK");
}
function renderProducts() {
    let cardsHtml = "";

    PRODUCTS.forEach(function (product) {
        let initial = product.name.charAt(0);

        cardsHtml += `
            <article class="product-card" data-category="${product.category}">
                <div class="product-image">
                    <img src="${product.img}" alt="${product.name}"
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="img-fallback" style="display:none;">${initial}</div>
                </div>
                <div class="product-info">
                    <p class="product-category">${CATEGORY_LABELS[product.category]}</p>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-note">${product.note}</p>
                    <div class="product-footer">
                        <span class="product-price">${formatPrice(product.price)} <span style="color:var(--gray-light)">/ ${product.unit}</span></span>
                        <button class="add-btn" data-id="${product.id}">Add</button>
                    </div>
                </div>
            </article>
        `;
    });

    productGrid.innerHTML = cardsHtml;

    let addButtons = document.querySelectorAll(".add-btn");
    addButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            addToCart(button.dataset.id);

            // quick visual confirmation on the button itself
            button.textContent = "Added";
            button.classList.add("is-added");
            setTimeout(function () {
                button.textContent = "Add";
                button.classList.remove("is-added");
            }, 800);
        });
    });
}

filterRow.addEventListener("click", function (event) {
    if (!event.target.classList.contains("filter-btn")) return;

    let selected = event.target.dataset.filter;

    // update the active button style
    document.querySelectorAll(".filter-btn").forEach(function (btn) {
        btn.classList.remove("is-active");
    });
    event.target.classList.add("is-active");

    // show or hide each card based on its category
    document.querySelectorAll(".product-card").forEach(function (card) {
        if (selected === "all" || card.dataset.category === selected) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
});

function addToCart(id) {
    let existing = cart.find(function (item) {
        return item.id === id;
    });

    if (existing) {
        existing.qty = existing.qty + 1;
    } else {
        cart.push({ id: id, qty: 1 });
    }

    renderCart();
}

function changeQty(id, delta) {
    let item = cart.find(function (item) {
        return item.id === id;
    });

    if (!item) return;

    item.qty = item.qty + delta;

    if (item.qty <= 0) {
        removeFromCart(id);
    } else {
        renderCart();
    }
}

function removeFromCart(id) {
    cart = cart.filter(function (item) {
        return item.id !== id;
    });
    renderCart();
}

function renderCart() {
    let totalCount = 0;
    cart.forEach(function (item) { totalCount += item.qty; });
    cartCountEl.textContent = totalCount;

    if (cart.length === 0) {
        cartEmptyMsg.style.display = "block";
        cartItemsBox.innerHTML = "";
        cartSubtotalEl.textContent = formatPrice(0);
        return;
    }

    cartEmptyMsg.style.display = "none";

    let itemsHtml = "";
    let subtotal = 0;

    cart.forEach(function (item) {
        let product = findProduct(item.id);
        let lineTotal = product.price * item.qty;
        subtotal += lineTotal;

        itemsHtml += `
            <div class="cart-item">
                <div>
                    <p class="cart-item-name">${product.name}</p>
                    <p class="cart-item-price">${formatPrice(product.price)} / ${product.unit}</p>
                </div>
                <div class="qty-stepper">
                    <button type="button" data-action="decrease" data-id="${product.id}">−</button>
                    <span>${item.qty}</span>
                    <button type="button" data-action="increase" data-id="${product.id}">+</button>
                </div>
                <div class="cart-item-total">${formatPrice(lineTotal)}</div>
                <button type="button" class="cart-remove-btn" data-action="remove" data-id="${product.id}">Remove</button>
            </div>
        `;
    });

    cartItemsBox.innerHTML = itemsHtml;
    cartSubtotalEl.textContent = formatPrice(subtotal);
}

cartItemsBox.addEventListener("click", function (event) {
    let button = event.target.closest("button");
    if (!button) return;

    let id = button.dataset.id;
    let action = button.dataset.action;

    if (action === "increase") changeQty(id, 1);
    if (action === "decrease") changeQty(id, -1);
    if (action === "remove") removeFromCart(id);
});
function openCart() {
    cartDrawer.classList.add("is-open");
    cartOverlay.classList.add("is-visible");
}

function closeCart() {
    cartDrawer.classList.remove("is-open");
    cartOverlay.classList.remove("is-visible");
}

cartOpenBtn.addEventListener("click", openCart);
cartCloseBtn.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);


deliveryRadios.forEach(function (radio) {
    radio.addEventListener("change", function () {
        if (radio.value === "Delivery" && radio.checked) {
            addressField.classList.remove("hidden");
        } else if (radio.value === "Pickup" && radio.checked) {
            addressField.classList.add("hidden");
        }
    });
});


checkoutForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Your order ticket is empty — add something from the menu first.");
        return;
    }

    let name = document.getElementById("customer-name").value.trim();
    let phone = document.getElementById("customer-phone").value.trim();
    let deliveryMethod = document.querySelector('input[name="delivery-method"]:checked').value;
    let address = document.getElementById("customer-address").value.trim();
    let notes = document.getElementById("customer-notes").value.trim();

    if (name === "" || phone === "") {
        alert("Please add your name and phone number so we can confirm the order.");
        return;
    }

    let subtotal = 0;
    let orderLines = "";

    cart.forEach(function (item) {
        let product = findProduct(item.id);
        let lineTotal = product.price * item.qty;
        subtotal += lineTotal;
        orderLines += "- " + product.name + " (" + product.unit + ") x" + item.qty +
            " — " + formatPrice(lineTotal) + "\n";
    });

    let bodyLines = [
        "Hi " + BAKERY_NAME + " team,",
        "",
        "I'd like to place the following order:",
        "",
        orderLines.trim(),
        "",
        "Subtotal: " + formatPrice(subtotal),
        "",
        "Name: " + name,
        "Phone: " + phone,
        "Delivery method: " + deliveryMethod
    ];

    if (deliveryMethod === "Delivery" && address !== "") {
        bodyLines.push("Address: " + address);
    }

    if (notes !== "") {
        bodyLines.push("Notes: " + notes);
    }

    bodyLines.push("", "Thanks!");

    let subject = "New Order — " + BAKERY_NAME;
    let body = bodyLines.join("\n");

    let mailtoLink = "mailto:" + ORDER_EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

    window.location.href = mailtoLink;
});


renderProducts();
renderCart();