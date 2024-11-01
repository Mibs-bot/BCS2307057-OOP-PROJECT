let allProducts = [];  // To store fetched data for filtering

function buttonClicked() {
    const brand = document.getElementById('beauty_input').value;
    if (brand) {
        localStorage.setItem('searchedBrand', brand);
        window.location.href = 'Product.html';
    } else {
        alert("Please enter a brand to search.");
    }
}

// Fetch and display makeup products
async function fetchMakeupData() {
    try {
        const response = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json');
        if (!response.ok) throw new Error('Network response was not ok');

        allProducts = await response.json();  // Store all data
        displayProducts(allProducts);  // Initial display of products
    } catch (error) {
        document.getElementById('data').innerText = `Error: ${error.message}`;
    }
}

// Display products based on data
function displayProducts(products) {
    const display = products.slice(0, 16).map(product => `
        <div class="product-card">
            <img src="${product.image_link || 'placeholder.jpg'}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Brand: ${product.brand || "N/A"}</p>
            <p>Price: $${product.price || "N/A"}</p>
            <button onclick="addToWishlist('${product.id}' ,'${product.image_link}' ,'${product.name}', '${product.brand}',  '${product.price}')">Add to Wishlist</button>
        </div>
    `).join('');
    document.getElementById('data').innerHTML = display;
}

function addToWishlist(id, image, name, brand, price) {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    const product = {
        id,
        name,
        brand,
        image,
        price
    };

    // Check if the product is already in the wishlist
    if (!wishlist.some(item => item.id === id)) {
        wishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        alert(`${name} has been added to your wishlist.`);
    } else {
        alert(`${name} is already in your wishlist.`);
    }
}

// Apply brand and price filters
function applyFilters() {
    const brand = document.getElementById('brandFilter').value;
    const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;

    const filteredProducts = allProducts.filter(product => {
        const productPrice = parseFloat(product.price) || 0;
        return (brand === "" || product.brand === brand) &&
               productPrice >= minPrice &&
               productPrice <= maxPrice;
    });

    displayProducts(filteredProducts);
}

window.onload = fetchMakeupData;
