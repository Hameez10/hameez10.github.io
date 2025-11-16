// Function to load and inject the navbar
async function loadNavbar() {
    try {
        // Try different relative paths to handle various page locations
        const paths = [
            './components/navbar.html',
            '../components/navbar.html',
            '/components/navbar.html'
        ];

        let navbarHtml = null;
        for (const path of paths) {
            try {
                const response = await fetch(path);
                if (response.ok) {
                    navbarHtml = await response.text();
                    break;
                }
            } catch (e) {
                continue;
            }
        }

        if (navbarHtml) {
            // Try to find existing navbar and replace it
            const existingNav = document.querySelector('nav.navbar');
            const navbarPlaceholder = document.getElementById('navbar-placeholder');
            
            if (navbarPlaceholder) {
                // Use placeholder if it exists
                navbarPlaceholder.innerHTML = navbarHtml;
            } else if (existingNav) {
                // Replace existing navbar
                existingNav.outerHTML = navbarHtml;
            } else {
                // Insert at the beginning of body or content-wrapper
                const contentWrapper = document.querySelector('.content-wrapper');
                const target = contentWrapper || document.body;
                target.insertAdjacentHTML('afterbegin', navbarHtml);
            }
            
            initializeNavbar();
        } else {
            throw new Error('Could not load navbar from any path');
        }
    } catch (error) {
        console.error('Error loading navbar:', error);
    }
}

function initializeNavbar() {
    // Add active class to current page link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Load the navbar when the DOM is ready
document.addEventListener('DOMContentLoaded', loadNavbar); 