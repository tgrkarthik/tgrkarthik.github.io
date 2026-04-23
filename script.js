// ===== PASSWORD PROTECTION (Vault & Companies pages) =====
// Password stored as SHA-256 hash only — plaintext never appears in source code.
// Both pages share the same password.
const CORRECT_PASSWORD_HASH = "e668df0edef93f7a1197ce4b2464e564a5fbe86a6a76d096aad87d5b90ea6a3c";

// Simple SHA-256 hash function
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// Generic unlock function — works for any protected page
async function unlockPage() {
    const passwordInput = document.getElementById('pagePassword');
    const password = passwordInput.value;
    const errorMessage = document.getElementById('errorMessage');
    const pageId = document.body.getAttribute('data-protected-page');

    if (!password) {
        errorMessage.textContent = 'Please enter a password.';
        errorMessage.style.display = 'block';
        return;
    }

    const inputHash = await hashPassword(password);

    if (inputHash === CORRECT_PASSWORD_HASH) {
        document.getElementById('page-locked').style.display = 'none';
        document.getElementById('page-content').style.display = '';
        document.getElementById('lockBtn').style.display = 'block';
        errorMessage.style.display = 'none';
        if (pageId) sessionStorage.setItem(pageId + '-unlocked', 'true');
    } else {
        errorMessage.textContent = 'Incorrect password. Please try again.';
        errorMessage.style.display = 'block';
        passwordInput.value = '';
        passwordInput.focus();
    }
}

// Generic lock function
function lockPage() {
    const pageId = document.body.getAttribute('data-protected-page');
    document.getElementById('page-locked').style.display = 'block';
    document.getElementById('page-content').style.display = 'none';
    document.getElementById('lockBtn').style.display = 'none';
    document.getElementById('pagePassword').value = '';
    if (pageId) sessionStorage.removeItem(pageId + '-unlocked');
}

// Check if page was previously unlocked (in this session)
function checkPageState() {
    const pageId = document.body.getAttribute('data-protected-page');
    if (pageId && sessionStorage.getItem(pageId + '-unlocked') === 'true') {
        document.getElementById('page-locked').style.display = 'none';
        document.getElementById('page-content').style.display = '';
        document.getElementById('lockBtn').style.display = 'block';
    }
}

// Initialize password functionality on any protected page
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('pagePassword');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                unlockPage();
            }
        });
        checkPageState();
    }
});

// ===== LEGACY ALIASES (backwards compatibility) =====
function unlockDocuments() { unlockPage(); }
function logoutDocuments() { lockPage(); }

// ===== PASSWORD RESET INSTRUCTIONS =====
/*
 * To change the password:
 * 1. Go to any SHA-256 generator online
 * 2. Enter your desired password
 * 3. Copy the SHA-256 hash
 * 4. Replace the CORRECT_PASSWORD_HASH value above with the new hash
 * Both Vault and Companies pages share the same password.
 */
