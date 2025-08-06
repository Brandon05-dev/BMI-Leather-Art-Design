// ===== PRODUCT DETAIL FUNCTIONALITY =====

// Sample product data (in a real app, this would come from an API)
const sampleProducts = {
    1: {
        id: 1,
        name: "Premium Leather Handbag",
        price: 15500,
        originalPrice: 18000,
        category: "bags",
        images: ["img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg"],
        description: "Elegant handcrafted leather handbag made from premium full-grain leather. Perfect for both casual and formal occasions.",
        detailedDescription: `
            <p>This exquisite handbag represents the pinnacle of our craftsmanship. Each piece is meticulously handcrafted by our skilled artisans using traditional techniques passed down through generations.</p>
            <ul>
                <li>Made from premium full-grain leather</li>
                <li>Hand-stitched with durable waxed thread</li>
                <li>Multiple compartments for organization</li>
                <li>Adjustable leather shoulder strap</li>
                <li>Antique brass hardware</li>
                <li>Soft fabric lining with interior pockets</li>
            </ul>
            <p>The natural characteristics of the leather will develop a beautiful patina over time, making each bag unique to its owner.</p>
        `,
        specifications: {
            "Material": "Full-Grain Leather",
            "Dimensions": "35cm x 25cm x 12cm",
            "Weight": "800g",
            "Strap Drop": "Adjustable 20-25cm",
            "Hardware": "Antique Brass",
            "Lining": "Cotton Canvas",
            "Care": "Leather conditioner recommended"
        },
        colors: ["Brown", "Black", "Tan"],
        sizes: [],
        badges: ["Premium", "Bestseller"],
        rating: 4.8,
        reviewCount: 24,
        inStock: true,
        stockQuantity: 5
    },
    2: {
        id: 2,
        name: "Handcrafted Leather Belt",
        price: 4500,
        originalPrice: null,
        category: "belts",
        images: ["img/5.jpg", "img/6.jpg", "img/7.jpg"],
        description: "Classic leather belt with antique brass buckle. Available in multiple sizes.",
        detailedDescription: `
            <p>Our signature leather belt combines functionality with timeless style. Crafted from a single piece of premium leather, this belt will age beautifully and last for years.</p>
            <ul>
                <li>Single piece construction</li>
                <li>Vegetable-tanned leather</li>
                <li>Antique brass buckle</li>
                <li>Available in multiple sizes</li>
                <li>1.5 inch width</li>
            </ul>
        `,
        specifications: {
            "Material": "Vegetable-Tanned Leather",
            "Width": "1.5 inches (3.8cm)",
            "Thickness": "4mm",
            "Buckle": "Antique Brass",
            "Available Sizes": "30-44 inches",
            "Care": "Wipe with damp cloth"
        },
        colors: ["Brown", "Black"],
        sizes: ["30", "32", "34", "36", "38", "40", "42", "44"],
        badges: ["Handcrafted"],
        rating: 4.9,
        reviewCount: 31,
        inStock: true,
        stockQuantity: 12
    }
};

// Sample reviews data
const sampleReviews = [
    {
        id: 1,
        author: "Sarah M.",
        rating: 5,
        date: "2024-12-15",
        title: "Absolutely Beautiful!",
        content: "This handbag exceeded my expectations. The quality is outstanding and the craftsmanship is evident in every detail. I've received so many compliments!"
    },
    {
        id: 2,
        author: "Michael K.",
        rating: 5,
        date: "2024-12-10",
        title: "Premium Quality",
        content: "Worth every penny. The leather feels amazing and the bag is very well constructed. Great customer service too!"
    },
    {
        id: 3,
        author: "Emma J.",
        rating: 4,
        date: "2024-12-05",
        title: "Love it!",
        content: "Beautiful bag with excellent attention to detail. The only minor issue is that it's a bit heavier than expected, but the quality makes up for it."
    }
];

// Get product ID from URL parameters
function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id')) || 1;
}

// Current product data
let currentProduct = null;
let selectedColor = null;
let selectedSize = null;

// Initialize product detail page
document.addEventListener('DOMContentLoaded', function() {
    const productId = getProductIdFromURL();
    loadProduct(productId);
    setupEventListeners();
    setupTabs();
    loadRelatedProducts();
});

// Load product data
function loadProduct(productId) {
    currentProduct = sampleProducts[productId];
    
    if (!currentProduct) {
        showNotification('Product not found', 'error');
        return;
    }
    
    // Update page content
    updateProductImages();
    updateProductInfo();
    updateProductOptions();
    updateProductTabs();
    updateBreadcrumb();
}

// Update product images
function updateProductImages() {
    const mainImage = document.getElementById('mainProductImage');
    const thumbnailContainer = document.getElementById('thumbnailImages');
    const productBadges = document.getElementById('productBadges');
    
    // Set main image
    mainImage.src = currentProduct.images[0];
    mainImage.alt = currentProduct.name;
    
    // Create thumbnails
    thumbnailContainer.innerHTML = currentProduct.images.map((image, index) => `
        <img src="${image}" alt="${currentProduct.name} ${index + 1}" 
             class="thumbnail ${index === 0 ? 'active' : ''}" 
             data-index="${index}">
    `).join('');
    
    // Add click events to thumbnails
    thumbnailContainer.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            mainImage.src = currentProduct.images[index];
            
            // Update active thumbnail
            thumbnailContainer.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Update badges
    if (currentProduct.badges && currentProduct.badges.length > 0) {
        productBadges.innerHTML = currentProduct.badges.map(badge => `
            <span class="product-badge badge-${badge.toLowerCase()}">${badge}</span>
        `).join('');
    }
}

// Update product information
function updateProductInfo() {
    document.getElementById('productTitle').textContent = currentProduct.name;
    document.getElementById('currentPrice').textContent = `KES ${currentProduct.price.toLocaleString()}`;
    document.getElementById('productDescription').textContent = currentProduct.description;
    
    // Update pricing
    const originalPriceElement = document.getElementById('originalPrice');
    const discountBadge = document.getElementById('discountBadge');
    
    if (currentProduct.originalPrice && currentProduct.originalPrice > currentProduct.price) {
        originalPriceElement.textContent = `KES ${currentProduct.originalPrice.toLocaleString()}`;
        originalPriceElement.style.display = 'inline';
        
        const discount = Math.round(((currentProduct.originalPrice - currentProduct.price) / currentProduct.originalPrice) * 100);
        discountBadge.textContent = `${discount}% OFF`;
        discountBadge.style.display = 'inline';
    }
    
    // Update rating
    updateRatingDisplay(currentProduct.rating, currentProduct.reviewCount);
    
    // Update stock status
    updateStockStatus();
}

// Update rating display
function updateRatingDisplay(rating, reviewCount) {
    const starsContainer = document.getElementById('productStars');
    const ratingText = document.getElementById('ratingText');
    
    // Clear existing stars
    starsContainer.innerHTML = '';
    
    // Add stars
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('i');
        if (i <= Math.floor(rating)) {
            star.className = 'fas fa-star';
        } else if (i - 0.5 <= rating) {
            star.className = 'fas fa-star-half-alt';
        } else {
            star.className = 'far fa-star';
        }
        starsContainer.appendChild(star);
    }
    
    ratingText.textContent = `(${rating}) ${reviewCount} reviews`;
}

// Update product options
function updateProductOptions() {
    const colorOptions = document.getElementById('colorOptions');
    const sizeOptions = document.getElementById('sizeOptions');
    
    // Colors
    if (currentProduct.colors && currentProduct.colors.length > 0) {
        colorOptions.style.display = 'block';
        const colorContainer = colorOptions.querySelector('.color-options');
        colorContainer.innerHTML = currentProduct.colors.map(color => `
            <button class="color-option" data-color="${color}" title="${color}">
                <span class="color-swatch color-${color.toLowerCase()}"></span>
                <span class="color-name">${color}</span>
            </button>
        `).join('');
        
        // Add click events
        colorContainer.querySelectorAll('.color-option').forEach(option => {
            option.addEventListener('click', function() {
                selectedColor = this.dataset.color;
                colorContainer.querySelectorAll('.color-option').forEach(o => o.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
        
        // Select first color by default
        colorContainer.querySelector('.color-option').click();
    }
    
    // Sizes
    if (currentProduct.sizes && currentProduct.sizes.length > 0) {
        sizeOptions.style.display = 'block';
        const sizeContainer = sizeOptions.querySelector('.size-options');
        sizeContainer.innerHTML = currentProduct.sizes.map(size => `
            <button class="size-option" data-size="${size}">${size}</button>
        `).join('');
        
        // Add click events
        sizeContainer.querySelectorAll('.size-option').forEach(option => {
            option.addEventListener('click', function() {
                selectedSize = this.dataset.size;
                sizeContainer.querySelectorAll('.size-option').forEach(o => o.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    }
}

// Update stock status
function updateStockStatus() {
    const addToCartBtn = document.getElementById('addToCartBtn');
    const buyNowBtn = document.getElementById('buyNowBtn');
    
    if (!currentProduct.inStock || currentProduct.stockQuantity === 0) {
        addToCartBtn.disabled = true;
        addToCartBtn.innerHTML = '<i class="fas fa-times"></i> Out of Stock';
        buyNowBtn.disabled = true;
        buyNowBtn.textContent = 'Out of Stock';
    } else if (currentProduct.stockQuantity < 5) {
        // Show low stock warning
        const stockWarning = document.createElement('div');
        stockWarning.className = 'stock-warning';
        stockWarning.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Only ${currentProduct.stockQuantity} left in stock!`;
        
        const productActions = document.querySelector('.product-actions');
        productActions.insertBefore(stockWarning, productActions.firstChild);
    }
}

// Update product tabs
function updateProductTabs() {
    // Update detailed description
    document.getElementById('detailedDescription').innerHTML = `
        <h3>Product Details</h3>
        ${currentProduct.detailedDescription}
    `;
    
    // Update specifications
    const specsTable = document.getElementById('specificationsTable');
    specsTable.innerHTML = `
        <h3>Product Specifications</h3>
        <table class="specs-table">
            ${Object.entries(currentProduct.specifications).map(([key, value]) => `
                <tr>
                    <td class="spec-label">${key}:</td>
                    <td class="spec-value">${value}</td>
                </tr>
            `).join('')}
        </table>
    `;
    
    // Update reviews
    updateReviewsTab();
}

// Update reviews tab
function updateReviewsTab() {
    const reviewsContainer = document.getElementById('individualReviews');
    
    reviewsContainer.innerHTML = sampleReviews.map(review => `
        <div class="review-item">
            <div class="review-header">
                <div class="reviewer-info">
                    <span class="reviewer-name">${review.author}</span>
                    <span class="review-date">${new Date(review.date).toLocaleDateString()}</span>
                </div>
                <div class="review-rating">
                    ${Array.from({length: 5}, (_, i) => 
                        `<i class="fas fa-star ${i < review.rating ? 'active' : ''}"></i>`
                    ).join('')}
                </div>
            </div>
            <h4 class="review-title">${review.title}</h4>
            <p class="review-content">${review.content}</p>
        </div>
    `).join('');
}

// Update breadcrumb
function updateBreadcrumb() {
    document.getElementById('productBreadcrumb').textContent = currentProduct.name;
}

// Setup event listeners
function setupEventListeners() {
    // Quantity selectors
    const decreaseQty = document.getElementById('decreaseQty');
    const increaseQty = document.getElementById('increaseQty');
    const quantityInput = document.getElementById('quantity');
    
    decreaseQty.addEventListener('click', function() {
        const currentQty = parseInt(quantityInput.value);
        if (currentQty > 1) {
            quantityInput.value = currentQty - 1;
        }
    });
    
    increaseQty.addEventListener('click', function() {
        const currentQty = parseInt(quantityInput.value);
        const maxQty = Math.min(10, currentProduct.stockQuantity);
        if (currentQty < maxQty) {
            quantityInput.value = currentQty + 1;
        }
    });
    
    // Add to cart
    const addToCartBtn = document.getElementById('addToCartBtn');
    addToCartBtn.addEventListener('click', function() {
        addToCart();
    });
    
    // Add to wishlist
    const addToWishlistBtn = document.getElementById('addToWishlistBtn');
    addToWishlistBtn.addEventListener('click', function() {
        addToWishlist();
    });
    
    // Buy now
    const buyNowBtn = document.getElementById('buyNowBtn');
    buyNowBtn.addEventListener('click', function() {
        buyNow();
    });
    
    // Image zoom
    const mainImage = document.getElementById('mainProductImage');
    const imageZoomModal = document.getElementById('imageZoomModal');
    const zoomImage = document.getElementById('zoomImage');
    
    mainImage.addEventListener('click', function() {
        zoomImage.src = this.src;
        imageZoomModal.style.display = 'flex';
    });
    
    // Close zoom modal
    const zoomClose = document.querySelector('.zoom-close');
    zoomClose.addEventListener('click', function() {
        imageZoomModal.style.display = 'none';
    });
    
    imageZoomModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
        }
    });
}

// Setup tabs functionality
function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Remove active class from all tabs and panels
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Add to cart functionality
function addToCart() {
    if (!currentProduct.inStock) {
        showNotification('This item is out of stock', 'error');
        return;
    }
    
    const quantity = parseInt(document.getElementById('quantity').value);
    
    // Validate selections
    if (currentProduct.sizes && currentProduct.sizes.length > 0 && !selectedSize) {
        showNotification('Please select a size', 'warning');
        return;
    }
    
    if (currentProduct.colors && currentProduct.colors.length > 0 && !selectedColor) {
        showNotification('Please select a color', 'warning');
        return;
    }
    
    // Create cart item
    const cartItem = {
        id: currentProduct.id,
        name: currentProduct.name,
        price: currentProduct.price,
        image: currentProduct.images[0],
        category: currentProduct.category,
        quantity: quantity,
        color: selectedColor,
        size: selectedSize
    };
    
    // Add to cart using the global cart object
    if (window.cart) {
        window.cart.addItem(cartItem);
        showNotification(`${currentProduct.name} added to cart!`, 'success');
    } else {
        showNotification('Cart functionality not available', 'error');
    }
}

// Add to wishlist functionality
function addToWishlist() {
    const wishlistItem = {
        id: currentProduct.id,
        name: currentProduct.name,
        price: currentProduct.price,
        image: currentProduct.images[0],
        category: currentProduct.category
    };
    
    if (window.wishlist) {
        const added = window.wishlist.addItem(wishlistItem);
        if (added) {
            const btn = document.getElementById('addToWishlistBtn');
            btn.innerHTML = '<i class="fas fa-heart"></i> Added to Wishlist';
            btn.classList.add('in-wishlist');
        }
    }
}

// Buy now functionality
function buyNow() {
    addToCart();
    // Small delay to ensure cart is updated
    setTimeout(() => {
        window.location.href = 'checkout.html';
    }, 100);
}

// Load related products
function loadRelatedProducts() {
    const relatedContainer = document.getElementById('relatedProducts');
    
    // Get products from the same category (excluding current product)
    const relatedProducts = Object.values(sampleProducts)
        .filter(product => product.id !== currentProduct.id && product.category === currentProduct.category)
        .slice(0, 4);
    
    if (relatedProducts.length === 0) {
        // If no related products in same category, get random products
        relatedProducts.push(...Object.values(sampleProducts)
            .filter(product => product.id !== currentProduct.id)
            .slice(0, 4));
    }
    
    relatedContainer.innerHTML = relatedProducts.map(product => `
        <div class="product-card">
            <div class="product-image-container">
                <img src="${product.images[0]}" alt="${product.name}" class="product-image">
                <div class="product-overlay">
                    <button class="quick-view-btn" onclick="window.location.href='product-detail.html?id=${product.id}'">
                        <i class="fas fa-eye"></i>
                        Quick View
                    </button>
                </div>
                ${product.badges ? product.badges.map(badge => 
                    `<span class="product-badge badge-${badge.toLowerCase()}">${badge}</span>`
                ).join('') : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">
                    <span class="current-price">KES ${product.price.toLocaleString()}</span>
                    ${product.originalPrice ? `<span class="original-price">KES ${product.originalPrice.toLocaleString()}</span>` : ''}
                </div>
                <div class="product-rating">
                    <div class="stars">
                        ${Array.from({length: 5}, (_, i) => 
                            `<i class="fas fa-star ${i < Math.floor(product.rating) ? 'active' : ''}"></i>`
                        ).join('')}
                    </div>
                    <span class="rating-text">(${product.rating})</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Show notification (uses the global function from scripts-new.js)
function showNotification(message, type = 'info') {
    if (window.showNotification) {
        window.showNotification(message, type);
    } else {
        alert(message);
    }
}

// SEO and social sharing
function updateMetaTags() {
    // Update page title
    document.title = `${currentProduct.name} | BMI Leather Art & Design`;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.content = `${currentProduct.description} Shop premium handcrafted leather goods at BMI Leather Art & Design.`;
    }
    
    // Add Open Graph tags for social sharing
    const ogTags = [
        { property: 'og:title', content: currentProduct.name },
        { property: 'og:description', content: currentProduct.description },
        { property: 'og:image', content: currentProduct.images[0] },
        { property: 'og:url', content: window.location.href },
        { property: 'og:type', content: 'product' }
    ];
    
    ogTags.forEach(tag => {
        let existingTag = document.querySelector(`meta[property="${tag.property}"]`);
        if (!existingTag) {
            existingTag = document.createElement('meta');
            existingTag.setAttribute('property', tag.property);
            document.head.appendChild(existingTag);
        }
        existingTag.content = tag.content;
    });
}

// Call updateMetaTags after product is loaded
if (currentProduct) {
    updateMetaTags();
}
