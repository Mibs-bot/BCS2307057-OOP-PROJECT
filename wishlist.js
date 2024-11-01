function buttonClicked() {
    const brand = document.getElementById('beauty_input').value;
    if (brand) {
        localStorage.setItem('searchedBrand', brand);
        window.location.href = 'Product.html';
    } else {
        alert("Please enter a brand to search.");
    }
}

function displayWishlist() {
    const wishlistContainer = document.getElementById('wishlistContainer');
    wishlistContainer.innerHTML = ''; // Clear current content

    const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];

    wishlistItems.forEach((product, index) => {
        const wishlistBox = document.createElement('div');
        wishlistBox.className = 'wishlist-box';
        wishlistBox.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p><strong>Brand:</strong> ${product.brand}</p>
            <p><strong>Price:</strong> $${product.price}</p>
            <textarea class="note-textarea" placeholder="Add a note...">${product.note || ''}</textarea>
            <button class="save-note-btn" onclick="saveNoteForWishlist(${index})">Save Note</button>
            <button class="delete-btn" onclick="removeFromWishlist(${index})">Delete</button>
        `;
        wishlistContainer.appendChild(wishlistBox);
    });
}

function saveNoteForWishlist(index) {
    const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
    const noteText = document.getElementsByClassName('note-textarea')[index].value;

    // Update the note for the product
    wishlistItems[index].note = noteText;
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));

    alert("Note saved successfully!");
}

function removeFromWishlist(index) {
    const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlistItems.splice(index, 1); // Remove the item at the specified index
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    displayWishlist(); // Refresh the wishlist display
}

// Call this function to load the wishlist when the page loads
window.onload = displayWishlist;
