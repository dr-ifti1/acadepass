// auth.js - Authentication and User Management

// ===== User Authentication Functions =====
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in on page load
    checkLoginStatus();
    
    // Login Form Submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            loginUser(email, password);
        });
    }

    // Signup Form Submission
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            registerUser(name, email, password);
        });
    }

    // Logout Button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logoutUser);
    }
});

// User Registration Function
function registerUser(name, email, password) {
    // Get existing users or initialize empty array
    const users = JSON.parse(localStorage.getItem('acadepassUsers')) || [];
    
    // Check if user already exists
    const userExists = users.some(user => user.email === email);
    if (userExists) {
        alert('This email is already registered. Please login.');
        window.location.href = 'login.html';
        return;
    }

    // Create new user object
    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password, // In real app, this should be hashed!
        subscription: 'free', // free | basic | premium
        joined: new Date().toISOString(),
        lastLogin: new Date().toISOString()
    };

    // Save user to localStorage
    users.push(newUser);
    localStorage.setItem('acadepassUsers', JSON.stringify(users));
    
    // Set as logged in
    localStorage.setItem('acadepassCurrentUser', JSON.stringify(newUser));
    
    alert('Registration successful! Welcome to Acadepass.');
    redirectToDashboard();
}

// User Login Function
function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem('acadepassUsers')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Update last login
        user.lastLogin = new Date().toISOString();
        localStorage.setItem('acadepassUsers', JSON.stringify(users));
        
        // Set current user
        localStorage.setItem('acadepassCurrentUser', JSON.stringify(user));
        
        alert(`Welcome back, ${user.name}!`);
        redirectToDashboard();
    } else {
        alert('Invalid email or password. Please try again.');
    }
}

// Logout Function
function logoutUser() {
    localStorage.removeItem('acadepassCurrentUser');
    alert('You have been logged out successfully.');
    window.location.href = 'index.html';
}

// Check Login Status
function checkLoginStatus() {
    const user = JSON.parse(localStorage.getItem('acadepassCurrentUser'));
    
    if (user) {
        // Update UI for logged-in user
        document.querySelectorAll('.auth-buttons').forEach(container => {
            container.innerHTML = `
                <div class="user-dropdown">
                    <button class="user-profile">
                        <i class="fas fa-user-circle"></i> ${user.name.split(' ')[0]}
                    </button>
                    <div class="dropdown-content">
                        <a href="dashboard.html"><i class="fas fa-tachometer-alt"></i> Dashboard</a>
                        <a href="subscription.html"><i class="fas fa-crown"></i> Subscription</a>
                        <a href="#" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Logout</a>
                    </div>
                </div>
            `;
            document.getElementById('logoutBtn').addEventListener('click', logoutUser);
        });
        
        // Protect subscription-only pages
        if (user.subscription === 'free') {
            protectSubscriptionPages();
        }
    }
}

// Redirect to Dashboard
function redirectToDashboard() {
    window.location.href = 'dashboard.html';
}

// Protect Subscription Pages
function protectSubscriptionPages() {
    const protectedPages = ['nle-pass.html', 'hsk-pass.html', 'english-pass.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage)) {
        const user = JSON.parse(localStorage.getItem('acadepassCurrentUser'));
        if (!user || user.subscription === 'free') {
            alert('You need a premium subscription to access this content');
            window.location.href = 'subscription.html';
        }
    }
}

// Check Subscription Status
export function hasPremiumAccess() {
    const user = JSON.parse(localStorage.getItem('acadepassCurrentUser'));
    return user && user.subscription !== 'free';
}