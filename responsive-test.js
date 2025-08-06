/* ===== RESPONSIVE TESTING UTILITY ===== */

/* Add this script to test responsive behavior */
(function() {
    'use strict';
    
    // Device size indicators (for development only)
    function createDeviceIndicator() {
        if (document.getElementById('device-indicator')) return;
        
        const indicator = document.createElement('div');
        indicator.id = 'device-indicator';
        indicator.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 12px;
            font-family: monospace;
            z-index: 10000;
            pointer-events: none;
        `;
        document.body.appendChild(indicator);
        
        function updateIndicator() {
            const width = window.innerWidth;
            let device, breakpoint;
            
            if (width < 576) {
                device = 'XS';
                breakpoint = '< 576px';
            } else if (width < 768) {
                device = 'SM';
                breakpoint = '576-767px';
            } else if (width < 992) {
                device = 'MD';
                breakpoint = '768-991px';
            } else if (width < 1200) {
                device = 'LG';
                breakpoint = '992-1199px';
            } else if (width < 1400) {
                device = 'XL';
                breakpoint = '1200-1399px';
            } else {
                device = 'XXL';
                breakpoint = '>= 1400px';
            }
            
            indicator.textContent = `${device}: ${width}px (${breakpoint})`;
        }
        
        updateIndicator();
        window.addEventListener('resize', updateIndicator);
    }
    
    // Responsive grid overlay (for development)
    function createGridOverlay() {
        if (document.getElementById('grid-overlay')) return;
        
        const overlay = document.createElement('div');
        overlay.id = 'grid-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
            background-image: 
                linear-gradient(to right, rgba(255,0,0,0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,0,0,0.1) 1px, transparent 1px);
            background-size: 50px 50px;
            display: none;
        `;
        document.body.appendChild(overlay);
    }
    
    // Touch area visualization
    function visualizeTouchAreas() {
        const touchElements = document.querySelectorAll('button, .btn, .nav-link, .product-card, input[type="button"], input[type="submit"]');
        
        touchElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.height < 44) {
                element.style.outline = '2px dashed orange';
                element.title = (element.title || '') + ' [Touch target too small: ' + Math.round(rect.height) + 'px]';
            }
        });
    }
    
    // Keyboard shortcuts for testing
    document.addEventListener('keydown', function(e) {
        // Alt + D: Toggle device indicator
        if (e.altKey && e.key === 'd') {
            const indicator = document.getElementById('device-indicator');
            if (indicator) {
                indicator.remove();
            } else {
                createDeviceIndicator();
            }
        }
        
        // Alt + G: Toggle grid overlay
        if (e.altKey && e.key === 'g') {
            const overlay = document.getElementById('grid-overlay');
            if (!overlay) {
                createGridOverlay();
            }
            const grid = document.getElementById('grid-overlay');
            grid.style.display = grid.style.display === 'none' ? 'block' : 'none';
        }
        
        // Alt + T: Visualize touch areas
        if (e.altKey && e.key === 't') {
            visualizeTouchAreas();
        }
        
        // Alt + R: Remove all testing utilities
        if (e.altKey && e.key === 'r') {
            ['device-indicator', 'grid-overlay'].forEach(id => {
                const element = document.getElementById(id);
                if (element) element.remove();
            });
            
            // Remove touch area highlights
            document.querySelectorAll('[style*="outline"]').forEach(element => {
                element.style.outline = '';
            });
        }
    });
    
    // Auto-create device indicator in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        createDeviceIndicator();
        console.log(`
🔧 RESPONSIVE TESTING UTILITIES
===============================
Alt + D: Toggle Device Size Indicator
Alt + G: Toggle Grid Overlay
Alt + T: Visualize Touch Areas
Alt + R: Remove All Testing Utilities

Current breakpoints:
• XS: < 576px (Mobile phones)
• SM: 576-767px (Large phones)
• MD: 768-991px (Tablets)
• LG: 992-1199px (Small desktops)
• XL: 1200-1399px (Large desktops)
• XXL: >= 1400px (Extra large screens)
        `);
    }
    
    // Responsive image loading
    function optimizeImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
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
            
            images.forEach(img => imageObserver.observe(img));
        }
    }
    
    // Initialize optimizations
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', optimizeImages);
    } else {
        optimizeImages();
    }
    
    // Performance monitoring
    function logPerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    console.log('📊 Performance Metrics:', {
                        'DOM Content Loaded': Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart) + 'ms',
                        'Full Load Time': Math.round(perfData.loadEventEnd - perfData.loadEventStart) + 'ms',
                        'First Paint': Math.round(perfData.responseEnd - perfData.requestStart) + 'ms'
                    });
                }, 0);
            });
        }
    }
    
    logPerformance();
})();
