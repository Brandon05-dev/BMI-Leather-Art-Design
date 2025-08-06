// ===== CHECKOUT FUNCTIONALITY =====

// Global variables
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let orderData = {};
let promoCodes = {
    'WELCOME10': { type: 'percentage', value: 10, minOrder: 5000 },
    'LEATHER20': { type: 'percentage', value: 20, minOrder: 10000 },
    'FREESHIP': { type: 'shipping', value: 0, minOrder: 3000 },
    'FIRST5000': { type: 'fixed', value: 5000, minOrder: 15000 }
};
let appliedPromo = null;

// DOM Elements
const checkoutForm = document.getElementById('checkoutForm');
const orderItems = document.getElementById('orderItems');
const orderSubtotal = document.getElementById('orderSubtotal');
const orderShipping = document.getElementById('orderShipping');
const orderTax = document.getElementById('orderTax');
const orderTotal = document.getElementById('orderTotal');
const placeOrderBtn = document.getElementById('placeOrderBtn');
const loadingOverlay = document.getElementById('loadingOverlay');
const promoCodeInput = document.getElementById('promoCode');
const applyPromoBtn = document.getElementById('applyPromo');
const promoMessage = document.getElementById('promoMessage');

// Initialize checkout
document.addEventListener('DOMContentLoaded', function() {
    // Redirect if cart is empty
    if (cart.length === 0) {
        window.location.href = 'shop.html';
        return;
    }
    
    initializeCheckout();
    setupEventListeners();
    renderOrderSummary();
    updateOrderTotals();
});

// Initialize checkout functionality
function initializeCheckout() {
    // Auto-fill phone number for M-Pesa if available
    const phoneInput = document.getElementById('phone');
    const mpesaPhoneInput = document.getElementById('mpesaPhone');
    
    if (phoneInput && mpesaPhoneInput) {
        phoneInput.addEventListener('input', function() {
            if (document.querySelector('input[name="payment"]:checked').value === 'mpesa') {
                mpesaPhoneInput.value = this.value;
            }
        });
    }
    
    // Set default values
    document.getElementById('country').value = 'kenya';
    
    // Format phone number inputs
    formatPhoneInputs();
    
    // Setup form validation
    setupFormValidation();
}

// Setup event listeners
function setupEventListeners() {
    // Payment method change
    document.querySelectorAll('input[name="payment"]').forEach(radio => {
        radio.addEventListener('change', function() {
            showPaymentDetails(this.value);
        });
    });
    
    // Shipping method change
    document.querySelectorAll('input[name="shipping"]').forEach(radio => {
        radio.addEventListener('change', function() {
            updateOrderTotals();
        });
    });
    
    // Form submission
    checkoutForm.addEventListener('submit', handleFormSubmission);
    
    // Promo code
    applyPromoBtn.addEventListener('click', applyPromoCode);
    promoCodeInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            applyPromoCode();
        }
    });
    
    // Card number formatting
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', formatCardNumber);
    }
    
    // Expiry date formatting
    const expiryInput = document.getElementById('expiryDate');
    if (expiryInput) {
        expiryInput.addEventListener('input', formatExpiryDate);
    }
    
    // Auto-fill billing same as shipping
    const sameAsShippingCheckbox = document.getElementById('sameAsShipping');
    if (sameAsShippingCheckbox) {
        sameAsShippingCheckbox.addEventListener('change', function() {
            if (this.checked) {
                fillBillingFromShipping();
            }
        });
    }
}

// Show payment details based on selected method
function showPaymentDetails(paymentMethod) {
    // Hide all payment details
    document.querySelectorAll('.payment-details').forEach(detail => {
        detail.style.display = 'none';
    });
    
    // Show selected payment details
    const detailsId = paymentMethod + 'Details';
    const detailsElement = document.getElementById(detailsId);
    if (detailsElement) {
        detailsElement.style.display = 'block';
    }
    
    // Auto-fill M-Pesa phone from main phone
    if (paymentMethod === 'mpesa') {
        const phoneInput = document.getElementById('phone');
        const mpesaPhoneInput = document.getElementById('mpesaPhone');
        if (phoneInput && mpesaPhoneInput && phoneInput.value) {
            mpesaPhoneInput.value = phoneInput.value;
        }
    }
}

// Format phone number inputs
function formatPhoneInputs() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            
            // Handle Kenya format
            if (value.startsWith('254')) {
                value = value.substring(0, 12);
                this.value = '+' + value.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
            } else if (value.startsWith('0')) {
                value = '254' + value.substring(1);
                value = value.substring(0, 12);
                this.value = '+' + value.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
            } else if (value.length > 0 && !value.startsWith('254')) {
                value = '254' + value;
                value = value.substring(0, 12);
                this.value = '+' + value.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
            }
        });
    });
}

// Format card number
function formatCardNumber() {
    let value = this.value.replace(/\D/g, '');
    value = value.substring(0, 16);
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    this.value = value;
}

// Format expiry date
function formatExpiryDate() {
    let value = this.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    this.value = value;
}

// Setup form validation
function setupFormValidation() {
    const inputs = checkoutForm.querySelectorAll('input[required], select[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

// Validate individual field
function validateField(field) {
    const formGroup = field.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    let isValid = true;
    let message = '';
    
    // Remove existing error state
    formGroup.classList.remove('error', 'success');
    
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        message = 'This field is required';
    } else {
        // Specific validations
        switch (field.name) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (field.value && !emailRegex.test(field.value)) {
                    isValid = false;
                    message = 'Please enter a valid email address';
                }
                break;
                
            case 'phone':
            case 'mpesaPhone':
                const phoneRegex = /^\+254\s\d{3}\s\d{3}\s\d{3}$/;
                if (field.value && !phoneRegex.test(field.value)) {
                    isValid = false;
                    message = 'Please enter a valid phone number';
                }
                break;
                
            case 'cardNumber':
                const cardRegex = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/;
                if (field.value && !cardRegex.test(field.value)) {
                    isValid = false;
                    message = 'Please enter a valid card number';
                }
                break;
                
            case 'expiryDate':
                const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
                if (field.value && !expiryRegex.test(field.value)) {
                    isValid = false;
                    message = 'Please enter a valid expiry date (MM/YY)';
                } else if (field.value) {
                    const [month, year] = field.value.split('/');
                    const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
                    if (expiry < new Date()) {
                        isValid = false;
                        message = 'Card has expired';
                    }
                }
                break;
                
            case 'cvv':
                const cvvRegex = /^\d{3,4}$/;
                if (field.value && !cvvRegex.test(field.value)) {
                    isValid = false;
                    message = 'Please enter a valid CVV';
                }
                break;
        }
    }
    
    if (!isValid) {
        formGroup.classList.add('error');
        errorMessage.textContent = message;
    } else if (field.value.trim()) {
        formGroup.classList.add('success');
    }
    
    return isValid;
}

// Validate entire form
function validateForm() {
    const requiredFields = checkoutForm.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // Validate payment-specific fields
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    if (paymentMethod === 'mpesa') {
        const mpesaPhone = document.getElementById('mpesaPhone');
        if (!validateField(mpesaPhone)) {
            isValid = false;
        }
    } else if (paymentMethod === 'card') {
        const cardFields = ['cardNumber', 'cardName', 'expiryDate', 'cvv'];
        cardFields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field && !validateField(field)) {
                isValid = false;
            }
        });
    }
    
    // Validate terms checkbox
    const termsCheckbox = document.getElementById('terms');
    if (!termsCheckbox.checked) {
        isValid = false;
        showNotification('Please accept the terms and conditions', 'error');
    }
    
    return isValid;
}

// Render order summary
function renderOrderSummary() {
    if (cart.length === 0) {
        orderItems.innerHTML = '<p>No items in cart</p>';
        return;
    }
    
    orderItems.innerHTML = cart.map(item => `
        <div class="order-item">
            <img src="${item.image}" alt="${item.name}" class="item-image">
            <div class="item-details">
                <h4 class="item-title">${item.name}</h4>
                <div class="item-category">${getCategoryName(item.category)}</div>
                <div class="item-quantity-price">
                    <span class="item-quantity">Qty: ${item.quantity}</span>
                    <span class="item-price">KES ${(item.price * item.quantity).toLocaleString()}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Update order totals
function updateOrderTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let shipping = getShippingCost();
    let discount = 0;
    
    // Apply promo code discount
    if (appliedPromo) {
        if (appliedPromo.type === 'percentage') {
            discount = (subtotal * appliedPromo.value) / 100;
        } else if (appliedPromo.type === 'fixed') {
            discount = appliedPromo.value;
        } else if (appliedPromo.type === 'shipping') {
            shipping = 0;
        }
    }
    
    const discountedSubtotal = subtotal - discount;
    const tax = Math.round(discountedSubtotal * 0.16); // 16% VAT
    const total = discountedSubtotal + shipping + tax;
    
    // Update display
    orderSubtotal.textContent = `KES ${subtotal.toLocaleString()}`;
    orderShipping.textContent = shipping === 0 ? 'Free' : `KES ${shipping.toLocaleString()}`;
    orderTax.textContent = `KES ${tax.toLocaleString()}`;
    orderTotal.textContent = `KES ${total.toLocaleString()}`;
    
    // Update button text with total
    const btnText = placeOrderBtn.querySelector('span');
    if (btnText) {
        btnText.textContent = `Place Order • KES ${total.toLocaleString()}`;
    }
    
    // Store totals for order processing
    orderData.totals = {
        subtotal,
        shipping,
        tax,
        discount,
        total
    };
}

// Get shipping cost
function getShippingCost() {
    const shippingMethod = document.querySelector('input[name="shipping"]:checked');
    if (!shippingMethod) return 500; // Default
    
    return parseInt(shippingMethod.dataset.cost) || 0;
}

// Get category name
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

// Apply promo code
function applyPromoCode() {
    const code = promoCodeInput.value.trim().toUpperCase();
    if (!code) return;
    
    const promo = promoCodes[code];
    if (!promo) {
        showPromoMessage('Invalid promo code', 'error');
        return;
    }
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (subtotal < promo.minOrder) {
        showPromoMessage(`Minimum order of KES ${promo.minOrder.toLocaleString()} required`, 'error');
        return;
    }
    
    appliedPromo = promo;
    showPromoMessage(`Promo code applied successfully!`, 'success');
    promoCodeInput.disabled = true;
    applyPromoBtn.textContent = 'Applied';
    applyPromoBtn.disabled = true;
    
    updateOrderTotals();
}

// Show promo message
function showPromoMessage(message, type) {
    promoMessage.textContent = message;
    promoMessage.className = `promo-message ${type}`;
    
    setTimeout(() => {
        if (type === 'error') {
            promoMessage.textContent = '';
            promoMessage.className = 'promo-message';
        }
    }, 5000);
}

// Handle form submission
async function handleFormSubmission(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        showNotification('Please correct the errors and try again', 'error');
        return;
    }
    
    // Show loading
    showLoading(true);
    
    try {
        // Collect form data
        const formData = new FormData(checkoutForm);
        orderData.customer = Object.fromEntries(formData.entries());
        orderData.items = cart;
        orderData.timestamp = new Date().toISOString();
        orderData.orderNumber = generateOrderNumber();
        
        // Process payment based on method
        const paymentMethod = formData.get('payment');
        const paymentResult = await processPayment(paymentMethod, orderData);
        
        if (paymentResult.success) {
            // Clear cart
            localStorage.removeItem('cart');
            
            // Store order for confirmation page
            localStorage.setItem('lastOrder', JSON.stringify(orderData));
            
            // Redirect to confirmation
            window.location.href = 'order-confirmation.html';
        } else {
            throw new Error(paymentResult.error || 'Payment failed');
        }
        
    } catch (error) {
        console.error('Order processing error:', error);
        showNotification(error.message || 'An error occurred. Please try again.', 'error');
    } finally {
        showLoading(false);
    }
}

// Process payment
async function processPayment(method, orderData) {
    switch (method) {
        case 'mpesa':
            return await processMpesaPayment(orderData);
        case 'card':
            return await processCardPayment(orderData);
        case 'paypal':
            return await processPayPalPayment(orderData);
        case 'bank':
            return await processBankTransfer(orderData);
        default:
            throw new Error('Invalid payment method');
    }
}

// Process M-Pesa payment
async function processMpesaPayment(orderData) {
    const phoneNumber = orderData.customer.mpesaPhone.replace(/\s/g, '').replace('+', '');
    const amount = orderData.totals.total;
    
    // Simulate M-Pesa STK push
    try {
        // In a real implementation, this would call your backend API
        // which would then call the M-Pesa API
        const response = await simulatePayment({
            method: 'mpesa',
            phone: phoneNumber,
            amount: amount,
            reference: orderData.orderNumber
        });
        
        if (response.ResponseCode === '0') {
            return { success: true, transactionId: response.CheckoutRequestID };
        } else {
            throw new Error('M-Pesa payment failed. Please try again.');
        }
    } catch (error) {
        throw error;
    }
}

// Process card payment
async function processCardPayment(orderData) {
    // In a real implementation, you'd use Stripe, PayStack, or similar
    // This is a simulation
    try {
        const response = await simulatePayment({
            method: 'card',
            amount: orderData.totals.total,
            reference: orderData.orderNumber,
            card: {
                number: orderData.customer.cardNumber,
                name: orderData.customer.cardName,
                expiry: orderData.customer.expiryDate,
                cvv: orderData.customer.cvv
            }
        });
        
        if (response.status === 'success') {
            return { success: true, transactionId: response.transactionId };
        } else {
            throw new Error('Card payment failed. Please check your details.');
        }
    } catch (error) {
        throw error;
    }
}

// Process PayPal payment
async function processPayPalPayment(orderData) {
    // In a real implementation, you'd integrate with PayPal SDK
    try {
        const response = await simulatePayment({
            method: 'paypal',
            amount: orderData.totals.total,
            reference: orderData.orderNumber
        });
        
        return { success: true, transactionId: response.transactionId };
    } catch (error) {
        throw error;
    }
}

// Process bank transfer
async function processBankTransfer(orderData) {
    // Bank transfers are typically manual verification
    // This just creates the order with pending status
    return { 
        success: true, 
        transactionId: 'BANK_' + orderData.orderNumber,
        status: 'pending_verification'
    };
}

// Simulate payment (replace with real payment gateway integration)
async function simulatePayment(paymentData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate 95% success rate
            if (Math.random() > 0.05) {
                resolve({
                    status: 'success',
                    ResponseCode: '0',
                    CheckoutRequestID: 'ws_CO_' + Date.now(),
                    transactionId: 'TXN_' + Date.now()
                });
            } else {
                reject(new Error('Payment gateway error. Please try again.'));
            }
        }, 2000);
    });
}

// Generate order number
function generateOrderNumber() {
    const date = new Date();
    const year = date.getFullYear().toString().substr(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    
    return `BMI${year}${month}${day}${random}`;
}

// Show loading overlay
function showLoading(show) {
    if (show) {
        loadingOverlay.style.display = 'flex';
        placeOrderBtn.disabled = true;
        const btnLoading = placeOrderBtn.querySelector('.btn-loading');
        if (btnLoading) {
            btnLoading.style.display = 'block';
        }
    } else {
        loadingOverlay.style.display = 'none';
        placeOrderBtn.disabled = false;
        const btnLoading = placeOrderBtn.querySelector('.btn-loading');
        if (btnLoading) {
            btnLoading.style.display = 'none';
        }
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
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

// Auto-save form data
function autoSaveFormData() {
    const formData = new FormData(checkoutForm);
    const data = Object.fromEntries(formData.entries());
    localStorage.setItem('checkoutFormData', JSON.stringify(data));
}

// Restore form data
function restoreFormData() {
    const savedData = localStorage.getItem('checkoutFormData');
    if (savedData) {
        const data = JSON.parse(savedData);
        Object.keys(data).forEach(key => {
            const field = document.querySelector(`[name="${key}"]`);
            if (field) {
                if (field.type === 'checkbox') {
                    field.checked = data[key] === 'on';
                } else if (field.type === 'radio') {
                    if (field.value === data[key]) {
                        field.checked = true;
                    }
                } else {
                    field.value = data[key];
                }
            }
        });
    }
}

// Setup auto-save
checkoutForm.addEventListener('input', debounce(autoSaveFormData, 1000));

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

// Clear saved form data on successful order
window.addEventListener('beforeunload', function() {
    // Don't clear if navigating to confirmation page
    if (!window.location.hash.includes('confirmation')) {
        localStorage.removeItem('checkoutFormData');
    }
});

// Security: Clear sensitive data from memory
window.addEventListener('beforeunload', function() {
    // Clear sensitive form data
    const sensitiveFields = ['cardNumber', 'cvv', 'mpesaPhone'];
    sensitiveFields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.value = '';
        }
    });
});

// Initialize payment method display
document.addEventListener('DOMContentLoaded', function() {
    const defaultPayment = document.querySelector('input[name="payment"]:checked');
    if (defaultPayment) {
        showPaymentDetails(defaultPayment.value);
    }
});
