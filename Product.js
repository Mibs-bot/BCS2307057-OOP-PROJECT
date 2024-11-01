function buttonClicked() {
    const brand = document.getElementById('beauty_input').value;
    if (brand) {
        localStorage.setItem('searchedBrand', brand);
        window.location.href = 'Product.html';
    } else {
        alert("Please enter a brand to search.");
    }
}

async function fetchAndDisplayProducts() {
    const productContainer = document.getElementById('productContainer');
    const brand = localStorage.getItem('searchedBrand');
    localStorage.removeItem('searchedBrand');

    if (brand) {
        // Fetch data using the searched brand
        fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                if (data.length === 0) {
                    productContainer.innerHTML = `<p>No products found for this brand.</p>`;
                    return;
                }

                // Display products
                data.forEach(product => {
                    const productBox = document.createElement('div');
                    productBox.className = 'product-box';
                    productBox.innerHTML = `
                        <img src="${product.image_link || 'placeholder.jpg'}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p><strong>Brand:</strong> ${product.brand}</p>
                        <p><strong>Price:</strong> $${product.price || 'N/A'}</p>
                        <p><strong>Description:</strong> ${product.description || 'No description available'}</p>
                        <p><strong>Rating:</strong> ${product.rating || 'No rating'}</p>
                        <p><strong>Product Type:</strong> ${product.product_type || 'N/A'}</p>
                        <p><a href="${product.website_link}" target="_blank">Visit Brand Website</a></p>
                        <p><a href="${product.product_link}" target="_blank">View Product</a></p>
                        <button onclick="addToWishlist('${product.id}' ,'${product.image_link}' ,'${product.name}', '${product.brand}',  '${product.price}')">Add to Wishlist</button>
                    `;
                    productContainer.appendChild(productBox);
                });
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
                productContainer.innerHTML = `<p>Error fetching data. Please try again.</p>`;
            });
    } else {
        productContainer.innerHTML = `<p>No brand searched. Please search for a brand.</p>`;
    }
}

function addToWishlist(id, image, name, brand, price) {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    const product = {
        id,
        image,
        name,
        brand,
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


// Call the function when the page loads
window.onload = fetchAndDisplayProducts;
