// ===== ECOMMERCE FUNCTIONALITY =====

// Product Data
const products = [
    {
        id: 1,
        name: "Executive Pen Holder",
        category: "accessories",
        price: 11050,
        oldPrice: null,
        image: "images/1.jpg",
        images: ["images/1.jpg"],
        description: "Handcrafted leather pen holder perfect for executive desks. Made from premium full-grain leather with elegant stitching.",
        material: "full-grain",
        colors: ["black", "brown"],
        stock: 25,
        rating: 4.8,
        reviews: 12,
        badge: "bestseller",
        features: ["Handcrafted", "Full-grain leather", "Executive design", "Perfect desk accessory"]
    },
    {
        id: 2,
        name: "Premium Wine Carrier",
        category: "accessories",
        price: 13600,
        oldPrice: 16000,
        image: "images/2.jpg",
        images: ["images/2.jpg"],
        description: "Elegant wine carrier crafted from premium leather. Perfect for gifting or special occasions.",
        material: "top-grain",
        colors: ["black", "brown", "cognac"],
        stock: 15,
        rating: 4.9,
        reviews: 8,
        badge: "sale",
        features: ["Premium leather", "Secure closure", "Gift-ready", "Elegant design"]
    },
    {
        id: 3,
        name: "Artisan Watch Strap",
        category: "accessories",
        price: 5850,
        oldPrice: null,
        image: "images/3.jpg",
        images: ["images/3.jpg"],
        description: "Custom watch strap made from finest leather. Compatible with most watch brands.",
        material: "full-grain",
        colors: ["black", "brown", "tan"],
        stock: 30,
        rating: 4.7,
        reviews: 15,
        badge: "new",
        features: ["Universal fit", "Premium buckle", "Custom sizing", "Multiple colors"]
    },
    {
        id: 4,
        name: "Pet Accessories Set",
        category: "accessories",
        price: 12350,
        oldPrice: null,
        image: "images/4.jpg",
        images: ["images/4.jpg"],
        description: "Complete leather accessories set for your beloved pets. Includes collar and leash.",
        material: "full-grain",
        colors: ["black", "brown"],
        stock: 20,
        rating: 4.6,
        reviews: 6,
        badge: "bestseller",
        features: ["Complete set", "Durable leather", "Comfortable fit", "Matching accessories"]
    },
    {
        id: 5,
        name: "Classic Leather Belt",
        category: "belts",
        price: 8500,
        oldPrice: null,
        image: "img/31.jpg",
        images: ["img/31.jpg"],
        description: "Timeless leather belt crafted from premium cowhide. Perfect for formal and casual wear.",
        material: "cowhide",
        colors: ["black", "brown", "cognac"],
        stock: 40,
        rating: 4.8,
        reviews: 25,
        badge: null,
        features: ["Premium buckle", "Multiple sizes", "Versatile style", "Long-lasting"]
    },
    {
        id: 6,
        name: "Executive Wallet",
        category: "wallets",
        price: 7500,
        oldPrice: null,
        image: "img/19.jpg",
        images: ["img/19.jpg"],
        description: "Elegant leather wallet with multiple card slots and bill compartments. Perfect for professionals.",
        material: "full-grain",
        colors: ["black", "brown"],
        stock: 35,
        rating: 4.9,
        reviews: 18,
        badge: "bestseller",
        features: ["RFID blocking", "Multiple compartments", "Slim design", "Premium leather"]
    },
    {
        id: 7,
        name: "Handcrafted Sandals",
        category: "sandals",
        price: 6200,
        oldPrice: null,
        image: "img/2.jpg",
        images: ["img/2.jpg"],
        description: "Comfortable leather sandals made with traditional craftsmanship. Perfect for casual wear.",
        material: "full-grain",
        colors: ["black", "brown", "tan"],
        stock: 25,
        rating: 4.5,
        reviews: 10,
        badge: null,
        features: ["Comfortable sole", "Breathable design", "Handcrafted", "Durable construction"]
    },
    {
        id: 8,
        name: "Premium Leather Bag",
        category: "bags",
        price: 18500,
        oldPrice: null,
        image: "img/37.jpg",
        images: ["img/37.jpg"],
        description: "Spacious leather travel bag with multiple compartments. Perfect for business trips and travel.",
        material: "full-grain",
        colors: ["black", "brown"],
        stock: 12,
        rating: 4.9,
        reviews: 7,
        badge: "limited",
        features: ["Multiple compartments", "Durable handles", "Premium hardware", "Large capacity"]
    },
    {
        id: 9,
        name: "Leather Key Holder",
        category: "accessories",
        price: 3500,
        oldPrice: null,
        image: "img/50.jpg",
        images: ["img/50.jpg"],
        description: "Compact leather key holder to keep your keys organized and secure.",
        material: "top-grain",
        colors: ["black", "brown", "tan"],
        stock: 50,
        rating: 4.4,
        reviews: 22,
        badge: null,
        features: ["Compact design", "Secure closure", "Key organization", "Pocket-friendly"]
    },
    {
        id: 10,
        name: "Designer Belt",
        category: "belts",
        price: 12000,
        oldPrice: 14000,
        image: "img/33.jpg",
        images: ["img/33.jpg"],
        description: "Premium designer belt with unique buckle design. Made from finest leather.",
        material: "exotic",
        colors: ["black", "cognac"],
        stock: 18,
        rating: 4.7,
        reviews: 9,
        badge: "sale",
        features: ["Designer buckle", "Premium leather", "Unique design", "Limited edition"]
    }
];

// Global variables
let currentFilters = {
    category: [],
    price: { min: 500, max: 10000 },
    color: [],
    material: [],
    availability: ['in-stock']
};
let currentSort = 'featured';
let currentView = 'grid';
let filteredProducts = [...products];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartIcon = document.getElementById('cartIcon');
const cartCount = document.getElementById('cartCount');
const cartSidebar = document.getElementById('cartSidebar');
const cartClose = document.getElementById('cartClose');
const cartOverlay = document.getElementById('cartOverlay');
const cartItems = document.getElementById('cartItems');
const cartFooter = document.getElementById('cartFooter');
const notificationToast = document.getElementById('notificationToast');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const viewBtns = document.querySelectorAll('.view-btn');
const resultCount = document.getElementById('resultCount');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeFilters();
    initializeEventListeners();
    renderProducts();
    updateCartUI();
    updateWishlistUI();
    setupMobileFilters();
    
    // Initialize from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('category')) {
        const category = urlParams.get('category');
        const categoryCheckbox = document.querySelector(`input[name="category"][value="${category}"]`);
        if (categoryCheckbox) {
            categoryCheckbox.checked = true;
            currentFilters.category = [category];
            applyFilters();
        }
    }
});

// Initialize Filters
function initializeFilters() {
    // Category filters
    const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.value === 'all') {
                if (this.checked) {
                    currentFilters.category = [];
                    categoryCheckboxes.forEach(cb => {
                        if (cb.value !== 'all') cb.checked = false;
                    });
                }
            } else {
                if (this.checked) {
                    if (!currentFilters.category.includes(this.value)) {
                        currentFilters.category.push(this.value);
                    }
                    document.querySelector('input[name="category"][value="all"]').checked = false;
                } else {
                    currentFilters.category = currentFilters.category.filter(cat => cat !== this.value);
                    if (currentFilters.category.length === 0) {
                        document.querySelector('input[name="category"][value="all"]').checked = true;
                    }
                }
            }
            applyFilters();
        });
    });

    // Price filters
    const priceMin = document.getElementById('priceMin');
    const priceMax = document.getElementById('priceMax');
    const priceMinInput = document.getElementById('priceMinInput');
    const priceMaxInput = document.getElementById('priceMaxInput');

    function updatePriceFilter() {
        currentFilters.price.min = parseInt(priceMin.value);
        currentFilters.price.max = parseInt(priceMax.value);
        priceMinInput.value = currentFilters.price.min;
        priceMaxInput.value = currentFilters.price.max;
        applyFilters();
    }

    priceMin.addEventListener('input', updatePriceFilter);
    priceMax.addEventListener('input', updatePriceFilter);
    priceMinInput.addEventListener('change', function() {
        priceMin.value = this.value;
        updatePriceFilter();
    });
    priceMaxInput.addEventListener('change', function() {
        priceMax.value = this.value;
        updatePriceFilter();
    });

    // Color filters
    const colorCheckboxes = document.querySelectorAll('input[name="color"]');
    colorCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                currentFilters.color.push(this.value);
            } else {
                currentFilters.color = currentFilters.color.filter(color => color !== this.value);
            }
            applyFilters();
        });
    });

    // Material filters
    const materialCheckboxes = document.querySelectorAll('input[name="material"]');
    materialCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                currentFilters.material.push(this.value);
            } else {
                currentFilters.material = currentFilters.material.filter(material => material !== this.value);
            }
            applyFilters();
        });
    });

    // Availability filters
    const availabilityCheckboxes = document.querySelectorAll('input[name="availability"]');
    availabilityCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                currentFilters.availability.push(this.value);
            } else {
                currentFilters.availability = currentFilters.availability.filter(avail => avail !== this.value);
            }
            applyFilters();
        });
    });

    // Clear filters
    document.getElementById('clearFilters').addEventListener('click', function() {
        // Reset all checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Check "all" and "in-stock" by default
        document.querySelector('input[name="category"][value="all"]').checked = true;
        document.querySelector('input[name="availability"][value="in-stock"]').checked = true;
        
        // Reset price range
        priceMin.value = 500;
        priceMax.value = 10000;
        priceMinInput.value = 500;
        priceMaxInput.value = 10000;
        
        // Reset filters object
        currentFilters = {
            category: [],
            price: { min: 500, max: 10000 },
            color: [],
            material: [],
            availability: ['in-stock']
        };
        
        applyFilters();
    });
}

// Initialize Event Listeners
function initializeEventListeners() {
    // Search
    searchInput.addEventListener('input', function() {
        applyFilters();
    });

    // Sort
    sortSelect.addEventListener('change', function() {
        currentSort = this.value;
        renderProducts();
    });

    // View toggle
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentView = this.dataset.view;
            productsGrid.className = `products-grid ${currentView}-view`;
        });
    });

    // Cart sidebar
    cartIcon.addEventListener('click', function() {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        if (cart.length > 0) {
            window.location.href = 'checkout.html';
        }
    });

    // View cart button
    document.getElementById('viewCartBtn').addEventListener('click', function() {
        window.location.href = 'cart.html';
    });

    // Newsletter form
    document.getElementById('newsletterForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        showNotification('Thank you for subscribing to our newsletter!');
        this.reset();
    });
}

// Apply Filters
function applyFilters() {
    filteredProducts = products.filter(product => {
        // Category filter
        if (currentFilters.category.length > 0 && !currentFilters.category.includes(product.category)) {
            return false;
        }

        // Price filter
        if (product.price < currentFilters.price.min || product.price > currentFilters.price.max) {
            return false;
        }

        // Color filter
        if (currentFilters.color.length > 0 && !currentFilters.color.some(color => product.colors.includes(color))) {
            return false;
        }

        // Material filter
        if (currentFilters.material.length > 0 && !currentFilters.material.includes(product.material)) {
            return false;
        }

        // Availability filter
        if (currentFilters.availability.includes('in-stock') && product.stock <= 0) {
            return false;
        }

        // Search filter
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm && !product.name.toLowerCase().includes(searchTerm) && 
            !product.description.toLowerCase().includes(searchTerm)) {
            return false;
        }

        return true;
    });

    renderProducts();
}

// Render Products
function renderProducts() {
    // Sort products
    let sortedProducts = [...filteredProducts];
    
    switch (currentSort) {
        case 'price-low-high':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high-low':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-a-z':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-z-a':
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'newest':
            sortedProducts.sort((a, b) => b.id - a.id);
            break;
        default: // featured
            sortedProducts.sort((a, b) => (b.rating * b.reviews) - (a.rating * a.reviews));
    }

    // Update result count
    resultCount.textContent = sortedProducts.length;

    // Render products
    productsGrid.innerHTML = sortedProducts.map(product => createProductCard(product)).join('');
    
    // Add event listeners to new elements
    addProductEventListeners();
}

// Create Product Card
function createProductCard(product) {
    const isInWishlist = wishlist.some(item => item.id === product.id);
    const isInStock = product.stock > 0;
    const stockStatus = product.stock <= 5 && product.stock > 0 ? 'low-stock' : (isInStock ? 'in-stock' : 'out-of-stock');
    const stockText = product.stock <= 5 && product.stock > 0 ? `Only ${product.stock} left` : (isInStock ? 'In Stock' : 'Out of Stock');

    return `
        <div class="product-card" data-product-id="${product.id}">
            ${product.badge ? `<div class="product-badge ${product.badge}">${product.badge}</div>` : ''}
            
            <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" data-product-id="${product.id}">
                <i class="fas fa-heart"></i>
            </button>
            
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                <div class="product-overlay">
                    <div class="product-actions">
                        <button class="action-btn quick-view-btn" onclick="window.location.href='product-detail.html?id=${product.id}'" title="Quick View">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn" data-product-id="${product.id}" data-action="compare" title="Compare">
                            <i class="fas fa-balance-scale"></i>
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="product-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-title">
                    <a href="product-detail.html?id=${product.id}" class="product-link">${product.name}</a>
                </h3>
                <div class="product-description">${product.description}</div>
                
                <div class="product-meta">
                    <div class="rating">
                        ${generateStarRating(product.rating)}
                        <span>(${product.reviews})</span>
                    </div>
                    <div class="stock-status ${stockStatus}">${stockText}</div>
                </div>
                
                <div class="product-pricing">
                    <span class="product-price">KES ${product.price.toLocaleString()}</span>
                    ${product.oldPrice ? `<span class="product-price-old">KES ${product.oldPrice.toLocaleString()}</span>` : ''}
                </div>
                
                <div class="product-actions-bottom">
                    <button class="add-to-cart-btn" data-product-id="${product.id}" ${!isInStock ? 'disabled' : ''}>
                        <i class="fas fa-shopping-cart"></i>
                        ${isInStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Add Product Event Listeners
function addProductEventListeners() {
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.dataset.productId);
            addToCart(productId);
        });
    });

    // Wishlist buttons
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const productId = parseInt(this.dataset.productId);
            toggleWishlist(productId);
        });
    });

    // Quick view buttons
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const productId = parseInt(this.dataset.productId);
            openQuickView(productId);
        });
    });

    // Product card clicks
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('button')) {
                const productId = parseInt(this.dataset.productId);
                window.location.href = `product-detail.html?id=${productId}`;
            }
        });
    });
}

// Cart Functions
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product || product.stock <= 0) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        if (existingItem.quantity + quantity <= product.stock) {
            existingItem.quantity += quantity;
        } else {
            showNotification('Cannot add more items. Stock limit reached.', 'error');
            return;
        }
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity: quantity,
            stock: product.stock
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else if (quantity <= item.stock) {
            item.quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartUI();
        }
    }
}

function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems > 0 ? totalItems : '';

    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <p class="empty-cart-subtitle">Add some beautiful leather pieces!</p>
            </div>
        `;
        cartFooter.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <div class="cart-item-category">${getCategoryName(item.category)}</div>
                    <div class="cart-item-price">KES ${item.price.toLocaleString()}</div>
                    <div class="cart-quantity-controls">
                        <button class="cart-quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span class="cart-quantity-display">${item.quantity}</span>
                        <button class="cart-quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})" title="Remove item">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Update cart summary
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal >= 5000 ? 0 : 500;
        const total = subtotal + shipping;

        document.getElementById('cartSubtotal').textContent = `KES ${subtotal.toLocaleString()}`;
        document.getElementById('cartShipping').textContent = shipping === 0 ? 'Free' : `KES ${shipping.toLocaleString()}`;
        document.getElementById('cartTotal').textContent = `KES ${total.toLocaleString()}`;

        cartFooter.style.display = 'block';
    }
}

function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Wishlist Functions
function toggleWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = wishlist.findIndex(item => item.id === productId);
    
    if (existingIndex > -1) {
        wishlist.splice(existingIndex, 1);
        showNotification(`${product.name} removed from wishlist`);
    } else {
        wishlist.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category
        });
        showNotification(`${product.name} added to wishlist`);
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistUI();
    
    // Update wishlist button state
    const wishlistBtn = document.querySelector(`.wishlist-btn[data-product-id="${productId}"]`);
    if (wishlistBtn) {
        wishlistBtn.classList.toggle('active');
    }
}

function updateWishlistUI() {
    const wishlistCount = document.getElementById('wishlistCount');
    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length > 0 ? wishlist.length : '';
    }
}

// Quick View Modal
function openQuickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('quickViewModal');
    const content = document.getElementById('quickViewContent');
    
    content.innerHTML = `
        <div class="quick-view-images">
            <img src="${product.image}" alt="${product.name}" class="quick-view-main-image">
        </div>
        <div class="quick-view-details">
            <div class="quick-view-category">${getCategoryName(product.category)}</div>
            <h2 class="quick-view-title">${product.name}</h2>
            <div class="quick-view-price">KES ${product.price.toLocaleString()}</div>
            <p class="quick-view-description">${product.description}</p>
            
            <div class="quick-view-options">
                <div class="option-group">
                    <label class="option-label">Color:</label>
                    <div class="color-options-inline">
                        ${product.colors.map(color => `
                            <div class="color-option-inline ${color === product.colors[0] ? 'selected' : ''}" 
                                 style="background-color: ${getColorHex(color)}" 
                                 data-color="${color}"></div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <div class="quantity-selector">
                <label class="option-label">Quantity:</label>
                <div class="quantity-controls">
                    <button type="button" class="quantity-btn" onclick="changeQuickViewQuantity(-1)">-</button>
                    <input type="number" class="quantity-input" value="1" min="1" max="${product.stock}" id="quickViewQuantity">
                    <button type="button" class="quantity-btn" onclick="changeQuickViewQuantity(1)">+</button>
                </div>
            </div>
            
            <div class="quick-view-actions">
                <button class="add-to-cart-quick" onclick="addToCartFromQuickView(${product.id})" ${product.stock <= 0 ? 'disabled' : ''}>
                    <i class="fas fa-shopping-cart"></i>
                    ${product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <button class="add-to-wishlist-quick" onclick="toggleWishlist(${product.id})">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            
            <div class="product-features">
                <ul class="feature-list">
                    ${product.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;

    modal.classList.add('active');

    // Close modal event listeners
    document.getElementById('modalClose').onclick = closeQuickView;
    document.getElementById('modalOverlay').onclick = closeQuickView;
}

function closeQuickView() {
    document.getElementById('quickViewModal').classList.remove('active');
}

function changeQuickViewQuantity(change) {
    const quantityInput = document.getElementById('quickViewQuantity');
    const currentValue = parseInt(quantityInput.value);
    const newValue = currentValue + change;
    const max = parseInt(quantityInput.max);
    
    if (newValue >= 1 && newValue <= max) {
        quantityInput.value = newValue;
    }
}

function addToCartFromQuickView(productId) {
    const quantity = parseInt(document.getElementById('quickViewQuantity').value);
    addToCart(productId, quantity);
    closeQuickView();
}

// Utility Functions
function getCategoryName(category) {
    const categoryNames = {
        'accessories': 'Accessories',
        'belts': 'Belts',
        'wallets': 'Wallets',
        'bags': 'Bags',
        'sandals': 'Sandals'
    };
    return categoryNames[category] || category;
}

function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function getColorHex(colorName) {
    const colorMap = {
        'black': '#2c2c2c',
        'brown': '#8b4513',
        'tan': '#d2b48c',
        'cognac': '#9f4f07'
    };
    return colorMap[colorName] || '#cccccc';
}

function showNotification(message, type = 'success') {
    const toast = notificationToast;
    const toastMessage = toast.querySelector('.toast-message');
    const toastIcon = toast.querySelector('i');
    
    toastMessage.textContent = message;
    
    if (type === 'error') {
        toastIcon.className = 'fas fa-exclamation-circle';
        toast.style.borderLeftColor = '#e74c3c';
    } else {
        toastIcon.className = 'fas fa-check-circle';
        toast.style.borderLeftColor = 'var(--accent-gold)';
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Search functionality with debounce
let searchTimeout;
if (searchInput) {
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            applyFilters();
        }, 300);
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape key to close modals
    if (e.key === 'Escape') {
        closeQuickView();
        closeCart();
    }
    
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (searchInput) {
            searchInput.focus();
        }
    }
});

// Intersection Observer for lazy loading and animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize animations when products are rendered
function initializeAnimations() {
    document.querySelectorAll('.product-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// Call this after rendering products
setTimeout(initializeAnimations, 100);

// Preload critical images
function preloadImages() {
    const criticalImages = products.slice(0, 8).map(product => product.image);
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadImages();

// ===== MOBILE FILTER FUNCTIONALITY =====

// Setup mobile filters
function setupMobileFilters() {
    // Create filter toggle button for mobile
    if (window.innerWidth <= 575) {
        createFilterToggle();
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 575) {
            createFilterToggle();
        } else {
            removeFilterToggle();
            const filters = document.querySelector('.shop-filters');
            if (filters) {
                filters.classList.remove('active');
                filters.style.left = '';
            }
        }
    });
}

// Create mobile filter toggle button
function createFilterToggle() {
    if (!document.getElementById('filter-toggle')) {
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'filter-toggle';
        toggleBtn.className = 'filter-toggle';
        toggleBtn.innerHTML = '<i class="fas fa-filter"></i> Filters';
        
        const shopHeader = document.querySelector('.shop-header');
        if (shopHeader) {
            shopHeader.insertBefore(toggleBtn, shopHeader.firstChild);
        }
        
        // Add click event
        toggleBtn.addEventListener('click', function() {
            const filters = document.querySelector('.shop-filters');
            if (filters) {
                filters.classList.toggle('active');
                if (filters.classList.contains('active')) {
                    createFilterOverlay();
                } else {
                    removeFilterOverlay();
                }
            }
        });
    }
}

// Remove filter toggle button
function removeFilterToggle() {
    const toggleBtn = document.getElementById('filter-toggle');
    if (toggleBtn) {
        toggleBtn.remove();
    }
    removeFilterOverlay();
}

// Create overlay for mobile filters
function createFilterOverlay() {
    if (!document.getElementById('filter-overlay')) {
        const overlay = document.createElement('div');
        overlay.id = 'filter-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(overlay);
        
        // Fade in
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 10);
        
        overlay.addEventListener('click', function() {
            closeFilters();
        });
        
        document.body.style.overflow = 'hidden';
    }
}

// Remove filter overlay
function removeFilterOverlay() {
    const overlay = document.getElementById('filter-overlay');
    if (overlay) {
        overlay.remove();
    }
    document.body.style.overflow = '';
}

// Close mobile filters
function closeFilters() {
    const filters = document.querySelector('.shop-filters');
    if (filters) {
        filters.classList.remove('active');
    }
    removeFilterOverlay();
}

// Export functions for global access
window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;
window.toggleWishlist = toggleWishlist;
window.changeQuickViewQuantity = changeQuickViewQuantity;
window.addToCartFromQuickView = addToCartFromQuickView;
