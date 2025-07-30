// payment.js - Payment Integration for Acadepass

// ===== Payment Configuration =====
const paymentConfig = {
    stripePublicKey: 'pk_test_your_stripe_public_key_here',
    jazzCashConfig: {
        merchantId: 'YOUR_JAZZCASH_MERCHANT_ID',
        password: 'YOUR_JAZZCASH_PASSWORD',
        integritySalt: 'YOUR_JAZZCASH_SALT'
    },
    easypaisaConfig: {
        storeId: 'YOUR_EAASYPAISA_STORE_ID',
        hashKey: 'YOUR_EAASYPAISA_HASH_KEY'
    },
    upaisaConfig: {
        merchantId: 'YOUR_UPAISA_MERCHANT_ID',
        apiKey: 'YOUR_UPAISA_API_KEY'
    },
    alipayConfig: {
        appId: 'YOUR_ALIPAY_APP_ID',
        merchantPrivateKey: 'YOUR_ALIPAY_PRIVATE_KEY'
    },
    wechatPayConfig: {
        appId: 'YOUR_WECHAT_APP_ID',
        mchId: 'YOUR_WECHAT_MCH_ID',
        apiKey: 'YOUR_WECHAT_API_KEY'
    }
};

// ===== Payment Initialization =====
document.addEventListener('DOMContentLoaded', function() {
    // Only run on payment pages
    if (!document.getElementById('paymentForm')) return;
    
    initializePaymentForm();
    setupPaymentMethodToggle();
});

function initializePaymentForm() {
    // Initialize Stripe Elements for card payments
    if (typeof Stripe !== 'undefined') {
        const stripe = Stripe(paymentConfig.stripePublicKey);
        const elements = stripe.elements();
        
        const cardElement = elements.create('card', {
            style: {
                base: {
                    fontSize: '16px',
                    color: '#32325d',
                    '::placeholder': {
                        color: '#aab7c4'
                    }
                }
            }
        });
        
        cardElement.mount('#card-element');
        
        // Handle real-time validation errors
        cardElement.on('change', function(event) {
            const displayError = document.getElementById('card-errors');
            if (event.error) {
                displayError.textContent = event.error.message;
                displayError.style.display = 'block';
            } else {
                displayError.style.display = 'none';
                displayError.textContent = '';
            }
        });
        
        // Save reference for later use
        window.stripe = stripe;
        window.cardElement = cardElement;
    }
    
    // Set up form submission
    document.getElementById('paymentForm').addEventListener('submit', handlePaymentSubmission);
}

// ===== Payment Method Toggle =====
function setupPaymentMethodToggle() {
    const paymentMethod = document.getElementById('paymentMethod');
    const cardDetails = document.getElementById('cardDetails');
    const mobileWalletDetails = document.getElementById('mobileWalletDetails');
    const mobileWalletType = document.getElementById('mobileWalletType');
    
    // Show/hide sections based on payment method
    paymentMethod.addEventListener('change', function() {
        cardDetails.style.display = this.value === 'card' ? 'block' : 'none';
        mobileWalletDetails.style.display = this.value === 'mobile' ? 'block' : 'none';
    });
    
    // Show specific mobile wallet fields
    mobileWalletType.addEventListener('change', function() {
        document.querySelectorAll('.wallet-specific').forEach(el => {
            el.style.display = 'none';
        });
        
        if (this.value) {
            document.getElementById(`${this.value}-details`).style.display = 'block';
        }
    });
    
    // Trigger initial state
    paymentMethod.dispatchEvent(new Event('change'));
    mobileWalletType.dispatchEvent(new Event('change'));
}

// ===== Payment Processing =====
async function handlePaymentSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const paymentMethod = document.getElementById('paymentMethod').value;
    const amount = parseFloat(document.querySelector('.price').textContent.replace('Rs.', ''));
    
    // Disable form during processing
    form.querySelectorAll('input, button, select').forEach(el => {
        el.disabled = true;
    });
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Payment...';
    
    try {
        let paymentResult;
        
        switch (paymentMethod) {
            case 'card':
                paymentResult = await processCardPayment(amount);
                break;
                
            case 'mobile':
                const walletType = document.getElementById('mobileWalletType').value;
                paymentResult = await processMobilePayment(walletType, amount);
                break;
                
            default:
                throw new Error('Invalid payment method selected');
        }
        
        if (paymentResult.success) {
            // Update user subscription
            updateUserSubscription();
            
            // Show success message
            showPaymentSuccess(paymentResult);
        } else {
            throw new Error(paymentResult.message || 'Payment failed');
        }
    } catch (error) {
        showPaymentError(error.message);
    } finally {
        // Re-enable form
        form.querySelectorAll('input, button, select').forEach(el => {
            el.disabled = false;
        });
        submitBtn.textContent = 'Complete Payment';
    }
}

async function processCardPayment(amount) {
    if (!window.stripe || !window.cardElement) {
        throw new Error('Stripe not initialized');
    }
    
    // Create payment method
    const { paymentMethod, error } = await window.stripe.createPaymentMethod({
        type: 'card',
        card: window.cardElement,
        billing_details: {
            name: document.getElementById('cardName').value,
            email: document.getElementById('cardEmail').value,
            phone: document.getElementById('cardPhone').value
        }
    });
    
    if (error) {
        throw new Error(error.message);
    }
    
    // In a real app, you would send paymentMethod.id to your server
    // Here we'll simulate a successful payment
    return simulateServerPayment({
        paymentMethod: 'card',
        amount: amount,
        currency: 'PKR',
        metadata: {
            card_last4: '4242', // Test card
            card_brand: 'Visa'
        }
    });
}

async function processMobilePayment(walletType, amount) {
    const phone = document.getElementById('mobilePhone').value;
    
    if (!phone) {
        throw new Error('Phone number is required');
    }
    
    // Get wallet-specific details
    let details = {};
    switch (walletType) {
        case 'jazzcash':
            details = {
                account: document.getElementById('jazzcash-account').value || phone
            };
            break;
            
        case 'easypaisa':
            details = {
                account: document.getElementById('easypaisa-account').value || phone
            };
            break;
            
        case 'upaisa':
            details = {
                account: document.getElementById('upaisa-account').value || phone
            };
            break;
            
        case 'alipay':
            details = {
                account: document.getElementById('alipay-account').value
            };
            break;
            
        case 'wechatpay':
            details = {
                account: document.getElementById('wechatpay-account').value
            };
            break;
    }
    
    // Simulate payment processing
    return simulateServerPayment({
        paymentMethod: walletType,
        amount: amount,
        currency: 'PKR',
        phone: phone,
        details: details
    });
}

// ===== Server Simulation =====
function simulateServerPayment(paymentData) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            // Simulate 85% success rate
            if (Math.random() < 0.85) {
                resolve({
                    success: true,
                    transactionId: 'TX' + Math.floor(Math.random() * 1000000000).toString(),
                    amount: paymentData.amount,
                    currency: paymentData.currency,
                    method: paymentData.paymentMethod,
                    timestamp: new Date().toISOString()
                });
            } else {
                reject(new Error('Payment failed. Please try again or use a different payment method.'));
            }
        }, 2000);
    });
}

// ===== Update User Subscription =====
function updateUserSubscription() {
    const user = JSON.parse(localStorage.getItem('acadepassCurrentUser'));
    
    if (user) {
        user.subscription = 'premium';
        user.subscriptionExpiry = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(); // 1 year
        localStorage.setItem('acadepassCurrentUser', JSON.stringify(user));
    }
}

// ===== UI Feedback =====
function showPaymentSuccess(paymentResult) {
    // Hide payment form
    document.getElementById('paymentForm').style.display = 'none';
    
    // Show success message
    const successHTML = `
        <div class="payment-success">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2>Payment Successful!</h2>
            <div class="payment-details">
                <p><strong>Amount:</strong> Rs.${paymentResult.amount.toFixed(2)}</p>
                <p><strong>Method:</strong> ${formatPaymentMethod(paymentResult.method)}</p>
                <p><strong>Transaction ID:</strong> ${paymentResult.transactionId}</p>
                <p><strong>Date:</strong> ${new Date(paymentResult.timestamp).toLocaleString()}</p>
            </div>
            <p>Your subscription is now active. You can access all premium content.</p>
            <div class="success-actions">
                <button class="btn btn-primary" onclick="location.href='dashboard.html'">
                    <i class="fas fa-tachometer-alt"></i> Go to Dashboard
                </button>
                <button class="btn btn-secondary" onclick="location.href='nle-pass.html'">
                    <i class="fas fa-stethoscope"></i> Start Learning
                </button>
            </div>
        </div>
    `;
    
    document.querySelector('.payment-container').innerHTML += successHTML;
}

function showPaymentError(message) {
    const errorContainer = document.getElementById('payment-errors');
    errorContainer.innerHTML = `
        <div class="alert alert-error">
            <i class="fas fa-exclamation-triangle"></i> ${message}
        </div>
    `;
    errorContainer.style.display = 'block';
    
    // Scroll to error
    errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ===== Helper Functions =====
function formatPaymentMethod(method) {
    const methodNames = {
        'card': 'Credit/Debit Card',
        'jazzcash': 'JazzCash',
        'easypaisa': 'EasyPaisa',
        'upaisa': 'U Paisa',
        'alipay': 'Alipay',
        'wechatpay': 'WeChat Pay'
    };
    
    return methodNames[method] || method;
}

// ===== Payment Method Detection =====
export function detectMobileWallets() {
    const userAgent = navigator.userAgent.toLowerCase();
    const wallets = [];
    
    if (userAgent.includes('alipay')) {
        wallets.push('alipay');
    }
    if (userAgent.includes('micromessenger')) {
        wallets.push('wechatpay');
    }
    if (userAgent.includes('jazz') || userAgent.includes('mobilink')) {
        wallets.push('jazzcash');
    }
    if (userAgent.includes('telenor') || userAgent.includes('easypaisa')) {
        wallets.push('easypaisa');
    }
    if (userAgent.includes('ufone') || userAgent.includes('upaisa')) {
        wallets.push('upaisa');
    }
    
    return wallets;
}

// Initialize payment methods based on user's device
function initPaymentMethods() {
    const wallets = detectMobileWallets();
    const walletSelect = document.getElementById('mobileWalletType');
    
    if (wallets.length > 0) {
        // Prioritize detected wallets
        walletSelect.innerHTML = '';
        
        wallets.forEach(wallet => {
            const option = document.createElement('option');
            option.value = wallet;
            option.textContent = formatPaymentMethod(wallet);
            walletSelect.appendChild(option);
        });
        
        // Show mobile wallet option first
        document.getElementById('paymentMethod').value = 'mobile';
        document.getElementById('paymentMethod').dispatchEvent(new Event('change'));
    }
}

// Initialize on payment page
if (document.getElementById('paymentForm')) {
    initPaymentMethods();
}