// ===== SHARED NAVIGATION & FOOTER =====
// Dynamically injects nav and footer into every page.
// Each page includes this script and provides a <nav id="shared-nav">
// and <footer id="shared-footer"> placeholder.

(function () {
    // Detect depth: pages in subdirectories need "../" prefix for links
    const depth = document.documentElement.getAttribute('data-depth') || '0';
    const prefix = depth === '0' ? '' : '../'.repeat(parseInt(depth, 10));

    const navHTML = `
    <div class="nav-container">
        <a href="${prefix}index.html" class="logo">Karthik Tiruvarur</a>
        <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
            <span class="nav-toggle-bar"></span>
            <span class="nav-toggle-bar"></span>
            <span class="nav-toggle-bar"></span>
        </button>
        <ul class="nav-links">
            <li><a href="${prefix}index.html">Home</a></li>
            <li><a href="${prefix}ai-experiments.html">AI Experiments</a></li>
            <li><a href="${prefix}pages/writing.html">Writing</a></li>
            <li><a href="${prefix}pages/food-for-thought.html">Food for Thought</a></li>
            <li><a href="${prefix}pages/portfolio.html">Portfolio (Investments)</a></li>
            <li><a href="${prefix}pages/documents.html">Vault</a></li>
        </ul>
    </div>`;

    const footerHTML = `
    <div class="container">
        <p>&copy; 2025 Karthik Tiruvarur.</p>
        <p class="footer-note">Powered by <a href="https://pages.github.com/" target="_blank">GitHub Pages</a></p>
    </div>`;

    // Inject nav
    const nav = document.getElementById('shared-nav');
    if (nav) {
        nav.classList.add('navbar');
        nav.innerHTML = navHTML;

        // Hamburger toggle
        const toggle = nav.querySelector('.nav-toggle');
        const links = nav.querySelector('.nav-links');
        if (toggle && links) {
            toggle.addEventListener('click', function () {
                const isOpen = links.classList.toggle('nav-open');
                toggle.classList.toggle('nav-toggle-active', isOpen);
                toggle.setAttribute('aria-expanded', isOpen);
            });

            // Close menu when a link is tapped
            links.querySelectorAll('a').forEach(function (a) {
                a.addEventListener('click', function () {
                    links.classList.remove('nav-open');
                    toggle.classList.remove('nav-toggle-active');
                    toggle.setAttribute('aria-expanded', 'false');
                });
            });
        }
    }

    // Inject footer
    const footer = document.getElementById('shared-footer');
    if (footer) {
        footer.classList.add('footer');
        footer.innerHTML = footerHTML;
    }
})();
