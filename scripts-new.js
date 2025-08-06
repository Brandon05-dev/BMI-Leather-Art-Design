// ===== DOM ELEMENTS =====
const loadingOverlay = document.getElementById('loading-overlay');
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const backToTop = document.getElementById('backToTop');
const header = document.querySelector('.main-header');

// Hero Slider Elements
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.hero-dots .dot');
const heroPrev = document.querySelector('.hero-prev');
const heroNext = document.querySelector('.hero-next');

// Testimonial Slider Elements
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
const testimonialPrev = document.querySelector('.testimonial-prev');
const testimonialNext = document.querySelector('.testimonial-next');

// Form Elements
const contactForm = document.getElementById('contactForm');

// ===== LOADING ANIMATION =====
// Only show loading on initial page load, not on navigation
let hasLoadedBefore = sessionStorage.getItem('hasLoaded');

if (!hasLoadedBefore) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
                sessionStorage.setItem('hasLoaded', 'true');
            }, 500);
        }, 2000);
    });
} else {
    // Hide loading immediately if page has been loaded before in this session
    loadingOverlay.style.display = 'none';
}

// ===== MOBILE MENU =====

// Create overlay for mobile menu
function createMobileOverlay() {
    if (!document.getElementById('mobile-overlay')) {
        const overlay = document.createElement('div');
        overlay.id = 'mobile-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 999;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        `;
        document.body.appendChild(overlay);
        
        overlay.addEventListener('click', function() {
            closeMobileMenu();
        });
    }
}

function openMobileMenu() {
    const overlay = document.getElementById('mobile-overlay');
    if (overlay) {
        overlay.style.opacity = '1';
        overlay.style.visibility = 'visible';
    }
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    const overlay = document.getElementById('mobile-overlay');
    if (overlay) {
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
    }
    document.body.style.overflow = '';
    
    // Close menu
    if (menuToggle && mainNav) {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
    }
}

if (menuToggle && mainNav) {
    createMobileOverlay();
    
    menuToggle.addEventListener('click', () => {
        const isActive = menuToggle.classList.contains('active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            menuToggle.classList.add('active');
            mainNav.classList.add('active');
            openMobileMenu();
        }
    });

    // Close menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
}

// ===== HEADER SCROLL EFFECT =====
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ===== HERO SLIDER =====
let currentHeroSlide = 0;
const totalHeroSlides = heroSlides.length;

function showHeroSlide(index) {
    heroSlides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
    
    heroDots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === index) {
            dot.classList.add('active');
        }
    });
}

function nextHeroSlide() {
    currentHeroSlide = (currentHeroSlide + 1) % totalHeroSlides;
    showHeroSlide(currentHeroSlide);
}

function prevHeroSlide() {
    currentHeroSlide = (currentHeroSlide - 1 + totalHeroSlides) % totalHeroSlides;
    showHeroSlide(currentHeroSlide);
}

// Hero slider controls
if (heroNext) {
    heroNext.addEventListener('click', nextHeroSlide);
}

if (heroPrev) {
    heroPrev.addEventListener('click', prevHeroSlide);
}

// Hero dots
heroDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentHeroSlide = index;
        showHeroSlide(currentHeroSlide);
    });
});

// Auto-play hero slider
let heroAutoPlay = setInterval(nextHeroSlide, 6000);

// Pause auto-play on hover
const heroSection = document.querySelector('.hero-section');
if (heroSection) {
    heroSection.addEventListener('mouseenter', () => {
        clearInterval(heroAutoPlay);
    });
    
    heroSection.addEventListener('mouseleave', () => {
        heroAutoPlay = setInterval(nextHeroSlide, 6000);
    });
}

// ===== TESTIMONIAL SLIDER =====
let currentTestimonial = 0;
const totalTestimonials = testimonialCards.length;

function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
        card.classList.remove('active');
        if (i === index) {
            card.classList.add('active');
        }
    });
    
    testimonialDots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === index) {
            dot.classList.add('active');
        }
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    showTestimonial(currentTestimonial);
}

// Testimonial controls
if (testimonialNext) {
    testimonialNext.addEventListener('click', nextTestimonial);
}

if (testimonialPrev) {
    testimonialPrev.addEventListener('click', prevTestimonial);
}

// Testimonial dots
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// Auto-play testimonials
setInterval(nextTestimonial, 8000);

// ===== BACK TO TOP BUTTON =====
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.feature-card, .product-card, .stat-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== CONTACT FORM =====
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const inquiry = formData.get('inquiry');
        const message = formData.get('message');
        
        // Create WhatsApp message
        const whatsappMessage = `Hello BMI Leather Art & Design!
        
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Inquiry Type: ${inquiry}

Message: ${message}

I'm interested in your leather products and services. Please get back to me at your earliest convenience.`;
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappURL = `https://wa.me/254707702773?text=${encodedMessage}`;
        
        // Open WhatsApp
        window.open(whatsappURL, '_blank');
        
        // Show success message
        showNotification('Message prepared! Opening WhatsApp...', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

// ===== PRODUCT ACTIONS =====
const actionButtons = document.querySelectorAll('.action-btn');
actionButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const action = e.target.closest('.action-btn').dataset.action;
        
        if (action === 'view') {
            // In a real application, this would open a product detail modal or page
            showNotification('Product details coming soon!', 'info');
        } else if (action === 'favorite') {
            // Toggle favorite state
            const icon = e.target.closest('.action-btn').querySelector('i');
            if (icon.classList.contains('fas')) {
                icon.classList.remove('fas');
                icon.classList.add('far');
                showNotification('Removed from favorites', 'info');
            } else {
                icon.classList.remove('far');
                icon.classList.add('fas');
                showNotification('Added to favorites', 'success');
            }
        }
    });
});

// ===== INQUIRY BUTTON =====
const inquiryBtn = document.querySelector('.inquiry-btn');
if (inquiryBtn) {
    inquiryBtn.addEventListener('click', () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ===== NEWSLETTER FORM =====
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // In a real application, this would send the email to your backend
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        this.reset();
    });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#d4af37' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        z-index: 10001;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// ===== LAZY LOADING FOR IMAGES =====
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// ===== TYPING ANIMATION =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animations when elements are visible
const typingElements = document.querySelectorAll('.typing-text');
const typingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const text = element.dataset.text || element.textContent;
            typeWriter(element, text);
            typingObserver.unobserve(element);
        }
    });
});

typingElements.forEach(el => typingObserver.observe(el));

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// ===== ACCESSIBILITY IMPROVEMENTS =====
// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        if (mainNav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
        }
        
        // Close any open modals or overlays
        const openModals = document.querySelectorAll('.modal.active');
        openModals.forEach(modal => modal.classList.remove('active'));
    }
});

// Focus management for better accessibility
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function trapFocus(element) {
    const focusableContent = element.querySelectorAll(focusableElements);
    const firstFocusableElement = focusableContent[0];
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    document.addEventListener('keydown', function(e) {
        const isTabPressed = e.key === 'Tab' || e.keyCode === 9;

        if (!isTabPressed) return;

        if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                e.preventDefault();
            }
        }
    });
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize any components that need DOM to be ready
    console.log('BMI Leather Art & Design website initialized');
    
    // Add any additional initialization code here
    updateActiveNavLink();
    
    // Initialize smooth scrolling for all internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ===== E-COMMERCE FUNCTIONALITY =====

// Shopping Cart Management
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.cartIcon = document.getElementById('cartIcon');
        this.cartCount = document.getElementById('cartCount');
        this.cartSidebar = document.getElementById('cartSidebar');
        this.cartClose = document.getElementById('cartClose');
        this.cartOverlay = document.getElementById('cartOverlay');
        this.cartItems = document.getElementById('cartItems');
        this.cartFooter = document.getElementById('cartFooter');
        this.cartSubtotal = document.getElementById('cartSubtotal');
        this.cartShipping = document.getElementById('cartShipping');
        this.cartTotal = document.getElementById('cartTotal');
        this.notificationToast = document.getElementById('notificationToast');
        
        this.init();
    }
    
    init() {
        this.updateCartUI();
        this.bindEvents();
    }
    
    bindEvents() {
        // Cart icon click
        if (this.cartIcon) {
            this.cartIcon.addEventListener('click', () => this.toggleCart());
        }
        
        // Cart close button
        if (this.cartClose) {
            this.cartClose.addEventListener('click', () => this.closeCart());
        }
        
        // Cart overlay click
        if (this.cartOverlay) {
            this.cartOverlay.addEventListener('click', () => this.closeCart());
        }
        
        // Add to cart buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart-btn') || e.target.closest('.add-to-cart-btn')) {
                const btn = e.target.classList.contains('add-to-cart-btn') ? e.target : e.target.closest('.add-to-cart-btn');
                this.addToCart(btn);
            }
        });
        
        // Checkout button
        const checkoutBtn = document.getElementById('checkout');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.checkout());
        }
        
        // View cart button
        const viewCartBtn = document.getElementById('viewCart');
        if (viewCartBtn) {
            viewCartBtn.addEventListener('click', () => {
                this.closeCart();
                window.location.href = 'product-new.html';
            });
        }
    }
    
    addToCart(button) {
        const productCard = button.closest('.product-card');
        const productId = button.dataset.product;
        const productPrice = parseInt(button.dataset.price);
        const productTitle = productCard.querySelector('.product-title').textContent;
        const productImage = productCard.querySelector('.product-image').src;
        const productCategory = productCard.querySelector('.product-category').textContent;
        
        const existingItem = this.items.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: productId,
                title: productTitle,
                price: productPrice,
                image: productImage,
                category: productCategory,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartUI();
        this.showNotification('Item added to cart!');
        
        // Add visual feedback to button
        button.innerHTML = '<i class="fas fa-check"></i> Added!';
        button.style.background = '#27ae60';
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
            button.style.background = '';
        }, 2000);
    }
    
    removeFromCart(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
    }
    
    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = newQuantity;
                this.saveCart();
                this.updateCartUI();
            }
        }
    }
    
    getCartTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    getCartCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }
    
    updateCartUI() {
        // Update cart count
        const count = this.getCartCount();
        if (this.cartCount) {
            this.cartCount.textContent = count;
            this.cartCount.style.display = count > 0 ? 'flex' : 'none';
        }
        
        // Update cart items
        if (this.cartItems) {
            if (this.items.length === 0) {
                this.cartItems.innerHTML = `
                    <div class="empty-cart">
                        <i class="fas fa-shopping-cart"></i>
                        <p>Your cart is empty</p>
                        <a href="product-new.html" class="btn-primary">Start Shopping</a>
                    </div>
                `;
                if (this.cartFooter) {
                    this.cartFooter.style.display = 'none';
                }
            } else {
                this.cartItems.innerHTML = this.items.map(item => `
                    <div class="cart-item" data-id="${item.id}">
                        <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                        <div class="cart-item-details">
                            <div class="cart-item-title">${item.title}</div>
                            <div class="cart-item-price">KES ${item.price.toLocaleString()}</div>
                            <div class="quantity-controls">
                                <button class="quantity-btn" onclick="cart.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                                <span class="quantity-display">${item.quantity}</span>
                                <button class="quantity-btn" onclick="cart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                                <button class="remove-item" onclick="cart.removeFromCart('${item.id}')" title="Remove item">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('');
                
                if (this.cartFooter) {
                    this.cartFooter.style.display = 'block';
                }
            }
        }
        
        // Update totals
        const subtotal = this.getCartTotal();
        const shipping = subtotal > 0 ? 500 : 0;
        const total = subtotal + shipping;
        
        if (this.cartSubtotal) {
            this.cartSubtotal.textContent = `KES ${subtotal.toLocaleString()}`;
        }
        if (this.cartShipping) {
            this.cartShipping.textContent = `KES ${shipping.toLocaleString()}`;
        }
        if (this.cartTotal) {
            this.cartTotal.textContent = `KES ${total.toLocaleString()}`;
        }
    }
    
    toggleCart() {
        if (this.cartSidebar && this.cartOverlay) {
            this.cartSidebar.classList.toggle('open');
            this.cartOverlay.classList.toggle('active');
            document.body.style.overflow = this.cartSidebar.classList.contains('open') ? 'hidden' : '';
        }
    }
    
    closeCart() {
        if (this.cartSidebar && this.cartOverlay) {
            this.cartSidebar.classList.remove('open');
            this.cartOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    showNotification(message) {
        if (this.notificationToast) {
            const toastMessage = this.notificationToast.querySelector('.toast-message');
            if (toastMessage) {
                toastMessage.textContent = message;
            }
            
            this.notificationToast.classList.add('show');
            setTimeout(() => {
                this.notificationToast.classList.remove('show');
            }, 3000);
        }
    }
    
    checkout() {
        if (this.items.length === 0) {
            this.showNotification('Your cart is empty!');
            return;
        }
        
        // Create WhatsApp message with cart details
        let message = `*New Order from BMI Leather Website*\n\n`;
        message += `*Items:*\n`;
        
        this.items.forEach(item => {
            message += `• ${item.title} - KES ${item.price.toLocaleString()} x ${item.quantity}\n`;
        });
        
        const subtotal = this.getCartTotal();
        const shipping = 500;
        const total = subtotal + shipping;
        
        message += `\n*Order Summary:*\n`;
        message += `Subtotal: KES ${subtotal.toLocaleString()}\n`;
        message += `Shipping: KES ${shipping.toLocaleString()}\n`;
        message += `*Total: KES ${total.toLocaleString()}*\n\n`;
        message += `Please confirm this order and provide delivery details.`;
        
        const whatsappURL = `https://wa.me/254707702773?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
        
        this.showNotification('Redirecting to WhatsApp for checkout...');
    }
    
    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartUI();
    }
    
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }
}

// Initialize shopping cart
const cart = new ShoppingCart();

// Make cart available globally for onclick handlers
window.cart = cart;

// ===== WISHLIST FUNCTIONALITY =====
class Wishlist {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('wishlist')) || [];
        this.updateWishlistCount();
    }

    addItem(product) {
        const existingIndex = this.items.findIndex(item => item.id === product.id);
        if (existingIndex === -1) {
            this.items.push(product);
            this.saveToStorage();
            this.updateWishlistCount();
            showNotification('Added to wishlist!', 'success');
            return true;
        } else {
            showNotification('Item already in wishlist', 'info');
            return false;
        }
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateWishlistCount();
        showNotification('Removed from wishlist', 'info');
    }

    isInWishlist(productId) {
        return this.items.some(item => item.id === productId);
    }

    saveToStorage() {
        localStorage.setItem('wishlist', JSON.stringify(this.items));
    }

    updateWishlistCount() {
        const wishlistCount = document.getElementById('wishlistCount');
        if (wishlistCount) {
            wishlistCount.textContent = this.items.length;
            wishlistCount.style.display = this.items.length > 0 ? 'inline' : 'none';
        }
    }

    getItems() {
        return this.items;
    }
}

// Initialize wishlist
const wishlist = new Wishlist();
window.wishlist = wishlist;

// ===== SEARCH FUNCTIONALITY =====
const searchIcon = document.getElementById('searchIcon');
if (searchIcon) {
    searchIcon.addEventListener('click', function() {
        window.location.href = 'shop.html?search=true';
    });
}

// ===== WISHLIST ICON FUNCTIONALITY =====
const wishlistIcon = document.getElementById('wishlistIcon');
if (wishlistIcon) {
    wishlistIcon.addEventListener('click', function() {
        window.location.href = 'shop.html?tab=wishlist';
    });
}

// ===== ENHANCED NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info', duration = 3000) {
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
                     type === 'warning' ? 'fas fa-exclamation-triangle' :
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
    }, duration);
}

// ===== QUICK SHOP FUNCTIONALITY =====
function quickShop(productId) {
    // This would typically fetch product data from an API
    // For now, redirect to shop page with product filter
    window.location.href = `shop.html?product=${productId}`;
}

// ===== ANALYTICS AND TRACKING =====
function trackEvent(category, action, label) {
    // Google Analytics 4 tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    
    // Console log for development
    console.log(`Analytics: ${category} - ${action} - ${label}`);
}

// Track cart events
const originalCartAdd = cart.addItem;
cart.addItem = function(product) {
    const result = originalCartAdd.call(this, product);
    if (result) {
        trackEvent('ecommerce', 'add_to_cart', product.name);
    }
    return result;
};

// ===== PAGE VISIBILITY API FOR PERFORMANCE =====
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden, pause animations or intensive operations
        console.log('Page hidden - pausing operations');
    } else {
        // Page is visible, resume operations
        console.log('Page visible - resuming operations');
    }
});

// ===== TOUCH AND MOBILE ENHANCEMENTS =====

// Improve touch interactions
function initializeTouchEnhancements() {
    // Add touch feedback to buttons
    const buttons = document.querySelectorAll('button, .btn, .product-card, .nav-link');
    
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        button.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 150);
        });
        
        button.addEventListener('touchcancel', function() {
            this.classList.remove('touch-active');
        });
    });
    
    // Prevent double-tap zoom on buttons
    const clickElements = document.querySelectorAll('button, .btn, input[type="button"], input[type="submit"]');
    clickElements.forEach(element => {
        element.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.click();
        }, { passive: false });
    });
}

// Handle viewport changes (orientation, keyboard)
function handleViewportChanges() {
    let viewportHeight = window.innerHeight;
    
    function updateViewport() {
        const currentHeight = window.innerHeight;
        const heightDifference = viewportHeight - currentHeight;
        
        // If height decreased significantly, keyboard is likely open
        if (heightDifference > 150) {
            document.body.classList.add('keyboard-open');
        } else {
            document.body.classList.remove('keyboard-open');
        }
        
        viewportHeight = currentHeight;
    }
    
    window.addEventListener('resize', updateViewport);
    window.addEventListener('orientationchange', function() {
        setTimeout(updateViewport, 500);
    });
}

// Optimize for iOS Safari
function optimizeForIOSSafari() {
    // Handle iOS Safari address bar height changes
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', () => {
        setTimeout(setViewportHeight, 100);
    });
    
    // Prevent bounce scrolling on iOS
    document.addEventListener('touchmove', function(e) {
        if (e.target.closest('.scrollable')) {
            return;
        }
        
        const element = e.target;
        const parent = element.parentElement;
        
        if (element.scrollHeight <= element.clientHeight && 
            parent.scrollHeight <= parent.clientHeight) {
            e.preventDefault();
        }
    }, { passive: false });
}

// Initialize all touch enhancements
function initializeMobileOptimizations() {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.classList.add('touch-device');
        initializeTouchEnhancements();
        handleViewportChanges();
        
        // iOS specific optimizations
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            document.body.classList.add('ios-device');
            optimizeForIOSSafari();
        }
        
        // Android specific optimizations
        if (/Android/.test(navigator.userAgent)) {
            document.body.classList.add('android-device');
        }
    }
}

// Call mobile optimizations
initializeMobileOptimizations();

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // In production, you might want to send this to an error tracking service
});
