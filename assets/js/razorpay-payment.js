// Razorpay Payment Integration for AMVYA
class AMVYAPayment {
    constructor() {
        this.razorpayKeyId = 'rzp_test_1234567890'; // Replace with your actual Razorpay Key ID
        this.companyName = 'AMVYA';
        this.companyLogo = 'https://via.placeholder.com/200x100/E6CCC2/3A3A3A?text=AMVYA';
        this.theme = {
            color: '#E6CCC2'
        };
        
        // Initialize payment handlers
        this.initializePaymentHandlers();
        this.createCart();
    }

    // Initialize payment button event handlers
    initializePaymentHandlers() {
        document.addEventListener('DOMContentLoaded', () => {
            // Add payment buttons to all product cards that don't have them
            this.addPaymentButtonsToProducts();
            
            // Setup event delegation for all payment buttons
            this.setupEventListeners();
        });
    }

    // Setup event listeners using event delegation
    setupEventListeners() {
        // Handle buy now buttons
        document.addEventListener('click', (e) => {
            console.log('Click detected on:', e.target); // Debug log
            
            if (e.target.classList.contains('btn-buy-now') || e.target.closest('.btn-buy-now')) {
                e.preventDefault();
                console.log('Buy Now clicked!'); // Debug log
                const button = e.target.classList.contains('btn-buy-now') ? e.target : e.target.closest('.btn-buy-now');
                const productCard = button.closest('.product-card');
                const productData = this.extractProductData(productCard);
                console.log('Product data:', productData); // Debug log
                this.initiatePayment(productData);
            }
            
            if (e.target.classList.contains('btn-add-to-cart') || e.target.closest('.btn-add-to-cart')) {
                e.preventDefault();
                console.log('Add to Cart clicked!'); // Debug log
                const button = e.target.classList.contains('btn-add-to-cart') ? e.target : e.target.closest('.btn-add-to-cart');
                const productCard = button.closest('.product-card');
                const productData = this.extractProductData(productCard);
                this.addToCart(productData);
            }
            
            if (e.target.classList.contains('cart-checkout-btn')) {
                e.preventDefault();
                this.checkoutCart();
            }

            if (e.target.classList.contains('cart-link') || e.target.closest('.cart-link')) {
                e.preventDefault();
                this.showCartModal();
            }
        });
    }

    // Extract product data from product card
    extractProductData(productCard) {
        const name = productCard.querySelector('.product-name')?.textContent || 'AMVYA Product';
        const priceText = productCard.querySelector('.product-price')?.textContent || '₹0';
        
        // Extract price from text (handle special offers)
        let price = 0;
        const priceMatch = priceText.match(/₹([\d,]+)/);
        if (priceMatch) {
            price = parseInt(priceMatch[1].replace(/,/g, ''));
        }
        
        // Check for special offer price
        const specialPrice = productCard.querySelector('.special-price');
        if (specialPrice) {
            const specialMatch = specialPrice.textContent.match(/₹([\d,]+)/);
            if (specialMatch) {
                price = parseInt(specialMatch[1].replace(/,/g, ''));
            }
        }

        const description = productCard.querySelector('.product-details')?.textContent || 'Premium home décor product';
        const features = Array.from(productCard.querySelectorAll('.feature-tag')).map(tag => tag.textContent);
        
        return {
            name,
            price: price * 100, // Convert to paise for Razorpay
            displayPrice: price,
            description,
            features,
            currency: 'INR',
            image: this.companyLogo
        };
    }

    // Add payment buttons to all product cards
    addPaymentButtonsToProducts() {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const productInfo = card.querySelector('.product-info');
            const isOutOfStock = card.querySelector('.out-of-stock');
            
            if (productInfo && !isOutOfStock) {
                // Create button container
                const buttonContainer = document.createElement('div');
                buttonContainer.className = 'product-actions';
                buttonContainer.innerHTML = `
                    <button class="btn-buy-now">
                        <i class="fas fa-shopping-bag"></i>
                        Buy Now
                    </button>
                    <button class="btn-add-to-cart">
                        <i class="fas fa-cart-plus"></i>
                        Add to Cart
                    </button>
                `;
                
                productInfo.appendChild(buttonContainer);
            } else if (productInfo && isOutOfStock) {
                // Add out of stock button
                const buttonContainer = document.createElement('div');
                buttonContainer.className = 'product-actions';
                buttonContainer.innerHTML = `
                    <button class="btn-out-of-stock" disabled>
                        <i class="fas fa-times-circle"></i>
                        Out of Stock
                    </button>
                `;
                
                productInfo.appendChild(buttonContainer);
            }
        });
    }

    // Initiate Razorpay payment
    initiatePayment(productData) {
        console.log('Initiating payment for:', productData); // Debug log
        
        // Check if Razorpay is available
        if (typeof Razorpay === 'undefined') {
            alert('Payment system is loading. Please try again in a moment.');
            console.error('Razorpay script not loaded');
            return;
        }

        const options = {
            key: this.razorpayKeyId,
            amount: productData.price,
            currency: productData.currency,
            name: this.companyName,
            description: `${productData.name} - ${productData.description}`,
            image: productData.image,
            handler: (response) => {
                this.handlePaymentSuccess(response, productData);
            },
            prefill: {
                name: '',
                email: '',
                contact: ''
            },
            notes: {
                product_name: productData.name,
                features: productData.features.join(', ')
            },
            theme: this.theme,
            modal: {
                ondismiss: () => {
                    this.handlePaymentCancel();
                }
            }
        };

        console.log('Opening Razorpay with options:', options); // Debug log
        const rzp = new Razorpay(options);
        
        rzp.on('payment.failed', (response) => {
            this.handlePaymentFailure(response);
        });

        rzp.open();
    }

    // Handle successful payment
    handlePaymentSuccess(response, productData) {
        console.log('Payment Success:', response);
        
        // Store order details in localStorage
        const orderDetails = {
            razorpay_payment_id: response.razorpay_payment_id,
            product: productData,
            timestamp: new Date().toISOString(),
            status: 'completed'
        };
        
        localStorage.setItem('amvya_last_order', JSON.stringify(orderDetails));
        
        // Show success message
        this.showPaymentSuccess(orderDetails);
        
        // Redirect to success page after a moment
        setTimeout(() => {
            window.location.href = 'payment-success.html';
        }, 2000);
    }

    // Handle payment failure
    handlePaymentFailure(response) {
        console.error('Payment Failed:', response);
        this.showPaymentError('Payment failed. Please try again.');
    }

    // Handle payment cancellation
    handlePaymentCancel() {
        console.log('Payment Cancelled');
        this.showPaymentError('Payment was cancelled.');
    }

    // Show payment success message
    showPaymentSuccess(orderDetails) {
        const notification = document.createElement('div');
        notification.className = 'payment-notification success';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <h3>Payment Successful!</h3>
                <p>Order placed for ${orderDetails.product.name}</p>
                <p>Payment ID: ${orderDetails.razorpay_payment_id}</p>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Show payment error message
    showPaymentError(message) {
        const notification = document.createElement('div');
        notification.className = 'payment-notification error';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-exclamation-circle"></i>
                <h3>Payment Error</h3>
                <p>${message}</p>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Create shopping cart functionality
    createCart() {
        this.cart = JSON.parse(localStorage.getItem('amvya_cart')) || [];
        this.updateCartDisplay();
    }

    // Add product to cart
    addToCart(productData) {
        const existingItem = this.cart.find(item => item.name === productData.name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...productData,
                quantity: 1
            });
        }
        
        localStorage.setItem('amvya_cart', JSON.stringify(this.cart));
        this.updateCartDisplay();
        this.showAddToCartNotification(productData.name);
    }

    // Update cart display
    updateCartDisplay() {
        const cartCount = this.cart.reduce((total, item) => total + item.quantity, 0);
        
        // Find existing cart badge
        let cartBadge = document.querySelector('.cart-badge');
        if (cartBadge) {
            cartBadge.textContent = cartCount;
            cartBadge.style.display = cartCount > 0 ? 'block' : 'none';
        } else {
            // If no cart badge exists, create the cart icon
            this.createCartIcon();
        }
        
        console.log('Cart updated with', cartCount, 'items'); // Debug log
    }

    // Create cart icon in navigation
    createCartIcon() {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            const cartItem = document.createElement('div');
            cartItem.className = 'nav-item cart-icon';
            cartItem.innerHTML = `
                <a href="#" class="nav-link cart-link">
                    <i class="fas fa-shopping-cart"></i>
                    <span class="cart-badge">0</span>
                </a>
            `;
            
            navMenu.appendChild(cartItem);
            
            // Add cart click handler
            cartItem.addEventListener('click', (e) => {
                e.preventDefault();
                this.showCartModal();
            });
        }
    }

    // Show add to cart notification
    showAddToCartNotification(productName) {
        const notification = document.createElement('div');
        notification.className = 'payment-notification success';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-cart-plus"></i>
                <h3>Added to Cart!</h3>
                <p>${productName} has been added to your cart</p>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }

    // Show cart modal
    showCartModal() {
        const modal = document.createElement('div');
        modal.className = 'cart-modal';
        modal.innerHTML = this.generateCartHTML();
        
        document.body.appendChild(modal);
        
        // Add close handlers
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('cart-modal') || e.target.classList.contains('cart-close')) {
                modal.remove();
            }
        });
    }

    // Generate cart HTML
    generateCartHTML() {
        const total = this.cart.reduce((sum, item) => sum + (item.displayPrice * item.quantity), 0);
        
        return `
            <div class="cart-modal-content">
                <div class="cart-header">
                    <h2>Shopping Cart</h2>
                    <button class="cart-close">&times;</button>
                </div>
                <div class="cart-items">
                    ${this.cart.map(item => `
                        <div class="cart-item">
                            <div class="cart-item-info">
                                <h4>${item.name}</h4>
                                <p>₹${item.displayPrice} × ${item.quantity}</p>
                            </div>
                            <div class="cart-item-actions">
                                <button onclick="amvyaPayment.updateCartQuantity('${item.name}', ${item.quantity - 1})">-</button>
                                <span>${item.quantity}</span>
                                <button onclick="amvyaPayment.updateCartQuantity('${item.name}', ${item.quantity + 1})">+</button>
                                <button onclick="amvyaPayment.removeFromCart('${item.name}')" class="remove-btn">×</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="cart-footer">
                    <div class="cart-total">
                        <strong>Total: ₹${total.toLocaleString()}</strong>
                    </div>
                    <button class="cart-checkout-btn">
                        <i class="fas fa-credit-card"></i>
                        Checkout - ₹${total.toLocaleString()}
                    </button>
                </div>
            </div>
        `;
    }

    // Update cart item quantity
    updateCartQuantity(productName, newQuantity) {
        if (newQuantity <= 0) {
            this.removeFromCart(productName);
            return;
        }
        
        const item = this.cart.find(item => item.name === productName);
        if (item) {
            item.quantity = newQuantity;
            localStorage.setItem('amvya_cart', JSON.stringify(this.cart));
            this.updateCartDisplay();
            
            // Update modal if open
            const modal = document.querySelector('.cart-modal');
            if (modal) {
                modal.querySelector('.cart-modal-content').innerHTML = this.generateCartHTML().match(/<div class="cart-modal-content">(.*)<\/div>/s)[1];
            }
        }
    }

    // Remove item from cart
    removeFromCart(productName) {
        this.cart = this.cart.filter(item => item.name !== productName);
        localStorage.setItem('amvya_cart', JSON.stringify(this.cart));
        this.updateCartDisplay();
        
        // Update modal if open
        const modal = document.querySelector('.cart-modal');
        if (modal) {
            if (this.cart.length === 0) {
                modal.remove();
            } else {
                modal.querySelector('.cart-modal-content').innerHTML = this.generateCartHTML().match(/<div class="cart-modal-content">(.*)<\/div>/s)[1];
            }
        }
    }

    // Checkout entire cart
    checkoutCart() {
        if (this.cart.length === 0) {
            this.showPaymentError('Your cart is empty');
            return;
        }
        
        const total = this.cart.reduce((sum, item) => sum + (item.displayPrice * item.quantity), 0);
        const totalInPaise = total * 100;
        
        const options = {
            key: this.razorpayKeyId,
            amount: totalInPaise,
            currency: 'INR',
            name: this.companyName,
            description: `AMVYA Cart - ${this.cart.length} item(s)`,
            image: this.companyLogo,
            handler: (response) => {
                this.handleCartPaymentSuccess(response);
            },
            prefill: {
                name: '',
                email: '',
                contact: ''
            },
            notes: {
                cart_items: this.cart.map(item => `${item.name} (${item.quantity})`).join(', '),
                total_items: this.cart.length.toString()
            },
            theme: this.theme,
            modal: {
                ondismiss: () => {
                    this.handlePaymentCancel();
                }
            }
        };

        const rzp = new Razorpay(options);
        
        rzp.on('payment.failed', (response) => {
            this.handlePaymentFailure(response);
        });

        rzp.open();
    }

    // Handle cart payment success
    handleCartPaymentSuccess(response) {
        const orderDetails = {
            razorpay_payment_id: response.razorpay_payment_id,
            cart: [...this.cart],
            timestamp: new Date().toISOString(),
            status: 'completed',
            total: this.cart.reduce((sum, item) => sum + (item.displayPrice * item.quantity), 0)
        };
        
        localStorage.setItem('amvya_last_order', JSON.stringify(orderDetails));
        
        // Clear cart
        this.cart = [];
        localStorage.setItem('amvya_cart', JSON.stringify(this.cart));
        this.updateCartDisplay();
        
        // Close modal
        const modal = document.querySelector('.cart-modal');
        if (modal) modal.remove();
        
        // Show success and redirect
        this.showPaymentSuccess({ product: { name: 'Cart Items' }, razorpay_payment_id: response.razorpay_payment_id });
        
        setTimeout(() => {
            window.location.href = 'payment-success.html';
        }, 2000);
    }
}

// Initialize payment system when page loads
let amvyaPayment;
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing AMVYA Payment System...'); // Debug log
    amvyaPayment = new AMVYAPayment();
    console.log('Payment system initialized:', amvyaPayment); // Debug log
    
    // Add test functionality in development
    window.testPayment = () => {
        const testProduct = {
            name: 'Test Product',
            price: 100 * 100, // ₹100 in paise
            displayPrice: 100,
            description: 'Test payment for AMVYA',
            features: ['Test'],
            currency: 'INR'
        };
        amvyaPayment.initiatePayment(testProduct);
    };
    
    // Log all buy now buttons found
    const buyButtons = document.querySelectorAll('.btn-buy-now');
    console.log('Found Buy Now buttons:', buyButtons.length);
    buyButtons.forEach((btn, index) => {
        console.log(`Button ${index}:`, btn);
    });
});