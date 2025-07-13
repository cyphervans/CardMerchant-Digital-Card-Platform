// Mobile Menu Toggle (to be expanded)
document.addEventListener('DOMContentLoaded', function() {
    console.log("CardMerchant is ready!");
    // Add interactive elements here (e.g., dropdowns, modals)
});
// Toggle Card Details Accordion
function toggleCardDetails(index) {
    const contents = document.querySelectorAll('.card-content');
    const content = contents[index];
    content.classList.toggle('active');

    // Rotate chevron icon
    const icon = document.querySelectorAll('.card-header i')[index];
    icon.classList.toggle('fa-chevron-up');
}

// Toggle FAQ Answers
function toggleFAQ(index) {
    const answers = document.querySelectorAll('.faq-answer');
    const answer = answers[index];
    answer.classList.toggle('active');

    // Toggle +/- icon
    const icon = document.querySelectorAll('.faq-question i')[index];
    icon.classList.toggle('fa-minus');
}
// Switch Between Crypto Tabs
function openCrypto(crypto) {
    const boxes = document.querySelectorAll('.crypto-box');
    const buttons = document.querySelectorAll('.tab-btn');

    boxes.forEach(box => box.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(crypto).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Copy Wallet Address
function copyAddress(id) {
    const address = document.getElementById(id);
    address.select();
    document.execCommand('copy');
    
    // Show temporary feedback
    const btn = event.currentTarget;
    btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-copy"></i> Copy';
    }, 2000);
}
// Blockchain APIs
const API_ENDPOINTS = {
    BTC: "https://api.blockchair.com/bitcoin/dashboards/transaction/",
    ETH: "https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash",
    USDT: "https://api.etherscan.io/api?module=account&action=tokentx&address="
};

// Track Transaction Status
let txCheckInterval;

function startTracking(txHash, cryptoType) {
    clearInterval(txCheckInterval); // Reset previous checks
    
    document.getElementById("tx-hash").textContent = `${txHash.substring(0, 12)}...${txHash.slice(-6)}`;
    
    txCheckInterval = setInterval(() => {
        checkTransactionStatus(txHash, cryptoType);
    }, 15000); // Check every 15 seconds
}

function checkTransactionStatus(txHash, cryptoType) {
    if (cryptoType === "BTC") {
        fetch(`${API_ENDPOINTS.BTC}${txHash}`)
            .then(response => response.json())
            .then(data => {
                const confirmations = data.data[txHash].transaction.block_id;
                updateConfirmationStatus(confirmations);
            });
    } else if (cryptoType === "ETH" || cryptoType === "USDT") {
        fetch(`${API_ENDPOINTS.ETH}&txhash=${txHash}`)
            .then(response => response.json())
            .then(data => {
                const confirmations = data.result.blockNumber ? 3 : 0; // Simplified for demo
                updateConfirmationStatus(confirmations);
            });
    }
}

function updateConfirmationStatus(confirmations) {
    const progress = (confirmations / 3) * 100;
    document.getElementById("tx-confirmations").textContent = confirmations;
    document.getElementById("tx-progress").style.width = `${progress}%`;
    
    if (confirmations >= 3) {
        clearInterval(txCheckInterval);
        document.getElementById("tx-status").textContent = "✅ Completed";
    }
}

// Demo: Simulate a detected transaction (replace with real wallet listener)
document.getElementById("check-status").addEventListener("click", () => {
    const cryptoType = document.querySelector(".tab-btn.active").textContent.includes("BTC") ? "BTC" : "ETH";
    const demoHash = cryptoType === "BTC" ? 
        "a1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d" : 
        "0x15f8e5ea1079d9a0bb04a4c58ae5fe7654b5b2b4463375ff7ffb490aa0032f3a";
    
    startTracking(demoHash, cryptoType);
});
// Toggle Card Freeze Status
function toggleFreeze(cardIndex) {
    const freezeBtn = document.querySelectorAll(".balance-actions .fa-snowflake")[cardIndex];
    const isFrozen = freezeBtn.classList.contains("active");
    
    if (isFrozen) {
        freezeBtn.classList.remove("active");
        freezeBtn.style.color = "#666";
        alert("Card unfrozen!");
    } else {
        freezeBtn.classList.add("active");
        freezeBtn.style.color = "#2a52be";
        alert("Card frozen!");
    }
}

// Logout Function
document.getElementById("logout-btn").addEventListener("click", () => {
    if (confirm("Are you sure you want to logout?")) {
        window.location.href = "index.html";
    }
});

// Demo: Load User Data (Replace with real API calls)
window.addEventListener("DOMContentLoaded", () => {
    // Simulate fetching user data
    document.getElementById("username").textContent = "Alex";
    document.getElementById("last-login").textContent = new Date().toLocaleString();
});
// Tab Switching
function openTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-btn');

    tabs.forEach(tab => tab.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Update Profile
function updateProfile() {
    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // In a real app, send to backend
    alert(`Profile updated!\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone}`);
}

// Change Password
function changePassword() {
    const currentPass = document.getElementById('current-password').value;
    const newPass = document.getElementById('new-password').value;
    const confirmPass = document.getElementById('confirm-password').value;

    if (newPass !== confirmPass) {
        alert("Passwords don't match!");
        return;
    }

    // In a real app, verify current pass via API
    alert("Password changed successfully!");
}

// Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    document.getElementById('dark-mode-toggle').checked = true;
}

// Enable 2FA
function enable2FA() {
    alert("Redirecting to 2FA setup...");
    // Integrate with Google Authenticator API
}

// Delete Account
function confirmDeleteAccount() {
    if (confirm("WARNING: This will permanently delete your account and all cards. Continue?")) {
        alert("Account deletion requested. A confirmation email has been sent.");
        // Backend would send verification email
    }
}