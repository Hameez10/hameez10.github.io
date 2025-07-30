// Function to fetch and render markdown content
async function renderMarkdown() {
    try {
        // Get the markdown content
        const response = await fetch(window.location.pathname);
        const markdownContent = await response.text();
        
        // Convert markdown to HTML (using a simple regex-based approach)
        const htmlContent = markdownContent
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
            .replace(/- (.*$)/gm, '<li>$1</li>')
            .split('\n').map(line => line.trim()).join('\n');

        // Create the viewer container
        const viewerContainer = document.createElement('div');
        viewerContainer.className = 'markdown-viewer';
        viewerContainer.innerHTML = `
            <div class="markdown-content">
                ${htmlContent}
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .markdown-viewer {
                max-width: 800px;
                margin: 2rem auto;
                padding: 2rem;
                background: white;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                line-height: 1.6;
            }
            .markdown-content h1 { font-size: 2rem; margin: 1.5rem 0; }
            .markdown-content h2 { font-size: 1.5rem; margin: 1.2rem 0; }
            .markdown-content h3 { font-size: 1.2rem; margin: 1rem 0; }
            .markdown-content p { margin: 1rem 0; }
            .markdown-content code { 
                background: #f5f5f5; 
                padding: 0.2rem 0.4rem; 
                border-radius: 3px; 
            }
            .markdown-content pre { 
                background: #f5f5f5; 
                padding: 1rem; 
                border-radius: 5px; 
                overflow-x: auto; 
            }
            .markdown-content li { margin: 0.5rem 0; }
        `;

        // Add to document
        document.head.appendChild(style);
        document.body.appendChild(viewerContainer);
    } catch (error) {
        console.error('Error rendering markdown:', error);
    }
}

// Check if we're viewing a markdown file
if (window.location.pathname.endsWith('.md')) {
    document.addEventListener('DOMContentLoaded', renderMarkdown);
} 