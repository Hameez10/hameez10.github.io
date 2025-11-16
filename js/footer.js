// Function to load and inject the footer
async function loadFooter() {
    try {
        // Try different relative paths to handle various page locations
        const paths = [
            './components/footer.html',
            '../components/footer.html',
            '/components/footer.html'
        ];

        let footerHtml = null;
        for (const path of paths) {
            try {
                const response = await fetch(path);
                if (response.ok) {
                    footerHtml = await response.text();
                    break;
                }
            } catch (e) {
                continue;
            }
        }

        if (footerHtml) {
            // Try to find existing footer and replace it, or use placeholder
            const existingFooter = document.querySelector('footer.footer');
            const footerPlaceholder = document.getElementById('footer');
            const footerPlaceholderAlt = document.getElementById('footer-placeholder');
            
            if (footerPlaceholder || footerPlaceholderAlt) {
                // Use placeholder if it exists
                const container = footerPlaceholder || footerPlaceholderAlt;
                container.innerHTML = footerHtml;
            } else if (existingFooter) {
                // Replace existing footer
                existingFooter.outerHTML = footerHtml;
            } else {
                // Insert at the end of body or content-wrapper
                const contentWrapper = document.querySelector('.content-wrapper');
                const target = contentWrapper || document.body;
                target.insertAdjacentHTML('beforeend', footerHtml);
            }
        } else {
            const footerPlaceholder = document.getElementById('footer') || document.getElementById('footer-placeholder');
            const fallback = '<div class="footer-error" style="text-align:center;color:red;padding:1em;">Footer could not be loaded.</div>';
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = fallback;
            } else {
                document.body.insertAdjacentHTML('beforeend', fallback);
            }
        }
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

// Load the footer when the DOM is ready
document.addEventListener('DOMContentLoaded', loadFooter); 