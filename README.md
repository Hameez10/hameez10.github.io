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
- **Cool Stuff**: Interactive civic education tools and experiments
  - **How a Bill Becomes Law (Canada)**: Interactive clickable flow explaining the Canadian legislative process
  - **Who's Responsible? (Canada)**: Reference guide showing Federal vs Provincial vs Municipal responsibilities
  - **Who's Responsible? Game**: Drag-and-drop game to test civic knowledge
  - **Who Does What? — House of Commons**: Match parliamentary roles to their responsibilities
  - **Who Said This? — Commons Edition**: Match parliamentary quotes to the roles that use them
  - **A Day in the Chamber**: Arrange events of a Commons sitting day in order and identify key roles
  - **Commons Roles Bingo**: Lightweight bingo game to learn parliamentary roles
  - **Canadian Honours Quiz**: Interactive quiz to discover eligible Canadian awards
  - **Glenforest Activity Points Awards**: Calculator for graduation awards
  - **Route Optimizer**: Campaign route optimization tool
- **Canada**: Comprehensive page dedicated to Canadian civic education
  - Features all interactive games and tools in one centralized location
  - Includes "How a Bill Becomes Law" interactive section
  - Quick access to all 8 civic education games and tools
- **Contact**: How to reach me

## Architecture

This website uses a component-based architecture for consistent navigation and footer across all pages:

- **Navbar Component** (`components/navbar.html`): Centralized navigation menu
- **Footer Component** (`components/footer.html`): Centralized footer with links and documentation
- **JavaScript Loaders** (`js/navbar.js`, `js/footer.js`): Automatically inject components into all pages

All pages inherit navigation and footer from these components, ensuring consistency and easy maintenance.

## Recent Updates

- **Cool Stuff Section**: 
  - Added "How a Bill Becomes Law (Canada)" - Interactive clickable flow with 7 stages of the legislative process
  - Added "Who's Responsible? (Canada)" - Comprehensive reference guide with 22+ topics showing government responsibilities
  - Added "Who's Responsible? Game" - Drag-and-drop game with 89 topics, scoring, badges, and save/share functionality
  - Added "Who Does What? — House of Commons" - Drag-and-drop game matching roles to responsibilities
  - Added "Who Said This? — Commons Edition" - Quiz game matching parliamentary quotes to roles
  - Added "A Day in the Chamber" - Timeline game ordering events and identifying roles
  - Added "Commons Roles Bingo" - Lightweight 3×3 bingo game for learning parliamentary roles
  - Added "Canadian Honours Quiz" - Interactive eligibility quiz
- **Canada Page**: 
  - New dedicated page for Canadian civic education
  - Features "How a Bill Becomes Law" interactive section with clickable bubbles
  - Centralized hub for all 8 interactive games and tools
  - Responsive grid layout with game cards and direct navigation buttons
- **Experience Page**: 
  - Added Government of Canada roles (AI Technical Program Manager, Software Engineer, AI Product Management)
  - Improved card width and layout for better readability
  - Fixed SharePoint tag color for better text visibility
- **Media Page**: Added Instagram post embed and multiple LinkedIn post embeds for professional updates
- **Projects Page**: Added Campaign Route Optimizer with interactive "Try Now" button
- **Tag System**: Enhanced color visibility and readability for all technology tags
- **Navigation**: Consistent navbar across all pages including all interactive tools

## Local Development

To run this website locally:

1. Clone the repository
2. Navigate to the project directory
3. Start a local server (e.g., using Python):
   ```bash
   python -m http.server 8000
   ```
4. Open `http://localhost:8000` in your browser

## Note About Social Media Embeds

The Media page contains embedded Instagram and LinkedIn posts. To view these properly:
- Make sure you're viewing the site through a web server (either the live site or locally)
- Ensure your browser allows third-party scripts
- You might need to be logged into Instagram/LinkedIn in your browser
- LinkedIn posts are embedded using LinkedIn's official embed feature

## Contact

Feel free to reach out to me through the contact form on the website or connect with me on [LinkedIn](https://www.linkedin.com/in/hameez-iqbal/). 