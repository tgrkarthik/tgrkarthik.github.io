// ===== PASSWORD PROTECTION (Documents page only) =====
// Password stored as SHA-256 hash only — plaintext never appears in source code.
// To change the password, generate a new SHA-256 hash and replace the value below.
const CORRECT_PASSWORD_HASH = "b8b5bdd75639ea62287442eb1db628a59e713370b73b72ee2fb07f5bccbcb4e1";

// Simple SHA-256 hash function
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

    const inputHash = await hashPassword(password);

    if (inputHash === CORRECT_PASSWORD_HASH) {
        document.getElementById('documents-locked').style.display = 'none';
        document.getElementById('documents-content').style.display = 'grid';
        document.getElementById('logoutBtn').style.display = 'block';
        errorMessage.style.display = 'none';
        sessionStorage.setItem('documents-unlocked', 'true');
    } else {
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

// Initialize password functionality if on documents page
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('documentPassword');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                unlockDocuments();
            }
        });
        checkDocumentsState();
    }
});

// ===== PASSWORD RESET INSTRUCTIONS =====
/*
 * To change the password:
 * 1. Go to any SHA-256 generator online
 * 2. Enter your desired password
 * 3. Copy the SHA-256 hash
 * 4. Replace the CORRECT_PASSWORD_HASH value above with the new hash
 */
