// ===== ORDER TRACKING FUNCTIONALITY =====

// Sample order data (in production, this would come from your backend/database)
const sampleOrders = {
    'BMI240806001': {
        orderNumber: 'BMI240806001',
        email: 'john@example.com',
        date: '2025-08-06',
        status: 'in-production',
        currentStep: 2,
        totalSteps: 5,
        items: [
            {
                id: 1,
                name: 'Premium Leather Handbag',
                price: 15500,
                quantity: 1,
                image: 'img/1.jpg'
            }
        ],
        totals: {
            subtotal: 15500,
            shipping: 500,
            tax: 2560,
            total: 18560
        },
        shippingAddress: {
            name: 'John Doe',
            address: '123 Kenyatta Avenue',
            city: 'Nairobi',
            country: 'Kenya',
            phone: '+254 700 123 456'
        },
        shippingMethod: 'Standard Delivery (3-5 business days)',
        timeline: [
            { step: 1, title: 'Order Confirmed', time: 'Aug 6, 10:30 AM', completed: true },
            { step: 2, title: 'In Production', time: 'Aug 6, 2:15 PM', completed: true },
            { step: 3, title: 'Quality Check', time: 'Expected: Aug 7', completed: false },
            { step: 4, title: 'Shipped', time: 'Expected: Aug 8', completed: false },
            { step: 5, title: 'Delivered', time: 'Expected: Aug 10', completed: false }
        ]
    },
    'BMI240805002': {
        orderNumber: 'BMI240805002',
        email: 'jane@example.com',
        date: '2025-08-05',
        status: 'shipped',
        currentStep: 4,
        totalSteps: 5,
        items: [
            {
                id: 2,
                name: 'Handcrafted Leather Belt',
                price: 4500,
                quantity: 2,
                image: 'img/5.jpg'
            },
            {
                id: 3,
                name: 'Leather Wallet',
                price: 3500,
                quantity: 1,
                image: 'img/8.jpg'
            }
        ],
        totals: {
            subtotal: 12500,
            shipping: 500,
            tax: 2080,
            total: 15080
        },
        shippingAddress: {
            name: 'Jane Smith',
            address: '456 Uhuru Highway',
            city: 'Nairobi',
            country: 'Kenya',
            phone: '+254 701 234 567'
        },
        shippingMethod: 'Express Delivery (1-2 business days)',
        trackingNumber: 'TRK789012345',
        timeline: [
            { step: 1, title: 'Order Confirmed', time: 'Aug 5, 9:15 AM', completed: true },
            { step: 2, title: 'In Production', time: 'Aug 5, 11:30 AM', completed: true },
            { step: 3, title: 'Quality Check', time: 'Aug 5, 4:45 PM', completed: true },
            { step: 4, title: 'Shipped', time: 'Aug 6, 8:00 AM', completed: true },
            { step: 5, title: 'Delivered', time: 'Expected: Aug 7', completed: false }
        ]
    },
    'BMI240804003': {
        orderNumber: 'BMI240804003',
        email: 'mike@example.com',
        date: '2025-08-04',
        status: 'delivered',
        currentStep: 5,
        totalSteps: 5,
        items: [
            {
                id: 4,
                name: 'Leather Messenger Bag',
                price: 18500,
                quantity: 1,
                image: 'img/10.jpg'
            }
        ],
        totals: {
            subtotal: 18500,
            shipping: 0,
            tax: 2960,
            total: 21460
        },
        shippingAddress: {
            name: 'Mike Johnson',
            address: '789 Moi Avenue',
            city: 'Mombasa',
            country: 'Kenya',
            phone: '+254 702 345 678'
        },
        shippingMethod: 'Free Delivery (Order over KES 15,000)',
        trackingNumber: 'TRK123456789',
        timeline: [
            { step: 1, title: 'Order Confirmed', time: 'Aug 4, 2:20 PM', completed: true },
            { step: 2, title: 'In Production', time: 'Aug 4, 4:00 PM', completed: true },
            { step: 3, title: 'Quality Check', time: 'Aug 5, 10:15 AM', completed: true },
            { step: 4, title: 'Shipped', time: 'Aug 5, 3:30 PM', completed: true },
            { step: 5, title: 'Delivered', time: 'Aug 6, 11:45 AM', completed: true }
        ]
    }
};

// DOM Elements
const trackingForm = document.getElementById('trackingForm');
const orderStatus = document.getElementById('orderStatus');
const orderNumberInput = document.getElementById('orderNumber');
const emailInput = document.getElementById('email');

// Initialize tracking functionality
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    checkURLParameters();
});

// Setup event listeners
function setupEventListeners() {
    if (trackingForm) {
        trackingForm.addEventListener('submit', handleTrackingSubmit);
    }
}

// Handle tracking form submission
function handleTrackingSubmit(e) {
    e.preventDefault();
    
    const orderNumber = orderNumberInput.value.trim().toUpperCase();
    const email = emailInput.value.trim().toLowerCase();
    
    if (!orderNumber || !email) {
        showNotification('Please enter both order number and email address', 'error');
        return;
    }
    
    trackOrder(orderNumber, email);
}

// Track order function
function trackOrder(orderNumber, email) {
    // Show loading state
    const trackBtn = document.querySelector('.track-btn');
    const originalText = trackBtn.innerHTML;
    trackBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Tracking...';
    trackBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        const order = sampleOrders[orderNumber];
        
        if (!order) {
            showNotification('Order not found. Please check your order number.', 'error');
            trackBtn.innerHTML = originalText;
            trackBtn.disabled = false;
            return;
        }
        
        if (order.email !== email) {
            showNotification('Email address does not match our records.', 'error');
            trackBtn.innerHTML = originalText;
            trackBtn.disabled = false;
            return;
        }
        
        // Display order status
        displayOrderStatus(order);
        
        // Reset button
        trackBtn.innerHTML = originalText;
        trackBtn.disabled = false;
        
        // Scroll to results
        orderStatus.scrollIntoView({ behavior: 'smooth' });
        
    }, 1500);
}

// Display order status
function displayOrderStatus(order) {
    // Update order header
    document.getElementById('displayOrderNumber').textContent = `#${order.orderNumber}`;
    document.getElementById('orderDate').textContent = formatDate(order.date);
    
    // Update progress bar
    const progressPercentage = (order.currentStep / order.totalSteps) * 100;
    document.getElementById('progressFill').style.width = `${progressPercentage}%`;
    
    // Update progress steps
    updateProgressSteps(order);
    
    // Update current status
    updateCurrentStatus(order);
    
    // Update order items
    updateOrderItems(order.items);
    
    // Update totals
    updateOrderTotals(order.totals);
    
    // Update shipping information
    updateShippingInfo(order);
    
    // Show order status container
    orderStatus.style.display = 'block';
}

// Update progress steps
function updateProgressSteps(order) {
    const steps = document.querySelectorAll('.step');
    
    steps.forEach((step, index) => {
        const stepNumber = index + 1;
        const stepData = order.timeline[index];
        
        // Remove all classes
        step.classList.remove('completed', 'active');
        
        // Update step info
        const stepTitle = step.querySelector('.step-title');
        const stepTime = step.querySelector('.step-time');
        
        if (stepTitle) stepTitle.textContent = stepData.title;
        if (stepTime) stepTime.textContent = stepData.time;
        
        // Update step icon
        const stepIcon = step.querySelector('.step-icon i');
        
        if (stepNumber < order.currentStep || (stepNumber === order.currentStep && order.status === 'delivered')) {
            step.classList.add('completed');
            stepIcon.className = 'fas fa-check';
        } else if (stepNumber === order.currentStep) {
            step.classList.add('active');
            // Keep original icon for active step
            if (stepNumber === 1) stepIcon.className = 'fas fa-check';
            else if (stepNumber === 2) stepIcon.className = 'fas fa-tools';
            else if (stepNumber === 3) stepIcon.className = 'fas fa-box';
            else if (stepNumber === 4) stepIcon.className = 'fas fa-shipping-fast';
            else if (stepNumber === 5) stepIcon.className = 'fas fa-home';
        } else {
            // Future step
            if (stepNumber === 1) stepIcon.className = 'far fa-circle';
            else if (stepNumber === 2) stepIcon.className = 'fas fa-tools';
            else if (stepNumber === 3) stepIcon.className = 'fas fa-box';
            else if (stepNumber === 4) stepIcon.className = 'fas fa-shipping-fast';
            else if (stepNumber === 5) stepIcon.className = 'fas fa-home';
        }
    });
}

// Update current status
function updateCurrentStatus(order) {
    const statusBadge = document.querySelector('.status-badge');
    const statusMessage = document.querySelector('.status-message');
    
    // Remove existing status classes
    statusBadge.className = 'status-badge';
    
    let statusText, statusClass, message;
    
    switch (order.status) {
        case 'confirmed':
            statusText = 'Order Confirmed';
            statusClass = 'status-confirmed';
            message = 'Your order has been confirmed and will be processed soon.';
            break;
        case 'in-production':
            statusText = 'In Production';
            statusClass = 'status-in-progress';
            message = 'Your handcrafted leather item is being carefully made by our skilled artisans. We\'ll notify you once it\'s ready for quality check.';
            break;
        case 'quality-check':
            statusText = 'Quality Check';
            statusClass = 'status-in-progress';
            message = 'Your item is undergoing our thorough quality inspection to ensure it meets our high standards.';
            break;
        case 'shipped':
            statusText = 'Shipped';
            statusClass = 'status-shipped';
            message = `Your order has been shipped${order.trackingNumber ? ` with tracking number: ${order.trackingNumber}` : ''}. You should receive it soon!`;
            break;
        case 'delivered':
            statusText = 'Delivered';
            statusClass = 'status-delivered';
            message = 'Your order has been successfully delivered. We hope you love your new leather item!';
            break;
        default:
            statusText = 'Processing';
            statusClass = 'status-processing';
            message = 'Your order is being processed.';
    }
    
    statusBadge.classList.add(statusClass);
    statusBadge.innerHTML = `<i class="fas fa-${getStatusIcon(order.status)}"></i> ${statusText}`;
    statusMessage.textContent = message;
}

// Get status icon
function getStatusIcon(status) {
    switch (status) {
        case 'confirmed': return 'check-circle';
        case 'in-production': return 'tools';
        case 'quality-check': return 'search';
        case 'shipped': return 'shipping-fast';
        case 'delivered': return 'check-double';
        default: return 'clock';
    }
}

// Update order items
function updateOrderItems(items) {
    const orderItemsContainer = document.getElementById('orderItems');
    
    orderItemsContainer.innerHTML = items.map(item => `
        <div class="order-item">
            <img src="${item.image}" alt="${item.name}" class="item-image">
            <div class="item-details">
                <h5 class="item-name">${item.name}</h5>
                <div class="item-meta">
                    <span class="item-quantity">Qty: ${item.quantity}</span>
                    <span class="item-price">KES ${(item.price * item.quantity).toLocaleString()}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Update order totals
function updateOrderTotals(totals) {
    document.getElementById('orderSubtotal').textContent = `KES ${totals.subtotal.toLocaleString()}`;
    document.getElementById('orderShipping').textContent = totals.shipping === 0 ? 'Free' : `KES ${totals.shipping.toLocaleString()}`;
    document.getElementById('orderTax').textContent = `KES ${totals.tax.toLocaleString()}`;
    document.getElementById('orderTotal').textContent = `KES ${totals.total.toLocaleString()}`;
}

// Update shipping information
function updateShippingInfo(order) {
    const shippingAddress = document.getElementById('shippingAddress');
    const shippingMethod = document.getElementById('shippingMethod');
    
    shippingAddress.innerHTML = `
        ${order.shippingAddress.name}<br>
        ${order.shippingAddress.address}<br>
        ${order.shippingAddress.city}, ${order.shippingAddress.country}<br>
        ${order.shippingAddress.phone}
    `;
    
    shippingMethod.textContent = order.shippingMethod;
}

// Fill sample order for testing
function fillSampleOrder(orderNumber, email) {
    orderNumberInput.value = orderNumber;
    emailInput.value = email;
    
    // Auto-submit for demo
    setTimeout(() => {
        trackOrder(orderNumber, email);
    }, 500);
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Check URL parameters for auto-tracking
function checkURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const orderNumber = urlParams.get('order');
    const email = urlParams.get('email');
    
    if (orderNumber && email) {
        orderNumberInput.value = orderNumber;
        emailInput.value = email;
        trackOrder(orderNumber, email);
    }
}

// Show notification function
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

// Add tracking styles
const trackingStyles = `
<style>
.tracking-section {
    padding: 60px 0;
    background: var(--primary-cream);
}

.tracking-form-container {
    max-width: 600px;
    margin: 0 auto 60px;
}

.tracking-form-card {
    background: white;
    padding: 40px;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    text-align: center;
}

.tracking-form-card h2 {
    font-family: var(--font-display);
    font-size: var(--font-size-2xl);
    color: var(--text-primary);
    margin-bottom: 10px;
}

.tracking-form-card p {
    color: var(--text-secondary);
    margin-bottom: 30px;
}

.tracking-form .form-group {
    margin-bottom: 20px;
    text-align: left;
}

.tracking-form label {
    display: block;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 8px;
}

.tracking-form input {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e0e0e0;
    border-radius: var(--border-radius);
    font-size: 16px;
    transition: border-color 0.3s ease;
}

.tracking-form input:focus {
    outline: none;
    border-color: var(--accent-gold);
}

.tracking-form small {
    color: var(--text-light);
    font-size: 14px;
    margin-top: 5px;
    display: block;
}

.track-btn {
    width: 100%;
    padding: 15px;
    font-size: 16px;
    font-weight: 600;
    margin-top: 10px;
}

.order-status-container {
    max-width: 800px;
    margin: 0 auto;
    display: grid;
    gap: 30px;
}

.order-info-card,
.order-items-card,
.shipping-info-card {
    background: white;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    padding: 30px;
}

.order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
}

.order-header h3 {
    font-family: var(--font-display);
    font-size: var(--font-size-xl);
    color: var(--text-primary);
}

.order-date {
    color: var(--text-secondary);
}

.order-progress {
    margin-bottom: 30px;
}

.progress-bar {
    width: 100%;
    height: 4px;
    background: #e0e0e0;
    border-radius: 2px;
    margin-bottom: 30px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: var(--accent-gold);
    border-radius: 2px;
    transition: width 1s ease;
}

.progress-steps {
    display: flex;
    justify-content: space-between;
    position: relative;
}

.step {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    flex: 1;
    position: relative;
}

.step-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
    color: white;
    font-size: 18px;
    transition: all 0.3s ease;
}

.step.completed .step-icon {
    background: var(--accent-gold);
}

.step.active .step-icon {
    background: var(--charcoal);
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

.step-info {
    flex: 1;
}

.step-title {
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 5px;
    font-size: 14px;
}

.step-time {
    color: var(--text-secondary);
    font-size: 12px;
}

.current-status {
    text-align: center;
}

.status-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    border-radius: 25px;
    font-weight: 600;
    margin-bottom: 15px;
}

.status-confirmed { background: #e8f5e8; color: #2e7d2e; }
.status-in-progress { background: #fff3cd; color: #856404; }
.status-shipped { background: #d1ecf1; color: #0c5460; }
.status-delivered { background: #d4edda; color: #155724; }

.status-message {
    color: var(--text-secondary);
    line-height: 1.6;
}

.order-items-list {
    margin-bottom: 30px;
}

.order-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px 0;
    border-bottom: 1px solid #f0f0f0;
}

.order-item:last-child {
    border-bottom: none;
}

.item-image {
    width: 60px;
    height: 60px;
    border-radius: var(--border-radius);
    object-fit: cover;
}

.item-details {
    flex: 1;
}

.item-name {
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 5px;
}

.item-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.item-quantity {
    color: var(--text-secondary);
    font-size: 14px;
}

.item-price {
    font-weight: 600;
    color: var(--accent-gold);
}

.order-totals {
    border-top: 1px solid #eee;
    padding-top: 20px;
}

.total-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.total-final {
    font-weight: 600;
    font-size: 18px;
    color: var(--text-primary);
    border-top: 1px solid #eee;
    padding-top: 10px;
    margin-top: 10px;
}

.shipping-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
}

.shipping-details h5 {
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 10px;
}

.shipping-details address {
    font-style: normal;
    line-height: 1.6;
    color: var(--text-secondary);
}

.tracking-actions {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-top: 30px;
}

.sample-orders {
    max-width: 600px;
    margin: 60px auto 0;
    padding: 30px;
    background: white;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    text-align: center;
}

.sample-orders h3 {
    font-family: var(--font-display);
    color: var(--text-primary);
    margin-bottom: 20px;
}

.sample-list {
    display: grid;
    gap: 10px;
}

.sample-item {
    padding: 15px;
    background: var(--primary-cream);
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: left;
}

.sample-item:hover {
    background: var(--secondary-cream);
    transform: translateY(-2px);
}

@media (max-width: 768px) {
    .progress-steps {
        flex-direction: column;
        gap: 20px;
    }
    
    .step {
        flex-direction: row;
        text-align: left;
        align-items: center;
    }
    
    .step-icon {
        margin-bottom: 0;
        margin-right: 15px;
        width: 40px;
        height: 40px;
        font-size: 16px;
    }
    
    .shipping-details {
        grid-template-columns: 1fr;
        gap: 20px;
    }
    
    .tracking-actions {
        flex-direction: column;
    }
}
</style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', trackingStyles);
