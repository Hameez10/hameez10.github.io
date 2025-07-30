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
            document.body.insertAdjacentHTML('beforeend', footerHtml);
        } else {
            throw new Error('Could not load footer from any path');
        }
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

// Load the footer when the DOM is ready
document.addEventListener('DOMContentLoaded', loadFooter); 