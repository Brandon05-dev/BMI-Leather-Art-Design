// ===== COMPREHENSIVE SHOP FUNCTIONALITY WITH ORDER TRACKING =====

// Product Database with comprehensive listings
const productDatabase = [
    // Premium Leather Bags
    {
        id: 1,
        name: 'Premium Leather Handbag',
        category: 'bags',
        price: 15500,
        originalPrice: 18000,
        images: ['img/1.jpg', 'img/2.jpg', 'img/3.jpg'],
        description: 'Exquisite handcrafted leather handbag made from premium full-grain cowhide. Features multiple compartments, brass hardware, and hand-stitched detailing.',
        material: 'full-grain',
        color: 'brown',
        availability: 'in-stock',
        stock: 8,
        featured: true,
        rating: 4.9,
        reviews: 24,
        tags: ['premium', 'handbag', 'luxury', 'everyday'],
        dimensions: '32cm x 25cm x 12cm',
        care: 'Clean with leather conditioner monthly',
        addedDate: '2025-08-01'
    },
    {
        id: 2,
        name: 'Executive Leather Briefcase',
        category: 'bags',
        price: 22500,
        originalPrice: 25000,
        images: ['img/10.jpg', 'img/11.jpg', 'img/12.jpg'],
        description: 'Professional leather briefcase perfect for executives. Features laptop compartment, document organizers, and premium brass locks.',
        material: 'full-grain',
        color: 'black',
        availability: 'in-stock',
        stock: 5,
        featured: true,
        rating: 4.8,
        reviews: 18,
        tags: ['professional', 'briefcase', 'executive', 'laptop'],
        dimensions: '40cm x 30cm x 8cm',
        care: 'Regular conditioning recommended',
        addedDate: '2025-07-28'
    },
    {
        id: 3,
        name: 'Artisan Leather Tote Bag',
        category: 'bags',
        price: 12500,
        images: ['img/13.jpg', 'img/14.jpg'],
        description: 'Spacious tote bag with artistic leather work. Perfect for shopping, beach trips, or everyday use.',
        material: 'top-grain',
        color: 'tan',
        availability: 'in-stock',
        stock: 12,
        featured: false,
        rating: 4.7,
        reviews: 31,
        tags: ['tote', 'casual', 'spacious', 'everyday'],
        dimensions: '38cm x 32cm x 15cm',
        care: 'Wipe clean with damp cloth',
        addedDate: '2025-07-25'
    },
    {
        id: 4,
        name: 'Vintage Leather Messenger Bag',
        category: 'bags',
        price: 18500,
        images: ['img/15.jpg', 'img/16.jpg', 'img/17.jpg'],
        description: 'Classic messenger bag with vintage appeal. Features adjustable strap, multiple pockets, and aged leather finish.',
        material: 'full-grain',
        color: 'cognac',
        availability: 'in-stock',
        stock: 6,
        featured: true,
        rating: 4.9,
        reviews: 15,
        tags: ['messenger', 'vintage', 'crossbody', 'casual'],
        dimensions: '35cm x 28cm x 10cm',
        care: 'Oil treatment every 3 months',
        addedDate: '2025-07-20'
    },
    
    // Premium Leather Belts
    {
        id: 5,
        name: 'Handcrafted Leather Belt',
        category: 'belts',
        price: 4500,
        originalPrice: 5500,
        images: ['img/18.jpg', 'img/19.jpg'],
        description: 'Classic leather belt with solid brass buckle. Hand-stitched edges and premium leather construction.',
        material: 'full-grain',
        color: 'black',
        availability: 'in-stock',
        stock: 25,
        featured: true,
        rating: 4.8,
        reviews: 42,
        tags: ['belt', 'classic', 'brass-buckle', 'formal'],
        dimensions: 'Available in sizes 30-44',
        care: 'Condition monthly',
        addedDate: '2025-08-03'
    },
    {
        id: 6,
        name: 'Reversible Premium Belt',
        category: 'belts',
        price: 6500,
        images: ['img/20.jpg', 'img/21.jpg'],
        description: 'Versatile reversible belt in black and brown. Premium quality with interchangeable buckle system.',
        material: 'full-grain',
        color: 'black',
        availability: 'in-stock',
        stock: 15,
        featured: false,
        rating: 4.6,
        reviews: 28,
        tags: ['reversible', 'versatile', 'premium', 'interchangeable'],
        dimensions: 'Available in sizes 30-44',
        care: 'Regular cleaning and conditioning',
        addedDate: '2025-07-30'
    },
    {
        id: 7,
        name: 'Casual Woven Leather Belt',
        category: 'belts',
        price: 3500,
        images: ['img/22.jpg'],
        description: 'Casual woven leather belt perfect for everyday wear. Flexible and comfortable with antique brass hardware.',
        material: 'top-grain',
        color: 'brown',
        availability: 'in-stock',
        stock: 20,
        featured: false,
        rating: 4.5,
        reviews: 35,
        tags: ['casual', 'woven', 'flexible', 'everyday'],
        dimensions: 'Available in sizes 30-42',
        care: 'Spot clean when needed',
        addedDate: '2025-07-26'
    },
    
    // Premium Wallets
    {
        id: 8,
        name: 'Premium Leather Wallet',
        category: 'wallets',
        price: 3500,
        originalPrice: 4200,
        images: ['img/23.jpg', 'img/24.jpg'],
        description: 'Compact yet spacious wallet with multiple card slots, bill compartment, and coin pocket. RFID blocking technology.',
        material: 'full-grain',
        color: 'black',
        availability: 'in-stock',
        stock: 30,
        featured: true,
        rating: 4.7,
        reviews: 58,
        tags: ['wallet', 'rfid-blocking', 'compact', 'cards'],
        dimensions: '11cm x 8.5cm x 2cm',
        care: 'Clean with leather cleaner',
        addedDate: '2025-08-05'
    },
    {
        id: 9,
        name: 'Executive Bifold Wallet',
        category: 'wallets',
        price: 4200,
        images: ['img/25.jpg', 'img/26.jpg'],
        description: 'Sophisticated bifold wallet with premium finish. Features 8 card slots, ID window, and bill compartments.',
        material: 'full-grain',
        color: 'cognac',
        availability: 'in-stock',
        stock: 18,
        featured: false,
        rating: 4.8,
        reviews: 23,
        tags: ['bifold', 'executive', 'id-window', 'sophisticated'],
        dimensions: '11.5cm x 9cm x 2.5cm',
        care: 'Regular conditioning',
        addedDate: '2025-07-31'
    },
    {
        id: 10,
        name: 'Minimalist Card Holder',
        category: 'wallets',
        price: 2200,
        images: ['img/27.jpg'],
        description: 'Sleek minimalist card holder for those who prefer to travel light. Holds 4-6 cards comfortably.',
        material: 'top-grain',
        color: 'tan',
        availability: 'in-stock',
        stock: 40,
        featured: false,
        rating: 4.6,
        reviews: 41,
        tags: ['minimalist', 'card-holder', 'slim', 'travel'],
        dimensions: '10cm x 7cm x 0.8cm',
        care: 'Wipe with dry cloth',
        addedDate: '2025-07-29'
    },
    
    // Leather Accessories
    {
        id: 11,
        name: 'Leather Key Holder',
        category: 'accessories',
        price: 1800,
        images: ['img/28.jpg'],
        description: 'Elegant leather key holder with brass key ring. Keeps your keys organized and protected.',
        material: 'top-grain',
        color: 'brown',
        availability: 'in-stock',
        stock: 50,
        featured: false,
        rating: 4.4,
        reviews: 67,
        tags: ['key-holder', 'organized', 'compact', 'brass'],
        dimensions: '12cm x 6cm x 1cm',
        care: 'Clean with soft cloth',
        addedDate: '2025-07-27'
    },
    {
        id: 12,
        name: 'Leather Phone Case',
        category: 'accessories',
        price: 2800,
        images: ['img/29.jpg', 'img/30.jpg'],
        description: 'Premium leather phone case with card slots. Available for various phone models. Custom fitting available.',
        material: 'full-grain',
        color: 'black',
        availability: 'custom-order',
        stock: 0,
        featured: false,
        rating: 4.5,
        reviews: 19,
        tags: ['phone-case', 'custom', 'cards', 'protection'],
        dimensions: 'Custom fit per phone model',
        care: 'Regular dusting',
        addedDate: '2025-07-24'
    },
    {
        id: 13,
        name: 'Leather Watch Strap',
        category: 'accessories',
        price: 2500,
        images: ['img/31.jpg'],
        description: 'Handcrafted leather watch strap. Available in multiple colors and sizes. Premium buckle included.',
        material: 'full-grain',
        color: 'brown',
        availability: 'in-stock',
        stock: 35,
        featured: false,
        rating: 4.7,
        reviews: 29,
        tags: ['watch-strap', 'handcrafted', 'buckle', 'sizes'],
        dimensions: 'Various sizes available',
        care: 'Keep dry, condition occasionally',
        addedDate: '2025-07-22'
    },
    
    // Leather Sandals
    {
        id: 14,
        name: 'Handcrafted Leather Sandals',
        category: 'sandals',
        price: 5500,
        images: ['img/32.jpg', 'img/33.jpg'],
        description: 'Comfortable leather sandals with cushioned sole. Perfect for casual wear and warm weather.',
        material: 'full-grain',
        color: 'tan',
        availability: 'in-stock',
        stock: 12,
        featured: false,
        rating: 4.3,
        reviews: 14,
        tags: ['sandals', 'comfortable', 'cushioned', 'casual'],
        dimensions: 'Sizes 38-45 available',
        care: 'Air dry, avoid soaking',
        addedDate: '2025-07-21'
    },
    {
        id: 15,
        name: 'Traditional Maasai Sandals',
        category: 'sandals',
        price: 4800,
        images: ['img/34.jpg'],
        description: 'Traditional style Maasai sandals made from premium leather. Authentic Kenyan craftsmanship.',
        material: 'cowhide',
        color: 'brown',
        availability: 'in-stock',
        stock: 8,
        featured: true,
        rating: 4.6,
        reviews: 11,
        tags: ['traditional', 'maasai', 'authentic', 'kenyan'],
        dimensions: 'Sizes 36-44 available',
        care: 'Gentle cleaning only',
        addedDate: '2025-07-19'
    },
    
    // Additional Premium Items
    {
        id: 16,
        name: 'Luxury Leather Portfolio',
        category: 'bags',
        price: 19500,
        images: ['img/35.jpg', 'img/36.jpg'],
        description: 'Professional leather portfolio with notepad holder, pen slots, and document organizers. Perfect for meetings.',
        material: 'full-grain',
        color: 'black',
        availability: 'in-stock',
        stock: 4,
        featured: true,
        rating: 4.9,
        reviews: 7,
        tags: ['portfolio', 'professional', 'meetings', 'organizer'],
        dimensions: '35cm x 25cm x 3cm',
        care: 'Professional leather care',
        addedDate: '2025-08-02'
    },
    {
        id: 17,
        name: 'Artisan Belt with Custom Buckle',
        category: 'belts',
        price: 7500,
        images: ['img/37.jpg'],
        description: 'Custom artisan belt with handcrafted metal buckle featuring traditional Kenyan designs.',
        material: 'full-grain',
        color: 'cognac',
        availability: 'custom-order',
        stock: 0,
        featured: true,
        rating: 4.8,
        reviews: 5,
        tags: ['custom', 'artisan', 'traditional', 'handcrafted'],
        dimensions: 'Custom sizing available',
        care: 'Special care instructions provided',
        addedDate: '2025-07-18'
    },
    {
        id: 18,
        name: 'Travel Document Holder',
        category: 'accessories',
        price: 3800,
        images: ['img/38.jpg'],
        description: 'Secure leather document holder for passports, tickets, and travel essentials. Multiple compartments.',
        material: 'full-grain',
        color: 'black',
        availability: 'in-stock',
        stock: 15,
        featured: false,
        rating: 4.5,
        reviews: 22,
        tags: ['travel', 'documents', 'passport', 'secure'],
        dimensions: '25cm x 13cm x 2cm',
        care: 'Keep documents dry',
        addedDate: '2025-07-17'
    },
    {
        id: 19,
        name: 'Ladies Clutch Purse',
        category: 'bags',
        price: 8500,
        images: ['img/39.jpg', 'img/40.jpg'],
        description: 'Elegant ladies clutch purse perfect for evening events. Features gold-tone hardware and silk lining.',
        material: 'full-grain',
        color: 'black',
        availability: 'in-stock',
        stock: 10,
        featured: false,
        rating: 4.7,
        reviews: 16,
        tags: ['clutch', 'evening', 'elegant', 'ladies'],
        dimensions: '28cm x 16cm x 4cm',
        care: 'Store in dust bag',
        addedDate: '2025-07-15'
    },
    {
        id: 20,
        name: 'Executive Leather Organizer',
        category: 'accessories',
        price: 12500,
        images: ['img/41.jpg'],
        description: 'Complete leather desk organizer with pen holder, card slots, and notepad. Professional workspace essential.',
        material: 'full-grain',
        color: 'cognac',
        availability: 'in-stock',
        stock: 6,
        featured: false,
        rating: 4.6,
        reviews: 9,
        tags: ['organizer', 'desk', 'professional', 'workspace'],
        dimensions: '30cm x 20cm x 5cm',
        care: 'Dust regularly',
        addedDate: '2025-07-14'
    }
];

// Shopping cart and state management
let cart = JSON.parse(localStorage.getItem('bmi-cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('bmi-wishlist')) || [];
let currentFilters = {
    categories: ['all'],
    priceRange: { min: 500, max: 50000 },
    colors: [],
    materials: [],
    availability: ['in-stock']
};
let currentSort = 'featured';
let currentView = 'grid';
let currentPage = 1;
let productsPerPage = 12;

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const wishlistIcon = document.getElementById('wishlistIcon');
const wishlistCount = document.getElementById('wishlistCount');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const resultCount = document.getElementById('resultCount');
const loadMoreBtn = document.getElementById('loadMoreBtn');

// Initialize shop
document.addEventListener('DOMContentLoaded', function() {
    initializeShop();
    setupEventListeners();
    updateCartDisplay();
    updateWishlistDisplay();
});

// Initialize shop functionality
function initializeShop() {
    renderProducts();
    updateResultsCount();
    setupFilters();
    
    // Update total products count
    const totalElement = document.getElementById('totalProducts');
    if (totalElement) {
        totalElement.textContent = `${productDatabase.length}+`;
    }
}

// Setup event listeners
function setupEventListeners() {
    // Cart functionality
    if (cartIcon) cartIcon.addEventListener('click', toggleCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
    const cartCloseBtn = document.getElementById('cartClose');
    if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
    
    // Sort functionality
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSort);
    }
    
    // Filter functionality
    setupFilterListeners();
    
    // View toggle
    setupViewToggle();
    
    // Load more button
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreProducts);
    }
    
    // Checkout buttons
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            window.location.href = 'checkout.html';
        });
    }
    
    const viewCartBtn = document.getElementById('viewCartBtn');
    if (viewCartBtn) {
        viewCartBtn.addEventListener('click', () => {
            window.location.href = 'checkout.html';
        });
    }
}

// Render products
function renderProducts(productsToRender = null) {
    const products = productsToRender || getFilteredProducts();
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = currentPage * productsPerPage;
    const pageProducts = products.slice(0, endIndex);
    
    if (!productsGrid) return;
    
    productsGrid.innerHTML = pageProducts.map(product => createProductCard(product)).join('');
    
    // Setup product card interactions
    setupProductInteractions();
    
    // Show/hide load more button
    if (loadMoreBtn) {
        loadMoreBtn.style.display = products.length > endIndex ? 'block' : 'none';
    }
}

// Create product card HTML
function createProductCard(product) {
    const isInWishlist = wishlist.includes(product.id);
    const isInCart = cart.some(item => item.id === product.id);
    const discountPercent = product.originalPrice ? 
        Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
    
    return `
        <div class="product-card ${currentView === 'list' ? 'list-view' : ''}" data-product-id="${product.id}">
            ${product.originalPrice ? `<div class="product-badge sale">-${discountPercent}%</div>` : ''}
            ${product.featured ? '<div class="product-badge featured">Featured</div>' : ''}
            ${product.availability === 'custom-order' ? '<div class="product-badge custom">Custom Order</div>' : ''}
            
            <div class="product-image-container">
                <img src="${product.images[0]}" alt="${product.name}" class="product-image" loading="lazy">
                ${product.images.length > 1 ? `<img src="${product.images[1]}" alt="${product.name}" class="product-image-hover" loading="lazy">` : ''}
                
                <div class="product-actions">
                    <button class="action-btn wishlist-btn ${isInWishlist ? 'active' : ''}" 
                            data-product-id="${product.id}" title="Add to Wishlist">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="action-btn quick-view-btn" 
                            data-product-id="${product.id}" title="Quick View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn compare-btn" 
                            data-product-id="${product.id}" title="Compare">
                        <i class="fas fa-balance-scale"></i>
                    </button>
                </div>
            </div>
            
            <div class="product-info">
                <div class="product-category">${getCategoryDisplayName(product.category)}</div>
                <h3 class="product-name">${product.name}</h3>
                
                <div class="product-rating">
                    ${generateStarRating(product.rating)}
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                
                <div class="product-price">
                    <span class="current-price">KES ${product.price.toLocaleString()}</span>
                    ${product.originalPrice ? `<span class="original-price">KES ${product.originalPrice.toLocaleString()}</span>` : ''}
                </div>
                
                <div class="product-details">
                    <span class="product-material">${getMaterialDisplayName(product.material)}</span>
                    <span class="product-color">${product.color}</span>
                </div>
                
                <div class="product-availability">
                    ${product.availability === 'in-stock' ? 
                        `<span class="in-stock"><i class="fas fa-check"></i> In Stock (${product.stock})</span>` :
                        '<span class="custom-order"><i class="fas fa-clock"></i> Custom Order (2-3 weeks)</span>'
                    }
                </div>
                
                <button class="add-to-cart-btn ${isInCart ? 'in-cart' : ''}" 
                        data-product-id="${product.id}"
                        ${product.availability === 'in-stock' && product.stock === 0 ? 'disabled' : ''}>
                    ${isInCart ? '<i class="fas fa-check"></i> In Cart' : 
                      product.availability === 'custom-order' ? '<i class="fas fa-plus"></i> Order Custom' :
                      '<i class="fas fa-shopping-bag"></i> Add to Cart'}
                </button>
            </div>
        </div>
    `;
}

// Setup product interactions
function setupProductInteractions() {
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', handleAddToCart);
    });
    
    // Wishlist buttons
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', handleWishlistToggle);
    });
    
    // Quick view buttons
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', handleQuickView);
    });
    
    // Product name clicks for detail view
    document.querySelectorAll('.product-name').forEach(name => {
        name.addEventListener('click', function() {
            const productId = this.closest('.product-card').dataset.productId;
            window.location.href = `product-detail.html?id=${productId}`;
        });
    });
}

// Handle add to cart
function handleAddToCart(e) {
    e.preventDefault();
    const productId = parseInt(e.target.dataset.productId);
    const product = productDatabase.find(p => p.id === productId);
    
    if (!product) return;
    
    // Check if item is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        showNotification('Item is already in your cart!', 'info');
        return;
    }
    
    // Add to cart
    const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: 1,
        availability: product.availability
    };
    
    cart.push(cartItem);
    localStorage.setItem('bmi-cart', JSON.stringify(cart));
    
    // Update UI
    updateCartDisplay();
    
    // Update button state
    e.target.classList.add('in-cart');
    e.target.innerHTML = '<i class="fas fa-check"></i> In Cart';
    
    // Generate order number for potential tracking
    const orderNumber = generateOrderNumber();
    
    // Show success notification with order tracking option
    showNotification(`Added to cart! Order #${orderNumber} - Track your order once placed.`, 'success');
    
    // Show cart briefly
    toggleCart();
    setTimeout(closeCart, 3000);
}

// Handle wishlist toggle
function handleWishlistToggle(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const productId = parseInt(e.target.closest('.wishlist-btn').dataset.productId);
    const isInWishlist = wishlist.includes(productId);
    
    if (isInWishlist) {
        wishlist = wishlist.filter(id => id !== productId);
        e.target.closest('.wishlist-btn').classList.remove('active');
        showNotification('Removed from wishlist', 'info');
    } else {
        wishlist.push(productId);
        e.target.closest('.wishlist-btn').classList.add('active');
        showNotification('Added to wishlist', 'success');
    }
    
    localStorage.setItem('bmi-wishlist', JSON.stringify(wishlist));
    updateWishlistDisplay();
}

// Handle quick view
function handleQuickView(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const productId = parseInt(e.target.closest('.quick-view-btn').dataset.productId);
    const product = productDatabase.find(p => p.id === productId);
    
    if (!product) return;
    
    showQuickViewModal(product);
}

// Show quick view modal
function showQuickViewModal(product) {
    const modal = document.getElementById('quickViewModal');
    const quickViewContent = document.getElementById('quickViewContent');
    
    if (!modal || !quickViewContent) return;
    
    quickViewContent.innerHTML = `
        <div class="quick-view-layout">
            <div class="quick-view-images">
                <img src="${product.images[0]}" alt="${product.name}" class="main-image">
                ${product.images.length > 1 ? `
                    <div class="thumbnail-images">
                        ${product.images.map((img, index) => `
                            <img src="${img}" alt="${product.name}" class="thumbnail ${index === 0 ? 'active' : ''}" data-main="${img}">
                        `).join('')}
                    </div>
                ` : ''}
            </div>
            <div class="quick-view-details">
                <h2>${product.name}</h2>
                <div class="product-rating">
                    ${generateStarRating(product.rating)}
                    <span class="rating-count">(${product.reviews} reviews)</span>
                </div>
                <div class="product-price">
                    <span class="current-price">KES ${product.price.toLocaleString()}</span>
                    ${product.originalPrice ? `<span class="original-price">KES ${product.originalPrice.toLocaleString()}</span>` : ''}
                </div>
                <p class="product-description">${product.description}</p>
                <div class="product-meta">
                    <div class="meta-item">
                        <span class="meta-label">Material:</span>
                        <span class="meta-value">${getMaterialDisplayName(product.material)}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Color:</span>
                        <span class="meta-value">${product.color}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Dimensions:</span>
                        <span class="meta-value">${product.dimensions}</span>
                    </div>
                </div>
                <div class="quick-view-actions">
                    <button class="add-to-cart-btn" data-product-id="${product.id}">
                        ${product.availability === 'custom-order' ? 'Order Custom' : 'Add to Cart'}
                    </button>
                    <button class="wishlist-btn ${wishlist.includes(product.id) ? 'active' : ''}" data-product-id="${product.id}">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Setup interactions for quick view
    setupQuickViewInteractions();
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Setup quick view interactions
function setupQuickViewInteractions() {
    // Thumbnail clicks
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.addEventListener('click', function() {
            const mainImage = document.querySelector('.main-image');
            if (mainImage) {
                mainImage.src = this.dataset.main;
                document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Add to cart in quick view
    const quickViewAddBtn = document.querySelector('.quick-view-details .add-to-cart-btn');
    if (quickViewAddBtn) {
        quickViewAddBtn.addEventListener('click', handleAddToCart);
    }
    
    // Wishlist in quick view
    const quickViewWishlistBtn = document.querySelector('.quick-view-details .wishlist-btn');
    if (quickViewWishlistBtn) {
        quickViewWishlistBtn.addEventListener('click', handleWishlistToggle);
    }
    
    // Close modal
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');
    
    if (modalClose) {
        modalClose.addEventListener('click', closeQuickViewModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeQuickViewModal);
    }
}

// Close quick view modal
function closeQuickViewModal() {
    const modal = document.getElementById('quickViewModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Get filtered products
function getFilteredProducts() {
    let filtered = [...productDatabase];
    
    // Category filter
    if (!currentFilters.categories.includes('all')) {
        filtered = filtered.filter(product => 
            currentFilters.categories.includes(product.category)
        );
    }
    
    // Price filter
    filtered = filtered.filter(product => 
        product.price >= currentFilters.priceRange.min && 
        product.price <= currentFilters.priceRange.max
    );
    
    // Color filter
    if (currentFilters.colors.length > 0) {
        filtered = filtered.filter(product => 
            currentFilters.colors.includes(product.color)
        );
    }
    
    // Material filter
    if (currentFilters.materials.length > 0) {
        filtered = filtered.filter(product => 
            currentFilters.materials.includes(product.material)
        );
    }
    
    // Availability filter
    if (!currentFilters.availability.includes('custom-order')) {
        filtered = filtered.filter(product => product.availability === 'in-stock');
    }
    
    // Search filter
    const searchTerm = searchInput?.value.toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }
    
    // Sort products
    return sortProducts(filtered);
}

// Sort products
function sortProducts(products) {
    switch (currentSort) {
        case 'price-low-high':
            return products.sort((a, b) => a.price - b.price);
        case 'price-high-low':
            return products.sort((a, b) => b.price - a.price);
        case 'name-a-z':
            return products.sort((a, b) => a.name.localeCompare(b.name));
        case 'name-z-a':
            return products.sort((a, b) => b.name.localeCompare(a.name));
        case 'newest':
            return products.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
        case 'featured':
        default:
            return products.sort((a, b) => {
                if (a.featured && !b.featured) return -1;
                if (!a.featured && b.featured) return 1;
                return b.rating - a.rating;
            });
    }
}

// Handle search
function handleSearch() {
    currentPage = 1;
    renderProducts();
    updateResultsCount();
}

// Handle sort
function handleSort(e) {
    currentSort = e.target.value;
    currentPage = 1;
    renderProducts();
}

// Setup filter listeners
function setupFilterListeners() {
    // Category filters
    document.querySelectorAll('input[name="category"]').forEach(checkbox => {
        checkbox.addEventListener('change', handleCategoryFilter);
    });
    
    // Price range
    document.getElementById('priceMin')?.addEventListener('input', handlePriceFilter);
    document.getElementById('priceMax')?.addEventListener('input', handlePriceFilter);
    
    // Color filters
    document.querySelectorAll('input[name="color"]').forEach(checkbox => {
        checkbox.addEventListener('change', handleColorFilter);
    });
    
    // Material filters
    document.querySelectorAll('input[name="material"]').forEach(checkbox => {
        checkbox.addEventListener('change', handleMaterialFilter);
    });
    
    // Availability filters
    document.querySelectorAll('input[name="availability"]').forEach(checkbox => {
        checkbox.addEventListener('change', handleAvailabilityFilter);
    });
    
    // Clear filters
    document.getElementById('clearFilters')?.addEventListener('click', clearAllFilters);
}

// Handle category filter
function handleCategoryFilter(e) {
    const value = e.target.value;
    
    if (value === 'all') {
        currentFilters.categories = ['all'];
        document.querySelectorAll('input[name="category"]').forEach(cb => {
            cb.checked = cb.value === 'all';
        });
    } else {
        if (currentFilters.categories.includes('all')) {
            currentFilters.categories = [value];
            document.querySelector('input[value="all"]').checked = false;
        } else {
            if (e.target.checked) {
                currentFilters.categories.push(value);
            } else {
                currentFilters.categories = currentFilters.categories.filter(c => c !== value);
            }
        }
    }
    
    currentPage = 1;
    renderProducts();
    updateResultsCount();
}

// Handle price filter
function handlePriceFilter() {
    const minInput = document.getElementById('priceMin');
    const maxInput = document.getElementById('priceMax');
    
    if (minInput && maxInput) {
        currentFilters.priceRange.min = parseInt(minInput.value);
        currentFilters.priceRange.max = parseInt(maxInput.value);
        
        currentPage = 1;
        renderProducts();
        updateResultsCount();
    }
}

// Handle color filter
function handleColorFilter(e) {
    const value = e.target.value;
    
    if (e.target.checked) {
        currentFilters.colors.push(value);
    } else {
        currentFilters.colors = currentFilters.colors.filter(c => c !== value);
    }
    
    currentPage = 1;
    renderProducts();
    updateResultsCount();
}

// Handle material filter
function handleMaterialFilter(e) {
    const value = e.target.value;
    
    if (e.target.checked) {
        currentFilters.materials.push(value);
    } else {
        currentFilters.materials = currentFilters.materials.filter(m => m !== value);
    }
    
    currentPage = 1;
    renderProducts();
    updateResultsCount();
}

// Handle availability filter
function handleAvailabilityFilter(e) {
    const value = e.target.value;
    
    if (e.target.checked) {
        if (!currentFilters.availability.includes(value)) {
            currentFilters.availability.push(value);
        }
    } else {
        currentFilters.availability = currentFilters.availability.filter(a => a !== value);
    }
    
    currentPage = 1;
    renderProducts();
    updateResultsCount();
}

// Clear all filters
function clearAllFilters() {
    currentFilters = {
        categories: ['all'],
        priceRange: { min: 500, max: 50000 },
        colors: [],
        materials: [],
        availability: ['in-stock']
    };
    
    // Reset form elements
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.checked = cb.value === 'all' || cb.value === 'in-stock';
    });
    
    const priceMin = document.getElementById('priceMin');
    const priceMax = document.getElementById('priceMax');
    if (priceMin) priceMin.value = 500;
    if (priceMax) priceMax.value = 50000;
    
    currentPage = 1;
    renderProducts();
    updateResultsCount();
}

// Setup view toggle
function setupViewToggle() {
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.dataset.view;
            
            // Update active state
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update current view
            currentView = view;
            
            // Re-render with new view
            renderProducts();
        });
    });
}

// Load more products
function loadMoreProducts() {
    currentPage++;
    renderProducts();
}

// Update results count
function updateResultsCount() {
    const filteredProducts = getFilteredProducts();
    if (resultCount) {
        resultCount.textContent = filteredProducts.length;
    }
}

// Generate star rating HTML
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

// Get category display name
function getCategoryDisplayName(category) {
    const categoryNames = {
        'bags': 'Bags',
        'belts': 'Belts',
        'wallets': 'Wallets',
        'accessories': 'Accessories',
        'sandals': 'Sandals'
    };
    return categoryNames[category] || category;
}

// Get material display name
function getMaterialDisplayName(material) {
    const materialNames = {
        'full-grain': 'Full Grain Leather',
        'top-grain': 'Top Grain Leather',
        'cowhide': 'Premium Cowhide',
        'exotic': 'Exotic Leather'
    };
    return materialNames[material] || material;
}

// Generate order number
function generateOrderNumber() {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 900) + 100;
    
    return `BMI${year}${month}${day}${random}`;
}

// Cart functionality
function toggleCart() {
    if (cartSidebar && cartOverlay) {
        const isOpen = cartSidebar.classList.contains('open');
        
        if (isOpen) {
            closeCart();
        } else {
            cartSidebar.classList.add('open');
            cartOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
}

function closeCart() {
    if (cartSidebar && cartOverlay) {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Update cart display
function updateCartDisplay() {
    if (!cartCount || !cartItems) return;
    
    cartCount.textContent = cart.length;
    cartCount.style.display = cart.length > 0 ? 'flex' : 'none';
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <p class="empty-cart-subtitle">Add some beautiful leather pieces!</p>
            </div>
        `;
        const cartFooter = document.getElementById('cartFooter');
        if (cartFooter) cartFooter.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item" data-product-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <div class="cart-item-price">KES ${item.price.toLocaleString()}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" data-action="decrease" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-action="increase" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="remove-item" data-id="${item.id}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
        
        // Setup cart item interactions
        setupCartItemInteractions();
        
        // Update totals
        updateCartTotals();
        
        const cartFooter = document.getElementById('cartFooter');
        if (cartFooter) cartFooter.style.display = 'block';
    }
}

// Setup cart item interactions
function setupCartItemInteractions() {
    // Quantity buttons
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = parseInt(this.dataset.id);
            const action = this.dataset.action;
            
            updateCartItemQuantity(itemId, action);
        });
    });
    
    // Remove buttons
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = parseInt(this.dataset.id);
            removeFromCart(itemId);
        });
    });
}

// Update cart item quantity
function updateCartItemQuantity(itemId, action) {
    const item = cart.find(item => item.id === itemId);
    if (!item) return;
    
    if (action === 'increase') {
        item.quantity++;
    } else if (action === 'decrease' && item.quantity > 1) {
        item.quantity--;
    }
    
    localStorage.setItem('bmi-cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Remove from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('bmi-cart', JSON.stringify(cart));
    
    // Update add to cart button if on same page
    const productCard = document.querySelector(`[data-product-id="${itemId}"]`);
    if (productCard) {
        const addBtn = productCard.querySelector('.add-to-cart-btn');
        if (addBtn) {
            addBtn.classList.remove('in-cart');
            addBtn.innerHTML = '<i class="fas fa-shopping-bag"></i> Add to Cart';
        }
    }
    
    updateCartDisplay();
    showNotification('Item removed from cart', 'info');
}

// Update cart totals
function updateCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 5000 ? 0 : 500; // Free shipping over KES 5000
    const total = subtotal + shipping;
    
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartShipping = document.getElementById('cartShipping');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cartSubtotal) cartSubtotal.textContent = `KES ${subtotal.toLocaleString()}`;
    if (cartShipping) cartShipping.textContent = shipping === 0 ? 'Free' : `KES ${shipping.toLocaleString()}`;
    if (cartTotal) cartTotal.textContent = `KES ${total.toLocaleString()}`;
}

// Update wishlist display
function updateWishlistDisplay() {
    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
        wishlistCount.style.display = wishlist.length > 0 ? 'flex' : 'none';
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('notificationToast');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notificationToast';
        notification.className = 'notification-toast';
        document.body.appendChild(notification);
    }
    
    const iconClass = type === 'error' ? 'fas fa-exclamation-circle' : 
                     type === 'success' ? 'fas fa-check-circle' : 
                     'fas fa-info-circle';
    
    notification.innerHTML = `
        <div class="toast-content">
            <i class="${iconClass}"></i>
            <span class="toast-message">${message}</span>
        </div>
    `;
    
    notification.className = `notification-toast ${type} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Setup filters on page load
function setupFilters() {
    // Update category counts
    const categoryCounts = {
        all: productDatabase.length,
        belts: productDatabase.filter(p => p.category === 'belts').length,
        wallets: productDatabase.filter(p => p.category === 'wallets').length,
        bags: productDatabase.filter(p => p.category === 'bags').length,
        accessories: productDatabase.filter(p => p.category === 'accessories').length,
        sandals: productDatabase.filter(p => p.category === 'sandals').length
    };
    
    Object.keys(categoryCounts).forEach(category => {
        const countElement = document.getElementById(`count${category.charAt(0).toUpperCase() + category.slice(1)}`);
        if (countElement) {
            countElement.textContent = `(${categoryCounts[category]})`;
        }
    });
}
