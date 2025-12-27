// Function to load and inject the navbar
async function loadNavbar() {
    try {
        // Check if navbar already exists and is complete
        const existingNav = document.querySelector('nav.navbar');
        if (existingNav && existingNav.querySelector('.nav-links')) {
            // Navbar already exists, just initialize it
            initializeNavbar();
            return;
        }

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
            const navbarPlaceholder = document.getElementById('navbar-placeholder');
            
            if (navbarPlaceholder) {
                // Use placeholder if it exists
                navbarPlaceholder.innerHTML = navbarHtml;
            } else if (existingNav) {
                // Replace existing navbar only if it's incomplete
                existingNav.outerHTML = navbarHtml;
            } else {
                // Insert at the beginning of body or content-wrapper
                const contentWrapper = document.querySelector('.content-wrapper');
                const target = contentWrapper || document.body;
                target.insertAdjacentHTML('afterbegin', navbarHtml);
            }
            
            initializeNavbar();
        } else {
            // If we can't load navbar component, just initialize existing navbar
            if (existingNav) {
                initializeNavbar();
            }
        }
    } catch (error) {
        console.error('Error loading navbar:', error);
        // Fallback: initialize existing navbar if it exists
        const existingNav = document.querySelector('nav.navbar');
        if (existingNav) {
            initializeNavbar();
        }
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