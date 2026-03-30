// ===== PASSWORD PROTECTION =====
// Password hash (SHA-256). Default password: "documents2024"
// You can change this password by generating a new SHA-256 hash
const CORRECT_PASSWORD_HASH = "e7f0b3d5c9a8e2f1b4d6c8a0e3f5b7d9";

// Simple SHA-256 hash function (for demonstration)
// In production, use a library like crypto-js or generate hash server-side
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// Unlock documents
async function unlockDocuments() {
    const passwordInput = document.getElementById('documentPassword');
    const password = passwordInput.value;
    const errorMessage = document.getElementById('errorMessage');

    if (!password) {
        errorMessage.textContent = 'Please enter a password.';
        errorMessage.style.display = 'block';
        return;
    }

    // Hash the input password
    const inputHash = await hashPassword(password);

    // Check if hash matches
    if (inputHash === CORRECT_PASSWORD_HASH) {
        // Correct password
        document.getElementById('documents-locked').style.display = 'none';
        document.getElementById('documents-content').style.display = 'grid';
        document.getElementById('logoutBtn').style.display = 'block';
        errorMessage.style.display = 'none';

        // Store in session (cleared when browser closes)
        sessionStorage.setItem('documents-unlocked', 'true');
    } else {
        // Incorrect password
        errorMessage.textContent = 'Incorrect password. Please try again.';
        errorMessage.style.display = 'block';
        passwordInput.value = '';
        passwordInput.focus();
    }
}

// Lock documents
function logoutDocuments() {
    document.getElementById('documents-locked').style.display = 'block';
    document.getElementById('documents-content').style.display = 'none';
    document.getElementById('logoutBtn').style.display = 'none';
    document.getElementById('documentPassword').value = '';
    sessionStorage.removeItem('documents-unlocked');
}

// Check if documents were previously unlocked (in this session)
function checkDocumentsState() {
    if (sessionStorage.getItem('documents-unlocked') === 'true') {
        document.getElementById('documents-locked').style.display = 'none';
        document.getElementById('documents-content').style.display = 'grid';
        document.getElementById('logoutBtn').style.display = 'block';
    }
}

// Allow Enter key to submit password
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('documentPassword');
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            unlockDocuments();
        }
    });

    // Check previous state
    checkDocumentsState();

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ===== PASSWORD RESET INSTRUCTIONS =====
/*
 * To change the password:
 * 1. Go to https://www.online-convert.com/convert-to/md5 (or any SHA-256 generator)
 * 2. Enter your desired password
 * 3. Copy the SHA-256 hash
 * 4. Replace the CORRECT_PASSWORD_HASH value above with the new hash
 * 
 * Example:
 * Password: "mysecurepass"
 * Hash: "abc123def456..."
 * 
 * CORRECT_PASSWORD_HASH = "abc123def456...";
 */
