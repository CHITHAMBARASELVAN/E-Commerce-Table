// Product Data
const products = [
    {
        image: "images/smartphone.jpg",
        name: "Smartphone",
        price: 799,
        rating: 4.5,
        category: "electronics"
    },
    {
        image: "images/tshirt.jpg",
        name: "T-shirt",
        price: 250,
        rating: 3.8,
        category: "apparel"
    },
    {
        image: "images/laptop.jpg",
        name: "Laptop",
        price: 1200,
        rating: 4.9,
        category: "electronics"
    },
    {
        image: "images/coffee-machine.jpg",
        name: "Coffee Maker",
        price: 199,
        rating: 4.2,
        category: "home"
    },
    {
        image: "images/washing1.jpg",
        name: "Washing Machine",
        price: 550,
        rating: 4.0,
        category: "home"
    },
    {
        image: "images/jacket.jpg",
        name: "Jacket",
        price: 390,
        rating: 3.0,
        category: "apparel"
    },
    {
        image: "images/headphone.jpg",
        name: "Headphone",
        price: 200,
        rating: 4.0,
        category: "electronics"
    },
    {
        image: "images/shoe.jpg",
        name: "Running Shoes",
        price: 50,
        rating: 4.0,
        category: "apparel"
    },
    {
        image: "images/watch.jpg",
        name: "Smart Watch",
        price: 70,
        rating: 4.0,
        category: "electronics"
    },
    // Add more products (total 20 for example)
];

// DOM Elements
const productTable = document.querySelector("#product-table tbody");
const searchInput = document.querySelector("#search");
const priceRange = document.querySelector("#price-range");
const priceValue = document.querySelector("#price-value");
const categoryFilter = document.querySelector("#category");
const sortFilter = document.querySelector("#sort");

// Utility: Generate star rating HTML
const getStarRating = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    let starsHTML = "";

    // Full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += "&#9733;"; // Unicode for filled star
    }

    // Half star
    if (halfStar) {
        starsHTML += "&#9734;"; // Unicode for half-filled star
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += "&#9734;"; // Unicode for empty star
    }

    return `<span class="stars">${starsHTML}</span>`;
};

// Render Products in Table
const renderProducts = (filteredProducts) => {
    productTable.innerHTML = "";
    if (filteredProducts.length === 0) {
        productTable.innerHTML = "<tr><td colspan='5'>No products found</td></tr>";
        return;
    }

    filteredProducts.forEach(product => {
        const starRating = getStarRating(product.rating);

        const row = `
            <tr>
                <td><img src="${product.image}" alt="${product.name}"></td>
                <td>${product.name}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${starRating} <span class="rating-number">(${product.rating.toFixed(1)})</span></td>
                <td>${product.category}</td>
            </tr>
        `;
        productTable.insertAdjacentHTML("beforeend", row);
    });
};

// Filter and Sort Products
const filterAndSortProducts = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const maxPrice = Number(priceRange.value);
    const selectedCategory = categoryFilter.value;
    const sortBy = sortFilter.value;

    // Filter
    let filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) &&
        product.price <= maxPrice &&
        (selectedCategory === "" || product.category === selectedCategory)
    );

    // Sort
    switch (sortBy) {
        case "price-asc":
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case "price-desc":
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case "rating-asc":
            filteredProducts.sort((a, b) => a.rating - b.rating);
            break;
        case "rating-desc":
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
    }

    renderProducts(filteredProducts);
};

// Event Listeners
searchInput.addEventListener("input", filterAndSortProducts);
priceRange.addEventListener("input", () => {
    priceValue.textContent = `$0 - $${priceRange.value}`;
    filterAndSortProducts();
});
categoryFilter.addEventListener("change", filterAndSortProducts);
sortFilter.addEventListener("change", filterAndSortProducts);

// Initial Render
priceValue.textContent = `$0 - $${priceRange.max}`;
renderProducts(products);
