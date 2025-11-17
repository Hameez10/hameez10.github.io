# Hameez Iqbal's Personal Website

Welcome to my personal website repository! This website showcases my projects, experiences, and media coverage.

## View the Website

You can view the live website at: [https://hameez10.github.io](https://hameez10.github.io)

## Features

- **Home**: Introduction and overview
- **About**: Background and skills with technology stack
- **Experience**: Professional and academic experience (most recent to oldest)
- **Projects**: Portfolio of my work including interactive tools
  - **Campaign Route Optimizer**: Traveling Salesman Algorithm tool for optimizing door-to-door campaign routes
  - **Activity Point Calculator**: Java-based calculator for graduation awards
- **Media**: News coverage and social media presence
- **Cool Stuff**: Interesting projects and experiments
- **Contact**: How to reach me

## Architecture

This website uses a component-based architecture for consistent navigation and footer across all pages:

- **Navbar Component** (`components/navbar.html`): Centralized navigation menu
- **Footer Component** (`components/footer.html`): Centralized footer with links and documentation
- **JavaScript Loaders** (`js/navbar.js`, `js/footer.js`): Automatically inject components into all pages

All pages inherit navigation and footer from these components, ensuring consistency and easy maintenance.

## Recent Updates

- **Experience Page**: Added Government of Canada roles (AI Technical Program Management, Software Engineer, AI Product Management)
- **Projects Page**: Added Campaign Route Optimizer with interactive "Try Now" button
- **Tag System**: Enhanced color visibility and readability for all technology tags
- **Navigation**: Consistent navbar across all pages including Route Optimizer tool

## Local Development

To run this website locally:

1. Clone the repository
2. Navigate to the project directory
3. Start a local server (e.g., using Python):
   ```bash
   python -m http.server 8000
   ```
4. Open `http://localhost:8000` in your browser

## Note About Instagram Embeds

The Media page contains embedded Instagram posts. To view these properly:
- Make sure you're viewing the site through a web server (either the live site or locally)
- Ensure your browser allows third-party scripts
- You might need to be logged into Instagram in your browser

## Contact

Feel free to reach out to me through the contact form on the website or connect with me on [LinkedIn](https://www.linkedin.com/in/hameez-iqbal/). 